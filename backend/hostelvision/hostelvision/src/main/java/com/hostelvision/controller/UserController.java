package com.hostelvision.controller;

import com.hostelvision.dto.LoginRequest;
import com.hostelvision.dto.LoginResponse;
import com.hostelvision.dto.RegisterRequest;
import com.hostelvision.dto.UserResponse;
import com.hostelvision.entity.User;
import com.hostelvision.dto.ProfileResponse;
import com.hostelvision.dto.UpdateProfileRequest;
import com.hostelvision.service.JwtService;
import com.hostelvision.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

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
    // Get logged-in user's profile
@GetMapping("/profile")
public ResponseEntity<ProfileResponse> getProfile(
        Authentication authentication) {

    String email = authentication.getName();

    return ResponseEntity.ok(
            userService.getProfile(email)
    );
}


// Update logged-in user's profile
@PutMapping("/profile")
public ResponseEntity<ProfileResponse> updateProfile(
        @RequestBody UpdateProfileRequest request,
        Authentication authentication) {

    String email = authentication.getName();

    return ResponseEntity.ok(
            userService.updateProfile(
                    email,
                    request
            )
    );
}
}