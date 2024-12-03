package shopping.shoppingbackend.ws.provider;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shopping.shoppingbackend.beans.User;
import shopping.shoppingbackend.services.jwt.UserService;
import shopping.shoppingbackend.ws.auth.converter.UserConverter;
import shopping.shoppingbackend.ws.dto.auth.UserDto;


import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserTeamController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserConverter userConverter;
    @PostMapping
    public ResponseEntity<UserDto> save(@RequestBody UserDto userDto) throws IOException {
        User bean = userConverter.toBean(userDto);
        User save = userService.save(bean);
        UserDto bean1 = userConverter.toDto(save);
        return ResponseEntity.ok(bean1);
    }
    @PutMapping
    public ResponseEntity<UserDto> update(@RequestBody UserDto userDto) throws IOException {
        User bean = userConverter.toBean(userDto);
        User save = userService.update(bean);
        UserDto bean1 = userConverter.toDto(save);
        return ResponseEntity.ok(bean1);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable Long id){
        User save = userService.findById(id);
        UserDto dto = userConverter.toDto(save);
        return ResponseEntity.ok(dto);
    }
    @GetMapping
    public ResponseEntity<List<UserDto>> findAll(){
        List<User> all = userService.findAll();
        List<UserDto> dtos = userConverter.toDtos(all);
        return ResponseEntity.ok(dtos);
    }
    @DeleteMapping("/id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.ok(id);

    }
    @PutMapping("/update/status/user/{id}")
    public ResponseEntity<UserDto> updateFavorisById(@PathVariable Long id){
        User user = userService.updateStatusById(id);
        UserDto dto = userConverter.toDto(user);
        return ResponseEntity.ok(dto);
    }
}



