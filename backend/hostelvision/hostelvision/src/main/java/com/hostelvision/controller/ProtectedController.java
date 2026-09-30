package com.hostelvision.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProtectedController {

    @GetMapping("/api/protected")
    public String protectedApi(Authentication authentication) {

        return "Welcome " + authentication.getName()
                + "! You have accessed a protected API.";
    }
}