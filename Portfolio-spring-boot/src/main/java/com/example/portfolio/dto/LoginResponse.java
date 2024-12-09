package com.example.portfolio.dto;

import lombok.Data;

@Data
public class LoginResponse {
    Long id;
    String firstname;
    String lastname;
    String email;
    String authToken;
}
