package shopping.shoppingbackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shopping.shoppingbackend.beans.Category;
@Repository
public interface CategoryDao extends JpaRepository<Category,Long> {
}
