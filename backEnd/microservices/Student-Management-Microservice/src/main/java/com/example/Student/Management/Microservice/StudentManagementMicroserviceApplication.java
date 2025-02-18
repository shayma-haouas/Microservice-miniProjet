package com.example.Student.Management.Microservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer

public class StudentManagementMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentManagementMicroserviceApplication.class, args);
	}

}
