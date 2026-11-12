package com.resolveiq.app.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resolveiq.app.utility.PromptLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Works with any OpenAI-compatible FREE provider:
 *  - Groq        (default)  https://api.groq.com/openai/v1
 *  - OpenRouter             https://openrouter.ai/api/v1
 *  - Ollama (local, no key) http://localhost:11434/v1
 * Only application.properties changes when you switch provider.
 */
@Service
public class AIService {

    private static final Logger log = LoggerFactory.getLogger(AIService.class);

    @Autowired
    private PromptLoader promptLoader;

    @Value("${ai.api.key:}")
    private String apiKey;

    @Value("${ai.base.url:https://api.groq.com/openai/v1}")
    private String baseUrl;

    @Value("${ai.model:llama-3.3-70b-versatile}")
    private String configuredModel;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    private volatile String workingModel;
    private volatile String lastError;
    private volatile boolean keyProblem;

    // ------------------------------------------------------------------
    // MAIN ENTRY
    // ------------------------------------------------------------------
    public String askAI(String question) {

        if (question == null || question.isBlank()) {
            return "Please type a question first.";
        }

        boolean needsKey = !baseUrl.contains("localhost") && !baseUrl.contains("127.0.0.1");
        if (needsKey && (apiKey == null || apiKey.isBlank() || apiKey.startsWith("PASTE"))) {
            lastError = "ai.api.key is missing in application.properties";
            log.error(lastError);
            return getOfflineResponse(question);
        }

        try {
            String system = promptLoader.loadFile("rules") + "\n\n" + promptLoader.loadFile("college_data");

            // Phase 1: models we already know
            String answer = tryModels(knownModels(), system, question);

            // Phase 2: ask the provider which models exist and try those
            if (answer == null && !keyProblem) {
                answer = tryModels(discoverModels(), system, question);
            }
            if (answer != null) {
                return answer;
            }
        } catch (Exception e) {
            lastError = "Unexpected error: " + e;
            log.error("AI call failed", e);
        }
        return getOfflineResponse(question);
    }

    // ------------------------------------------------------------------
    // DIAGNOSTICS  ->  http://localhost:8080/ai/test
    // ------------------------------------------------------------------
    public Map<String, Object> diagnose() {
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("baseUrl", baseUrl);
        out.put("apiKeyPresent", apiKey != null && !apiKey.isBlank() && !apiKey.startsWith("PASTE"));
        out.put("configuredModel", configuredModel);
        try {
            out.put("testReply", askAI("What complaint categories are available?"));
        } catch (Exception e) {
            out.put("testReply", "ERROR: " + e);
        }
        out.put("workingModel", workingModel);
        out.put("lastError", lastError);
        out.put("keyRejected", keyProblem);
        out.put("status", (workingModel != null && lastError == null)
                ? "AI IS WORKING" : "AI NOT WORKING - read lastError");
        return out;
    }

    // ------------------------------------------------------------------
    // HELPERS
    // ------------------------------------------------------------------
    private List<String> knownModels() {
        Set<String> models = new LinkedHashSet<>();
        if (workingModel != null) models.add(workingModel);
        if (configuredModel != null && !configuredModel.isBlank()) models.add(configuredModel.trim());
        if (baseUrl.contains("groq.com")) {
            models.add("llama-3.3-70b-versatile");
            models.add("llama-3.1-8b-instant");
        }
        return new ArrayList<>(models);
    }

    private String tryModels(List<String> models, String system, String question) {
        for (String m : models) {
            try {
                String text = chat(m, system, question);
                if (text != null) {
                    workingModel = m;
                    lastError = null;
                    keyProblem = false;
                    return text;
                }
                lastError = "Model '" + m + "' returned an empty answer";
                log.warn(lastError);

            } catch (HttpStatusCodeException e) {
                int code = e.getStatusCode().value();
                lastError = "HTTP " + code + " from model '" + m + "': " + e.getResponseBodyAsString();
                log.error("AI API error: {}", lastError);

                if (code == 401 || code == 403) {   // wrong key: other models won't help
                    keyProblem = true;
                    return null;
                }
                // 400/404 (model removed), 429 (rate limit), 5xx -> try next model
            } catch (Exception e) {
                lastError = "Network/other error with model '" + m + "': " + e;
                log.error(lastError, e);
            }
        }
        return null;
    }

    /** One OpenAI-style chat completion call. */
    private String chat(String model, String system, String question) throws Exception {
        Map<String, Object> body = Map.of(
                "model", model,
                "temperature", 0.3,
                "messages", List.of(
                        Map.of("role", "system", "content", system),
                        Map.of("role", "user", "content", question))
        );

        ResponseEntity<String> response = restTemplate.postForEntity(
                trimSlash(baseUrl) + "/chat/completions",
                new HttpEntity<>(body, headers(true)),
                String.class);

        String text = mapper.readTree(response.getBody())
                .path("choices").path(0).path("message").path("content").asText("");

        // some "thinking" models wrap reasoning in <think>...</think>; hide it from students
        text = text.replaceAll("(?s)<think>.*?</think>", "").trim();
        return text.isEmpty() ? null : text;
    }

    private List<String> discoverModels() {
        List<String> found = new ArrayList<>();
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    trimSlash(baseUrl) + "/models", HttpMethod.GET,
                    new HttpEntity<>(headers(false)), String.class);

            for (JsonNode m : mapper.readTree(response.getBody()).path("data")) {
                String id = m.path("id").asText();
                String n = id.toLowerCase();
                if (!id.isEmpty() && !n.matches(".*(whisper|guard|tts|embed|playai|orpheus|speech|vision-preview|safeguard).*")) {
                    found.add(id);
                }
            }
            log.info("Models available from provider: {}", found);
        } catch (HttpStatusCodeException e) {
            lastError = "Could not list models. HTTP " + e.getStatusCode().value() + ": " + e.getResponseBodyAsString();
            log.error(lastError);
            int code = e.getStatusCode().value();
            if (code == 401 || code == 403) keyProblem = true;
        } catch (Exception e) {
            lastError = "Could not list models: " + e;
            log.error(lastError, e);
        }
        return found.size() > 6 ? found.subList(0, 6) : found;
    }

    private HttpHeaders headers(boolean json) {
        HttpHeaders h = new HttpHeaders();
        if (json) h.setContentType(MediaType.APPLICATION_JSON);
        if (apiKey != null && !apiKey.isBlank()) h.setBearerAuth(apiKey.trim());
        h.set("User-Agent", "ResolveIQ/1.0");   // some providers block Java's default agent
        return h;
    }

    private String trimSlash(String s) {
        return s.endsWith("/") ? s.substring(0, s.length() - 1) : s;
    }

    // ------------------------------------------------------------------
    // OFFLINE FALLBACK (only when the AI provider cannot be reached)
    // ------------------------------------------------------------------
    private String getOfflineResponse(String question) {

        String q = question.toLowerCase();

        if (q.contains("complaint")) {
            return "To raise a complaint, go to the dashboard and click on 'Raise Complaint'. Fill the form and submit.";
        }
        if (q.contains("name")) {
            return "My name is ResolveIQ";
        }
        if (q.contains("login")) {
            return "You can login using your registered email and password.";
        }
        if (q.contains("register")) {
            return "Click on Register and fill your details to create an account.";
        }
        if (q.contains("status")) {
            return "You can check complaint status in 'My Complaints' section.";
        }
        if (q.contains("contact")) {
            return "You can contact admin through the help section or email support.";
        }

        return "AI service is currently unavailable. Please try again later";
    }
}