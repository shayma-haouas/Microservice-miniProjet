package com.example.Student.Management.Microservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class StudentManagementMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentManagementMicroserviceApplication.class, args);
	}

}
