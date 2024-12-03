package shopping.shoppingbackend.services.user;

import shopping.shoppingbackend.beans.User;

import java.io.IOException;
import java.util.List;

public interface UserTeamService {
    User save(User tser) throws IOException;

    User updateStatusById(Long id);

    User findById(Long id);
    User update(User tser) throws IOException;
    List<User> findAll();
    void deleteById(Long id);
}
