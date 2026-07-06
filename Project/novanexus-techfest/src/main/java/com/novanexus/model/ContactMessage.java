package com.novanexus.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessage {
    private String name;
    private String email;
    private String subject;
    private String message;
}
