package shopping.shoppingbackend.ws.auth.provider;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shopping.shoppingbackend.beans.User;
import shopping.shoppingbackend.ws.dto.auth.LoginRequestDto;
import shopping.shoppingbackend.ws.dto.auth.LoginResponseDto;
import shopping.shoppingbackend.ws.dto.auth.UserDto;
import shopping.shoppingbackend.services.auth.AuthService;
import shopping.shoppingbackend.ws.auth.converter.UserConverter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserConverter userConverter;

    @PostMapping("/signup")
    public ResponseEntity<UserDto> signup(@RequestBody UserDto userDto) {
        User bean = userConverter.toBean(userDto);
        User signup = authService.signup(bean);
        UserDto dto = userConverter.toDto(signup);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        LoginResponseDto login = authService.login(loginRequestDto);
        return ResponseEntity.ok(login);
    }
}
