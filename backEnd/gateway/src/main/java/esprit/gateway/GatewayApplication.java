package esprit.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("university-management",
                        r -> r.path("/universites/**")
                                .uri("lb://UNIVERSITY-MANAGEMENT-MICROSERVICE")) // Nom du service dans Eureka
                // Route pour le service Student Management
                .route("student-management",
                        r -> r.path("/api/auth/**") // Toutes les routes du microservice auth
                                .uri("lb://STUDENT-MANAGEMENT-MICROSERVICE")) // LoadBalancer vers Eureka


                .build();
     }

}
