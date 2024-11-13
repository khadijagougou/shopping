package shopping.shoppingbackend.ws.dto.auth;

import lombok.Data;
import shopping.shoppingbackend.enums.Role;

@Data
public class LoginResponseDto {
    private String jwt;
    private Long userId;
    private Role role;
}
