package shopping.shoppingbackend.services.user;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import shopping.shoppingbackend.beans.User;
import shopping.shoppingbackend.dao.UserDao;
import shopping.shoppingbackend.enums.Role;

import java.io.IOException;
import java.util.*;

@Service
public class UserTeamTeamServiceImpl implements UserTeamService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private Cloudinary cloudinary;


    public User save(User user) throws IOException {
        byte[] imageBytes = Base64.getDecoder().decode(user.getImage());
        String url = cloudinary.uploader()
                .upload(imageBytes, Map.of("public_id", UUID.randomUUID().toString()))
                .get("url")
                .toString();
        user.setImage(url);
        user.setRole(Role.ADMIN);
        user.setStatus(true);
        return userDao.save(user);
    }
    @Override
    public User updateStatusById(Long id) {
        userDao.toggleStatusById(id);
        return userDao.findById(id).orElse(null);
    }
    public User findById(Long id) {
        return userDao.findById(id).orElse(null);
    }

    public User update(User user) throws IOException {

        Optional<User> existingUserOpt = userDao.findById(user.getId());

        if (existingUserOpt.isEmpty()) {
            throw new IllegalArgumentException("User not found with ID: " + user.getId());
        }
        User existingUser = existingUserOpt.get();
        if (user.getImage().equals(existingUser.getImage())) {
            return userDao.save(user);
        } else if (user.getImage().isEmpty()) {
            if (existingUser.getImage()==null){
                user.setImage(null);}
            else {
                user.setImage(existingUser.getImage());
            }
            return userDao.save(user);
        } else {
            byte[] imageBytes = Base64.getDecoder().decode(user.getImage());
            String url = cloudinary.uploader()
                    .upload(imageBytes, Map.of("public_id", UUID.randomUUID().toString()))
                    .get("url")
                    .toString();
            user.setImage(url);
            return userDao.save(user);
        }
    }

    public List<User> findAll() {
        return userDao.findAll();
    }

    @Transactional
    public void deleteById(Long id) {
        userDao.deleteById(id);
    }
}




