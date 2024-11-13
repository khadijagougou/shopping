package shopping.shoppingbackend.ws.converter;

import org.springframework.stereotype.Component;
import shopping.shoppingbackend.beans.Category;
import shopping.shoppingbackend.ws.dto.dto.CategoryDto;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryConverter {
    public CategoryDto toDto(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setName(category.getName());
        categoryDto.setId(category.getId());
        categoryDto.setDescription(category.getDescription());
        categoryDto.setImage(category.getImage());
        return categoryDto;
    }

    public Category toBean(CategoryDto categoryDto) {
        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setId(categoryDto.getId());
        category.setDescription(categoryDto.getDescription());
        category.setImage(categoryDto.getImage());
        return category;
    }

    public List<Category> toBeans(List<CategoryDto> list) {
        return list.stream().map(this::toBean).collect(Collectors.toList());
    }

    public List<CategoryDto> toDtos(List<Category> list) {
        return list.stream().map(this::toDto).collect(Collectors.toList());
    }
}

