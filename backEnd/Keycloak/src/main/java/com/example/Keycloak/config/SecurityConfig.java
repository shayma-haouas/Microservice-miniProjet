package com.example.Keycloak.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Autowired
    JwtAuthConverter authConverter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthConverter authConverter) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/helloAdmin").hasRole("ADMIN")
                        .requestMatchers("/helloUser").hasRole("USER")
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 ->
                        // Personnalisez le RequestMatcher du filtre JWT pour ne pas appliquer sur /register
                        oauth2.jwt(jwt -> jwt
                                .jwtAuthenticationConverter(authConverter)
                        )
                );
        return http.build();
    }




}