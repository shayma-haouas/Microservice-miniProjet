package esprit.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication

@EnableFeignClients
@EnableDiscoveryClient // ✅ Activation d'Eureka


public class GatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("university-management",
                        r -> r.path("/universites/**")
                                .uri("lb://University-Management-Microservice")) // Nom du service dans Eureka
                // Route pour le service Student Management
                .route("student-management",
                        r -> r.path("/api/auth/**") // Toutes les routes du microservice auth
                                .uri("lb://Student-Management-Microservice")) // LoadBalancer vers Eureka


                .build();
     }


    /*@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:4200");
        configuration.addAllowedMethod("*");  // Ajoutez un "*" pour autoriser toutes les méthodes
        configuration.addAllowedHeader("*");  // Ajoutez un "*" pour autoriser tous les headers
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }*/


}
