package com.example.Keycloak.Controller;

import com.example.Keycloak.DTO.LoginRequest;
import com.example.Keycloak.DTO.RegisterRequest;
import com.example.Keycloak.Service.KeycloakUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class RegisterController {

    @Autowired
    private KeycloakUserService keycloakUserService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        // Utiliser "user" comme rôle par défaut si le champ n'est pas renseigné
        String role = request.getRole() != null ? request.getRole() : "user";
        keycloakUserService.registerUser(
                request.getUsername(),
                request.getPassword(),
                request.getEmail(),
                request.getFirstName(),
                request.getLastName(),
                role
        );
        Map<String, String> response = new HashMap<>();
        response.put("message", "Utilisateur enregistré avec succès dans Keycloak et en base de données");
        return ResponseEntity.ok(response.toString());    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        String token = keycloakUserService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        if (token != null) {
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Authentication failed");
            return ResponseEntity.status(401).body(error);
        }
    }

}
