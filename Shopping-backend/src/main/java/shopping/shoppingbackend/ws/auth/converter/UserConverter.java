package shopping.shoppingbackend.ws.auth.converter;

import org.springframework.stereotype.Component;
import shopping.shoppingbackend.beans.User;
import shopping.shoppingbackend.ws.dto.auth.UserDto;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserConverter {
    public UserDto toDto(User user){
        UserDto userDto = new UserDto();
        userDto.setName(user.getName());
        userDto.setPhone(user.getPhone());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        return userDto;
    }
    public User toBean(UserDto userDto){
        User user = new User();
        user.setName(userDto.getName());
        user.setPhone(userDto.getPhone());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        return user;
    }
    public List<User> toBeans(List<UserDto> list){
        return list.stream().map(this::toBean).collect(Collectors.toList());
    }
    public List<UserDto> toDtos(List<User> list){
        return list.stream().map(this::toDto).collect(Collectors.toList());
    }
}
