package com.novanexus.service;

import com.novanexus.model.ContactMessage;
import com.novanexus.model.Registration;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SubmissionService {

    private final List<Registration> registrations = new CopyOnWriteArrayList<>();
    private final List<ContactMessage> contactMessages = new CopyOnWriteArrayList<>();

    public void addRegistration(Registration registration) {
        registrations.add(registration);
    }

    public List<Registration> getRegistrations() {
        return registrations;
    }

    public void addContactMessage(ContactMessage message) {
        contactMessages.add(message);
    }

    public List<ContactMessage> getContactMessages() {
        return contactMessages;
    }
}
