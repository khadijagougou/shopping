package shopping.shoppingbackend.ws.dto.dto;

import lombok.Data;

@Data
public class CategoryDto {
    private Long id;
    private String name;
    private String description;
    private String image;

}
