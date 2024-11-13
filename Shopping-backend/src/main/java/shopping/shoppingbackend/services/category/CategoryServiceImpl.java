package shopping.shoppingbackend.services.category;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shopping.shoppingbackend.beans.Category;
import shopping.shoppingbackend.dao.CategoryDao;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryDao categoryDao;
    @Autowired
    private Cloudinary cloudinary;
    public Category save(Category category) throws IOException {
        byte[] imageBytes = Base64.getDecoder().decode(category.getImage());
        String url = cloudinary.uploader()
                .upload(imageBytes, Map.of("public_id", UUID.randomUUID().toString()))
                .get("url")
                .toString();
        category.setImage(url);
        return categoryDao.save(category);
    }
    public Category findById(Long id){
        return categoryDao.findById(id).orElse(null);
    }
    public Category update(Category category){

        return categoryDao.save(category);
    }
    public List<Category> findAll(){
        return categoryDao.findAll();
    }
    @Transactional
    public void deleteById(Long id){
         categoryDao.deleteById(id);
    }
}
