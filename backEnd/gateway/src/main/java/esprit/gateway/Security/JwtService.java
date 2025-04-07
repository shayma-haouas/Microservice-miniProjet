package esprit.gateway.Security;

import io.jsonwebtoken.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtService {

    private static final String SECRET = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg";
    private static final long EXPIRATION_TIME = 86400000; // 1 jour

    // Générer un token JWT
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("role", userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList())) // ✅ Stocke les rôles sous forme de liste
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    // Extraire l'email (ou username) du token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Valider le token JWT
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // Vérifier si le token est expiré
    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // Extraire les claims du token avec gestion des exceptions
    private Claims extractClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(SECRET)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (MalformedJwtException e) {
            throw new JwtException("Le JWT est malformé", e);
        } catch (ExpiredJwtException e) {
            throw new JwtException("Le JWT a expiré", e);
        } catch (SignatureException e) {
            throw new JwtException("La signature du JWT est invalide", e);
        } catch (Exception e) {
            throw new JwtException("Erreur lors de l'extraction des claims", e);
        }
    }
}
