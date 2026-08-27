package com.lunchpass.exception;

public class QrValidationException extends RuntimeException {
    public QrValidationException(String message) {
        super(message);
    }
}
