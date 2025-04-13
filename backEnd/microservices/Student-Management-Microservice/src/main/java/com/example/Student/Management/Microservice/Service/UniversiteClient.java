package com.example.Student.Management.Microservice.Service;

import com.example.Student.Management.Microservice.DTO.UniversiteDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "University-Management-Microservice")
public interface UniversiteClient {

    @GetMapping("/universites/{id}")
    UniversiteDTO getUniversiteById(@PathVariable("id") Long id);
}
