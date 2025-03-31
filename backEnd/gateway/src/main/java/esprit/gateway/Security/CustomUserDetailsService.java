package esprit.gateway.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class CustomUserDetailsService implements ReactiveUserDetailsService {

    private final WebClient userWebClient;

    public CustomUserDetailsService(WebClient.Builder webClientBuilder) {
        this.userWebClient = webClientBuilder.baseUrl("http://Student-Management-Microservice").build();
    }

    @Override
    public Mono<UserDetails> findByUsername(String username) {
        return userWebClient.get()
                .uri("/api/users/by-email?email={email}", username)
                .header("Authorization", "Bearer {token}") // Le token sera injecté dynamiquement
                .retrieve()
                .bodyToMono(UserDTO.class)
                .map(userDTO ->
                        User.withUsername(userDTO.getEmail())
                                .password(userDTO.getPassword())
                                .roles(userDTO.getRoles().toArray(new String[0]))
                                .build()
                );
    }
}
