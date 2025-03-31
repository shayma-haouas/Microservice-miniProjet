package com.example.Student.Management.Microservice.Security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(CustomUserDetailsService userDetailsService, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/users/get").hasRole("ADMIN")  // Autorisation uniquement pour les utilisateurs avec le rôle ADMIN
                        .requestMatchers("/api/users/accept/{userId}").hasAnyRole("ADMIN", "USER")
                        .requestMatchers("/api/users/block/{userId}").hasRole("ADMIN")
                        .requestMatchers("/api/stage/uploadFile").hasRole("ADMIN")
                        .requestMatchers("/api/stage/lettre/{id}").hasRole("ETUDIANT")
                        .requestMatchers("/api/stage/getStages").hasRole("ADMIN")
                        .requestMatchers("/api/users/profile").hasAnyRole("ETUDIANT","ADMIN")


                        // Ajout des règles pour les méthodes de stage
                        /*.requestMatchers("/api/stages/create/**").permitAll()  // Autoriser l'accès sans authentification
                        .requestMatchers("/api/stages/{stageId}/upload").hasRole("ADMIN") */ // Autorise ADMIN seulement

                        /*.requestMatchers("/api/stages/update/**").hasAnyRole("ADMIN", "USER")
                        .requestMatchers("/api/stages/delete/**").hasRole("ADMIN")
                        .requestMatchers("/api/stages/user/**").hasAnyRole("ADMIN", "USER")
                        .requestMatchers("/api/stages/upload/journal/**").hasRole("ADMIN")*/



                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .cors(customizer -> customizer.configurationSource(corsConfigurationSource())); // Nouvelle approche pour CORS

        return http.build();
    }

    // Configure AuthenticationManager as a bean
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configuration CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*"); // ✅ Autorise toutes les origines (frontend)
        configuration.addAllowedMethod("GET");
        configuration.addAllowedMethod("POST");
        configuration.addAllowedMethod("PUT");
        configuration.addAllowedMethod("DELETE");
        configuration.addAllowedMethod("OPTIONS");  // Ajoutez OPTIONS pour les pré-demandes
        configuration.addAllowedHeader("*"); // Accepte tous les en-têtes
        configuration.setAllowCredentials(true);  // Permet l'utilisation de cookies si nécessaire

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);  // Applique la configuration CORS à toutes les URL
        return source;
    }
}
