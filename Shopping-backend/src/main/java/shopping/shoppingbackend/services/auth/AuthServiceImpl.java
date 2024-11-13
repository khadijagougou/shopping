package shopping.shoppingbackend.services.auth;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import shopping.shoppingbackend.beans.User;
import shopping.shoppingbackend.dao.UserDao;
import shopping.shoppingbackend.ws.dto.auth.LoginRequestDto;
import shopping.shoppingbackend.ws.dto.auth.LoginResponseDto;
import shopping.shoppingbackend.enums.Role;
import shopping.shoppingbackend.services.jwt.UserService;
import shopping.shoppingbackend.util.JwtUtil;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserDao userDao;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @PostConstruct
    public void createAdminAccount() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (userDao.findByRole(Role.SUPERADMIN).isPresent()) {
            System.out.println("Super admin is already exist ! ");
        } else {
            User user = new User();
            user.setName("admin");
            user.setEmail("admin@gmail.com");
            user.setRole(Role.SUPERADMIN);
            user.setPhone("0676394043");
            user.setPassword(passwordEncoder.encode("admin"));
            userDao.save(user);
        }


    }

    public User signup(User user) {
        Optional<User> firstByEmail = userDao.findFirstByEmail(user.getEmail());
        if (firstByEmail.isPresent()) {
            throw new EntityExistsException();
        } else {
            user.setEmail(user.getEmail());
            user.setName(user.getName());
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            user.setPhone(user.getPhone());
            user.setRole(Role.CUSTOMER);
           return userDao.save(user);
        }
    }
    public LoginResponseDto login(LoginRequestDto loginRequestDto){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password.");
        }
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(loginRequestDto.getEmail());
        System.out.println(userDetails);
        Optional<User> optionalUser = userDao.findFirstByEmail(userDetails.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails);
        LoginResponseDto authenticationResponse = new LoginResponseDto();
        if (optionalUser.isPresent()) {
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setRole(optionalUser.get().getRole());
            authenticationResponse.setUserId(optionalUser.get().getId());
        }
        return authenticationResponse;
    }
    }
