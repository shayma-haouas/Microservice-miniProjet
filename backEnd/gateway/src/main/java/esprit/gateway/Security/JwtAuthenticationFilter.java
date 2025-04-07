package esprit.gateway.Security;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtAuthenticationFilter implements WebFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, CustomUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    private static final Logger log = LoggerFactory.getLogger(CustomUserDetailsService.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
        final String jwt;  // Make jwt final
        final String userEmail;  // Make userEmail final

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);  // Token extraction
            userEmail = jwtService.extractUsername(jwt);  // Extract username from token
        } else {
            return chain.filter(exchange); // No token, proceed to next filter
        }

        if (userEmail != null) {
            log.debug("JWT Token: {}", jwt);  // Log the JWT token
            return userDetailsService.findByUsername(userEmail)
                    .flatMap(userDetails -> {
                        if (jwtService.validateToken(jwt, userDetails)) {
                            log.debug("Token valid for user: {}", userEmail);  // Log token validation
                            var authentication = new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities()
                            );
                            return chain.filter(exchange)
                                    .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication));
                        } else {
                            log.error("Invalid token for user: {}", userEmail);  // Log if token is invalid
                            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                            return exchange.getResponse().setComplete();
                        }
                    })
                    .switchIfEmpty(Mono.defer(() -> {
                        log.error("User not found: {}", userEmail);  // Log if user not found
                        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                        return exchange.getResponse().setComplete();
                    }));
        }

        return chain.filter(exchange);
    }
}
