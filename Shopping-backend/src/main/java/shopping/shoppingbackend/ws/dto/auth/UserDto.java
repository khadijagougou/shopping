package shopping.shoppingbackend.ws.dto.auth;

import lombok.Data;
import shopping.shoppingbackend.enums.Role;

@Data
public class UserDto
{
    private String email;
    private String password;
    private String name;
    private String phone;
}
