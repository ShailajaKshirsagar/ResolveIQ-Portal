package com.resolveiq.app.utility;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class PromptLoader {

        public String loadFile(String name){
            try{
                ClassPathResource resource = new ClassPathResource("ai_prompts/" + name);
                return new String(resource.getInputStream().readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
            } catch (IOException e) {
                throw new RuntimeException("Error reading file: " + name);
            }
    }
}