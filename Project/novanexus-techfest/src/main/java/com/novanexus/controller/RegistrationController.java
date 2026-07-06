package com.novanexus.controller;

import com.novanexus.model.Registration;
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
@RequestMapping("/register")
public class RegistrationController {

    private final SubmissionService submissionService;
    private final Counter registrationsCounter;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
    private static final List<String> CATEGORIES = List.of("AI", "Robotics", "Web Development", "Hackathon", "Cyber Security");

    public RegistrationController(SubmissionService submissionService, MeterRegistry meterRegistry) {
        this.submissionService = submissionService;
        this.registrationsCounter = Counter.builder("techfest.registrations")
                .description("Total successful registrations")
                .register(meterRegistry);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> register(@RequestBody Registration registration) {
        Map<String, Object> response = new HashMap<>();

        // Server-side validations
        if (registration.getFullName() == null || registration.getFullName().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Full Name is required.");
            return ResponseEntity.badRequest().body(response);
        }
        if (registration.getEmail() == null || !EMAIL_PATTERN.matcher(registration.getEmail()).matches()) {
            response.put("success", false);
            response.put("message", "A valid email address is required.");
            return ResponseEntity.badRequest().body(response);
        }
        if (registration.getCollege() == null || registration.getCollege().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "College / Organization is required.");
            return ResponseEntity.badRequest().body(response);
        }
        if (registration.getPhone() == null || registration.getPhone().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Phone number is required.");
            return ResponseEntity.badRequest().body(response);
        }
        if (registration.getCategory() == null || !CATEGORIES.contains(registration.getCategory())) {
            response.put("success", false);
            response.put("message", "Please select a valid event category.");
            return ResponseEntity.badRequest().body(response);
        }

        submissionService.addRegistration(registration);
        registrationsCounter.increment();

        response.put("success", true);
        response.put("message", "Registration Successful! Thank you for registering for NovaNexus TechFest.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public List<Registration> getAllRegistrations() {
        return submissionService.getRegistrations();
    }
}
