package esprit.gateway.Security;




import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import reactor.core.publisher.Mono;

public interface UserClient {

    /*@GetMapping("/api/users/by-email")
    Mono<UserDTO> getUserByEmail(@RequestParam("email") String email); // Retourne un Mono<UserDTO>*/
}
