package com.example.gestion_reservation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class GestionReservationApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestionReservationApplication.class, args);
    }

}
