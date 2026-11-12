package com.resolveiq.app.controller;

import com.resolveiq.app.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/ai")
public class AIController {

    @Autowired
    AIService aiService;

    @PostMapping("/ask")
    public String ask(@RequestBody Map<String, String> request) {
        String question = request.get("question");
        System.out.println("API HIT");
        return aiService.askAI(question);
    }

    // Open http://localhost:8080/ai/test in your browser to see if the AI works (and why not).
    @GetMapping("/test")
    public Map<String, Object> test() {
        return aiService.diagnose();
    }
}