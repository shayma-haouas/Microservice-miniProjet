package com.example.Keycloak.Service;


import com.example.Keycloak.Repository.UserRepository;
import com.example.Keycloak.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service
public class  KeycloakUserService {

    private final RestTemplate restTemplate = new RestTemplate();

    private final String serverUrl = "http://localhost:8080";
    private final String realm = "myrealm";
    private final String clientId = "demo";
    private final String adminUsername = "azizchahlaoui7@gmail.com";
    private final String adminPassword = "adminadmin";

    @Autowired
    private UserRepository userRepository;

    public String getAdminToken() {
        String tokenUrl = serverUrl + "/realms/master/protocol/openid-connect/token";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("client_id", "admin-cli");
        form.add("username", adminUsername);
        form.add("password", adminPassword);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(form, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);
        return response.getBody().get("access_token").toString();
    }

    // Méthode principale pour créer l'utilisateur dans Keycloak et en base de données
    public void registerUser(String username, String password, String email, String firstName, String lastName, String roleName) {
        // Appel en asynchrone pour Keycloak
        CompletableFuture<Void> keycloakCreation = createUserInKeycloak(username, password, email, firstName, lastName, roleName);

        // Appel en asynchrone pour enregistrer dans la base de données MySQL
        CompletableFuture<Void> dbCreation = saveUserInDatabase(username, email, firstName, lastName, roleName);

        // Vous pouvez attendre la complétion des deux appels si besoin
        CompletableFuture.allOf(keycloakCreation, dbCreation).join();
    }

    @Async
    public CompletableFuture<Void> createUserInKeycloak(String username, String password, String email, String firstName, String lastName, String roleName) {
        try {
            String token = getAdminToken();
            String createUrl = serverUrl + "/admin/realms/" + realm + "/users";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(token);
            Map<String, Object> user = new HashMap<>();
            user.put("username", username);
            user.put("enabled", true);
            user.put("email", email);
            user.put("firstName", firstName);
            user.put("lastName", lastName);
            Map<String, Object> credentials = new HashMap<>();
            credentials.put("type", "password");
            credentials.put("value", password);
            credentials.put("temporary", false);
            user.put("credentials", List.of(credentials));
            HttpEntity<Map<String, Object>> userRequest = new HttpEntity<>(user, headers);
            restTemplate.postForEntity(createUrl, userRequest, String.class);

            // Récupération de l'ID de l'utilisateur créé via recherche par username
            String getUserUrl = serverUrl + "/admin/realms/" + realm + "/users?username=" + username;
            HttpEntity<Void> getUserRequest = new HttpEntity<>(headers);
            ResponseEntity<List<Map<String, Object>>> userResponse = restTemplate.exchange(
                    getUserUrl, HttpMethod.GET, getUserRequest, new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );
            if (userResponse.getBody() == null || userResponse.getBody().isEmpty()) {
                throw new RuntimeException("Utilisateur non trouvé dans Keycloak après création");
            }
            String userId = userResponse.getBody().get(0).get("id").toString();

            // Récupération des informations sur le rôle
            String getRoleUrl = serverUrl + "/admin/realms/" + realm + "/roles/" + roleName;
            HttpEntity<Void> roleRequest = new HttpEntity<>(headers);
            ResponseEntity<Map> roleResponse = restTemplate.exchange(getRoleUrl, HttpMethod.GET, roleRequest, Map.class);
            if (roleResponse.getBody() == null) {
                throw new RuntimeException("Le rôle " + roleName + " n'existe pas dans Keycloak.");
            }

            // Affectation du rôle
            String assignRoleUrl = serverUrl + "/admin/realms/" + realm + "/users/" + userId + "/role-mappings/realm";
            HttpEntity<List<Map<String, Object>>> assignRoleRequest = new HttpEntity<>(List.of(roleResponse.getBody()), headers);
            restTemplate.postForEntity(assignRoleUrl, assignRoleRequest, String.class);
        } catch (Exception e) {
            // Ajoutez ici une gestion d'erreur adaptée
            throw new RuntimeException("Erreur lors de la création de l'utilisateur dans Keycloak: " + e.getMessage(), e);
        }
        return CompletableFuture.completedFuture(null);
    }

    @Async
    public CompletableFuture<Void> saveUserInDatabase(String username, String email, String firstName, String lastName, String roleName) {
        try {
            UserEntity userEntity = new UserEntity();
            userEntity.setUsername(username);
            userEntity.setEmail(email);
            userEntity.setFirstName(firstName);
            userEntity.setLastName(lastName);
            userEntity.setRole(roleName);
            userRepository.save(userEntity);
        } catch (Exception e) {
            // Ajoutez ici une gestion d'erreur adaptée
            throw new RuntimeException("Erreur lors de l'enregistrement de l'utilisateur en base de données: " + e.getMessage(), e);
        }
        return CompletableFuture.completedFuture(null);
    }

    public String authenticate(String email, String password) {
        String tokenUrl = serverUrl + "/realms/" + realm + "/protocol/openid-connect/token";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("client_id", clientId);
        form.add("username", email);
        form.add("password", password);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(form, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody().get("access_token").toString();
        }
        return null;
    }
}