package com.example.gestion_reservation;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@FeignClient(name = "keycloak-service", url = "http://localhost:9090")

public interface UserClient {

    @GetMapping("/api/users/{id}")
    UserEntity getUserById(@PathVariable("id") Long id);
}