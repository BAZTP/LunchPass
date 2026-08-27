package com.lunchpass.exception;

public class OutOfScheduleException extends RuntimeException {
    public OutOfScheduleException(String message) {
        super(message);
    }
}
