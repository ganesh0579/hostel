package com.hostelvision.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(
            RuntimeException exception) {

        String message = exception.getMessage();

        HttpStatus status;

        if ("Email already registered".equals(message)
                || "Phone number already registered".equals(message)) {

            status = HttpStatus.CONFLICT;

        } else if ("Invalid email or password".equals(message)) {

            status = HttpStatus.UNAUTHORIZED;

        } else {

            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        Map<String, Object> response = Map.of(
                "timestamp", LocalDateTime.now(),
                "status", status.value(),
                "error", status.getReasonPhrase(),
                "message", message
        );

        return ResponseEntity
                .status(status)
                .body(response);
    }
}