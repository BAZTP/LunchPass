package com.lunchpass.service;

import org.springframework.stereotype.Service;

@Service
public class AuthService {
    public String login(String username, String password) {
        if ("admin".equals(username) && "admin".equals(password)) {
            return "token";
        }
        throw new RuntimeException("Invalid credentials");
    }
}
