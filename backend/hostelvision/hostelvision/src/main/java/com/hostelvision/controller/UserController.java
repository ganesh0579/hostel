package com.hostelvision.controller;

import com.hostelvision.dto.LoginRequest;
import com.hostelvision.dto.LoginResponse;
import com.hostelvision.dto.RegisterRequest;
import com.hostelvision.dto.UserResponse;
import com.hostelvision.entity.User;
import com.hostelvision.service.JwtService;
import com.hostelvision.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService,
                          JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @RequestBody RegisterRequest request) {

        User registeredUser =
                userService.registerUser(request);

        UserResponse response =
                UserResponse.fromUser(registeredUser);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        User user = userService.loginUser(request);

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );

        UserResponse userResponse =
                UserResponse.fromUser(user);

        LoginResponse response =
                new LoginResponse(token, userResponse);

        return ResponseEntity.ok(response);
    }
}