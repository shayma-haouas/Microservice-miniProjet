package esprit.gateway.Security;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationFilter implements WebFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, CustomUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
        String jwt;
        String userEmail = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            userEmail = jwtService.extractUsername(jwt);
        } else {
            return chain.filter(exchange); // Aucun token, passe au filtre suivant
        }

        if (userEmail != null) {
            return userDetailsService.findByUsername(userEmail)
                    .flatMap(userDetails -> {
                        if (jwtService.validateToken(jwt, userDetails)) {
                            var authentication = new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities()
                            );
                            // Propagation du contexte de sécurité et chaînage
                            return chain.filter(exchange)
                                    .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication));
                        } else {
                            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                            return exchange.getResponse().setComplete();
                        }
                    })
                    .switchIfEmpty(Mono.defer(() -> {
                        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                        return exchange.getResponse().setComplete();
                    }));
        }

        return chain.filter(exchange);
    }
}