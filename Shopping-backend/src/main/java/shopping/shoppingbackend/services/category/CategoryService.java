package shopping.shoppingbackend.services.category;

import shopping.shoppingbackend.beans.Category;

import java.io.IOException;
import java.util.List;

public interface CategoryService {
    Category save(Category category) throws IOException;
    Category findById(Long id);
    Category update(Category category);
    List<Category> findAll();
    void deleteById(Long id);
}
