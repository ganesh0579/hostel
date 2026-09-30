package com.hostelvision.service;
import com.hostelvision.dto.ProfileResponse;
import com.hostelvision.dto.UpdateProfileRequest;
import com.hostelvision.dto.LoginRequest;
import com.hostelvision.dto.RegisterRequest;
import com.hostelvision.entity.User;
import com.hostelvision.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone number already registered");
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        if (request.getRole() == null || request.getRole().isBlank()) {
            user.setRole("CUSTOMER");
        } else {
            user.setRole(request.getRole());
        }

        return userRepository.save(user);
    }
    public User loginUser(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));

    if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPassword())) {

        throw new RuntimeException("Invalid email or password");
    }

    return user;
}
// Get logged-in user's profile
public ProfileResponse getProfile(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    return ProfileResponse.fromUser(user);
}


// Update logged-in user's profile
public ProfileResponse updateProfile(
        String email,
        UpdateProfileRequest request) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    if (request.getFullName() == null ||
            request.getFullName().isBlank()) {

        throw new RuntimeException(
                "Full name is required");
    }

    if (request.getPhone() == null ||
            request.getPhone().isBlank()) {

        throw new RuntimeException(
                "Phone number is required");
    }

    // Check whether the new phone belongs
    // to another user
    if (!user.getPhone().equals(request.getPhone())
            && userRepository.existsByPhone(
                    request.getPhone())) {

        throw new RuntimeException(
                "Phone number already registered");
    }

    user.setFullName(request.getFullName());
    user.setPhone(request.getPhone());

    User updatedUser =
            userRepository.save(user);

    return ProfileResponse.fromUser(updatedUser);
}
}