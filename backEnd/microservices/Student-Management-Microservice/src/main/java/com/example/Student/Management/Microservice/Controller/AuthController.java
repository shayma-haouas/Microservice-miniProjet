package com.example.Student.Management.Microservice.Controller;



import com.example.Student.Management.Microservice.DTO.*;
import com.example.Student.Management.Microservice.Entities.User;
import com.example.Student.Management.Microservice.Interface.UserService;
import com.example.Student.Management.Microservice.Repository.UserRepository;
import com.example.Student.Management.Microservice.Service.UserUniversityService;
import com.example.Student.Management.Microservice.ServiceAPI.EmailService;
import com.example.Student.Management.Microservice.ServiceAPI.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;  // Ajout de l'injection de PasswordEncoder
    private final UserUniversityService userUniversityService;




    public AuthController(UserService userService, UserRepository userRepository, EmailService emailService, JwtService jwtService, PasswordEncoder passwordEncoder, UserUniversityService userUniversityService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.userUniversityService = userUniversityService;
    }

    // Endpoint pour l'inscription
    // Endpoint pour l'inscription
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserSignupRequest request) {
        // Validation des champs obligatoires
        if (request.getNom() == null || request.getPrenom() == null || request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Les champs obligatoires doivent être remplis."));
        }

        User user = new User();
        user.setNom(request.getNom());
        user.setPrenom(request.getPrenom());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setCompetences(request.getCompetences()); // Ajout des compétences
        user.setRole(request.getRole());
        user.setUniversiteId(request.getUniversiteId());


        try {
            User registeredUser = userService.register(user);
            return ResponseEntity.ok(registeredUser);
        } catch (ResponseStatusException e) {
            // Capture l'erreur si l'email est déjà utilisé
            return ResponseEntity.status(e.getStatusCode()).body(Collections.singletonMap("error", e.getReason()));
        } catch (Exception e) {
            // Gestion d'erreur générique
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Une erreur interne est survenue."));
        }
    }


    // Endpoint pour la connexion
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody LoginRequest loginRequest) {
        try {
            String token = userService.login(loginRequest.getEmail(), loginRequest.getPassword());

            // Renvoyer le token dans une réponse JSON
            return ResponseEntity.ok(Collections.singletonMap("token", token)); // Utilisation d'une map pour inclure le token dans une structure JSON

        } catch (ResponseStatusException e) {
            // Gérer l'erreur en capturant le message et en renvoyant une réponse appropriée
            return ResponseEntity.status(e.getStatusCode()).body(Collections.singletonMap("error", e.getReason()));
        } catch (Exception e) {
            // Capturer les erreurs générales
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Une erreur interne est survenue."));
        }
    }


    // Endpoint pour vérifier l'utilisateur via un lien contenant un token
    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam String token) {
        try {
            userService.verifyUser(token); // Appel au service pour gérer la logique de vérification
            return ResponseEntity.ok("Votre e-mail a été vérifié avec succès !");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/universite")
    public ResponseEntity<UniversiteDTO> getUniversiteForUser(@PathVariable Long id) {
        UniversiteDTO universiteDTO = userUniversityService.getUniversiteOfUser(id);
        return ResponseEntity.ok(universiteDTO);
    }

    @GetMapping("/by-email")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userOpt.get());
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        String email = request.getEmail(); // On récupère l'email de l'objet envoyé

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            emailService.sendPasswordResetEmail(user); // Envoi de l'email de réinitialisation
            return ResponseEntity.ok(Collections.singletonMap("message", "Un lien de réinitialisation a été envoyé à votre adresse email."));
        }
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Aucun utilisateur trouvé avec cet email."));
    }


    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestBody PasswordResetRequest request) {
        String newPassword = request.getNewPassword();

        try {
            String email = jwtService.extractUsername(token); // Extraction de l'email du token
            Optional<User> userOptional = userRepository.findByEmail(email);

            if (userOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("Utilisateur introuvable.");
            }

            User user = userOptional.get();

            // Vérifier si le token est expiré (ajoute cette méthode dans JwtService si nécessaire)
            if (jwtService.isTokenExpired(token)) {
                return ResponseEntity.badRequest().body("Le lien de réinitialisation du mot de passe a expiré.");
            }

            user.setPassword(passwordEncoder.encode(newPassword)); // Encodage du nouveau mot de passe
            userRepository.save(user); // Sauvegarde du mot de passe réinitialisé

            return ResponseEntity.ok("Votre mot de passe a été réinitialisé avec succès.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Token invalide ou erreur interne.");
        }
    }


   /* @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        String email = request.getEmail(); // On récupère l'email de l'objet envoyé

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            emailService.sendPasswordResetEmail(user); // Envoi de l'email de réinitialisation
            return ResponseEntity.ok(Collections.singletonMap("message", "Un lien de réinitialisation a été envoyé à votre adresse email."));
        }
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Aucun utilisateur trouvé avec cet email."));
    }


    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        String email = jwtService.extractUsername(token); // Extraction de l'email du token
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Utilisateur introuvable.");
        }

        User user = userOptional.get();

        // Optionnel : vous pouvez vérifier que le token n'est pas expiré, selon votre logique

        user.setPassword(passwordEncoder.encode(newPassword)); // Encodage du nouveau mot de passe
        userRepository.save(user); // Sauvegarde du mot de passe réinitialisé

        return ResponseEntity.ok("Votre mot de passe a été réinitialisé avec succès.");
    }*/


}
