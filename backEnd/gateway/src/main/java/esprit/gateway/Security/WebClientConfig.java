package esprit.gateway.Security;


import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;

@Configuration
public class WebClientConfig {

    @Bean
    @LoadBalanced // ✅ Active le load balancing
    public WebClient.Builder loadBalancedWebClientBuilder() {
        return WebClient.builder()
                .filter((request, next) ->
                        ReactiveSecurityContextHolder.getContext()
                                .map(SecurityContext::getAuthentication)
                                .filter(auth -> auth.getCredentials() != null)
                                .map(auth -> ClientRequest.from(request)
                                        .header("Authorization", "Bearer " + auth.getCredentials())
                                        .build())
                                .switchIfEmpty(Mono.just(request))
                                .flatMap(next::exchange));
    }

    @Bean
    public WebClient userServiceWebClient(WebClient.Builder builder) {
        return builder.baseUrl("http://student-management-microservice") // Nom en minuscules
                .build();
    }
}