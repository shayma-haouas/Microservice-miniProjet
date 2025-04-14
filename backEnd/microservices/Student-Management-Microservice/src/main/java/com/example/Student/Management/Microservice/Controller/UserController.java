package com.example.Student.Management.Microservice.Controller;

import com.example.Student.Management.Microservice.Entities.User;
import com.example.Student.Management.Microservice.Service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")  // Définir le préfixe de l'URL pour cette ressource
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    // Route pour récupérer tous les utilisateurs
    @GetMapping("/get")
    public List<User> getAllUsers() {
        return userService.getAllUsers();  // Appel de la méthode dans le service
    }

    @PutMapping("/accept/{userId}")
    public ResponseEntity<?> acceptUser(@PathVariable Long userId) {
        try {
            userService.acceptUser(userId);
            // Réponse JSON avec un message et un état de succès
            return ResponseEntity.ok(Map.of("message", "Utilisateur accepté avec succès", "success", true));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage(), "success", false));
        }
    }


    @PutMapping("/block/{userId}")
    public ResponseEntity<?> blockUser(@PathVariable Long userId) {
        try {
            userService.blockUser(userId);
            // Retourner une réponse JSON directement
            return ResponseEntity.ok(Map.of("message", "Utilisateur bloqué avec succès", "success", true));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage(), "success", false));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String token) {
        User user = userService.getUserByToken(token);
        return ResponseEntity.ok(user);
    }


}