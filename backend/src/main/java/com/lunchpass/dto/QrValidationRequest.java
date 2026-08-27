package com.lunchpass.dto;

public class QrValidationRequest {
    private String token;

    public QrValidationRequest() {}
    public QrValidationRequest(String token) { this.token = token; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
