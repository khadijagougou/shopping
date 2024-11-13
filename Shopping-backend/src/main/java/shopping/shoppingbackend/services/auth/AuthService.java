package shopping.shoppingbackend.services.auth;

import shopping.shoppingbackend.beans.User;
import shopping.shoppingbackend.ws.dto.auth.LoginRequestDto;
import shopping.shoppingbackend.ws.dto.auth.LoginResponseDto;

public interface AuthService {
    User signup(User user);
    LoginResponseDto login(LoginRequestDto loginRequestDto);
}
