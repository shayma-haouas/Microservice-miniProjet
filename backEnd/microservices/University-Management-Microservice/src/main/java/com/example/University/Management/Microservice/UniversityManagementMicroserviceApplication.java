package com.example.University.Management.Microservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer

public class UniversityManagementMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UniversityManagementMicroserviceApplication.class, args);
	}

}
