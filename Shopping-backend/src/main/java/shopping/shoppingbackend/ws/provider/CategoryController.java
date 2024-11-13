package shopping.shoppingbackend.ws.provider;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shopping.shoppingbackend.beans.Category;
import shopping.shoppingbackend.services.category.CategoryService;
import shopping.shoppingbackend.ws.converter.CategoryConverter;
import shopping.shoppingbackend.ws.dto.dto.CategoryDto;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryConverter categoryConverter;
    @PostMapping
    public ResponseEntity<CategoryDto> save(@RequestBody CategoryDto categoryDto) throws IOException {
        Category bean = categoryConverter.toBean(categoryDto);
        Category save = categoryService.save(bean);
        CategoryDto bean1 = categoryConverter.toDto(save);
        return ResponseEntity.ok(bean1);
    }
    @PutMapping
    public ResponseEntity<CategoryDto> update(@RequestBody CategoryDto categoryDto){
        Category bean = categoryConverter.toBean(categoryDto);
        Category save = categoryService.update(bean);
        CategoryDto bean1 = categoryConverter.toDto(save);
        return ResponseEntity.ok(bean1);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<CategoryDto> findById(@PathVariable Long id){
        Category save = categoryService.findById(id);
        CategoryDto dto = categoryConverter.toDto(save);
        return ResponseEntity.ok(dto);
    }
    @GetMapping
    public ResponseEntity<List<CategoryDto>> findAll(){
        List<Category> all = categoryService.findAll();
        List<CategoryDto> dtos = categoryConverter.toDtos(all);
        return ResponseEntity.ok(dtos);
    }
}
