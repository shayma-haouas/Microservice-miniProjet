package com.example.Student.Management.Microservice.Service;

import com.example.Student.Management.Microservice.DTO.UniversiteDTO;
import com.example.Student.Management.Microservice.Entities.User;
import com.example.Student.Management.Microservice.Repository.UserRepository;
import feign.FeignException;
import org.springframework.stereotype.Service;

@Service
public class UserUniversityService {

    private final UniversiteClient universiteClient;
    private final UserRepository userRepository;

    public UserUniversityService(UniversiteClient universiteClient, UserRepository userRepository) {
        this.universiteClient = universiteClient;
        this.userRepository = userRepository;
    }



    public UniversiteDTO getUniversiteOfUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        try {
            return universiteClient.getUniversiteById(user.getUniversiteId());
        } catch (FeignException.NotFound e) {
            throw new RuntimeException("Universite not found for user ID: " + userId);
        } catch (FeignException e) {
            throw new RuntimeException("Error communicating with University microservice: " + e.getMessage());
        }
    }

}
