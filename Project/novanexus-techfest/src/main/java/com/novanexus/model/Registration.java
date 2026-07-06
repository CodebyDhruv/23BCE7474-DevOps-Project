package com.novanexus.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Registration {
    private String fullName;
    private String email;
    private String college;
    private String phone;
    private String category;
}
