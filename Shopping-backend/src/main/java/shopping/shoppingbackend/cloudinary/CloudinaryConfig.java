package shopping.shoppingbackend.cloudinary;


import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

@Configuration
public class CloudinaryConfig {
    private String CLOUD_NAME ="dcsyadbu4";
    private String API_KEY="935216177111337";
    private String API_SECRETE="zWQaNterTM5BivCXpL59YyvpemI";

    @Bean
    public Cloudinary cloudinary() {
        var config = new HashMap<String, String>();
        config.put("cloud_name", CLOUD_NAME);
        config.put("api_key", API_KEY);
        config.put("api_secret", API_SECRETE);
        return new Cloudinary(config);
    }
}