package com.hostelvision.controller;

import com.hostelvision.dto.RegisterRequest;
import com.hostelvision.dto.UserResponse;
import com.hostelvision.entity.User;
import com.hostelvision.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @RequestBody RegisterRequest request) {

        User registeredUser = userService.registerUser(request);

        UserResponse response =
                UserResponse.fromUser(registeredUser);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}