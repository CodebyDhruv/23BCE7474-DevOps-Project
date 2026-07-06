package com.novanexus.controller;

import com.novanexus.model.ContactMessage;
import com.novanexus.service.SubmissionService;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@CrossOrigin
@RestController
@RequestMapping("/contact")
public class ContactController {

    private final SubmissionService submissionService;
    private final Counter contactCounter;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");

    public ContactController(SubmissionService submissionService, MeterRegistry meterRegistry) {
        this.submissionService = submissionService;
        this.contactCounter = Counter.builder("techfest.contact.messages")
                .description("Total successful contact message submissions")
                .register(meterRegistry);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContact(@RequestBody ContactMessage message) {
        Map<String, Object> response = new HashMap<>();

        // Server-side validations
        if (message.getName() == null || message.getName().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Name is required.");
            return ResponseEntity.badRequest().body(response);
        }
        if (message.getEmail() == null || !EMAIL_PATTERN.matcher(message.getEmail()).matches()) {
            response.put("success", false);
            response.put("message", "A valid email address is required.");
            return ResponseEntity.badRequest().body(response);
        }
        if (message.getSubject() == null || message.getSubject().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Subject is required.");
            return ResponseEntity.badRequest().body(response);
        }
        if (message.getMessage() == null || message.getMessage().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Message content is required.");
            return ResponseEntity.badRequest().body(response);
        }

        submissionService.addContactMessage(message);
        contactCounter.increment();

        response.put("success", true);
        response.put("message", "Your message has been sent successfully. We'll contact you soon.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public List<ContactMessage> getAllContactMessages() {
        return submissionService.getContactMessages();
    }
}
