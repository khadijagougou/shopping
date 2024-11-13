package shopping.shoppingbackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shopping.shoppingbackend.beans.User;
import shopping.shoppingbackend.enums.Role;

import java.util.Optional;
@Repository
public interface UserDao extends JpaRepository<User,Long> {
   Optional<User> findFirstByEmail(String email);
    Optional<User> findByRole(Role role);

}
