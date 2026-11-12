package com.resolveiq.app.service;

import com.resolveiq.app.dto.AuthResponse;
import com.resolveiq.app.dto.LoginRequest;
import com.resolveiq.app.dto.RegisterRequest;
import com.resolveiq.app.entity.User;
import com.resolveiq.app.enums.Role;
import com.resolveiq.app.notification.EmailService;
import com.resolveiq.app.repository.UserRepository;
import com.resolveiq.app.security.JwtService;
import com.resolveiq.app.utility.EmailValidatorUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    JwtService jwtService;
    @Autowired
    EmailValidatorUtil emailValidatorUtil;
    @Autowired
    EmailService emailService;

    private String generateUsername(String fullName) {

        String[] parts = fullName.trim().split(" ");
        String firstName = parts[0].toLowerCase();
        String lastInitial = "";
        if (parts.length > 1) {
            lastInitial = parts[1].substring(0, 1).toLowerCase();
        }
        String baseUsername = firstName + lastInitial;
        String username = baseUsername;
        int count = 1;
        while (userRepository.existsByUsername(username)) {
            username = baseUsername + count;
            count++;
        }
        return username;
    }

    public String register(RegisterRequest request) {

        emailValidatorUtil.validateCollegeEmail(request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User already exists");
        }
        String generatedUsername = generateUsername(request.getFullname());

        User user = User.builder()
                .fullname(request.getFullname())
                .email(request.getEmail())
                .username(generatedUsername)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);
        emailService.sendRegistrationEmail(
                user.getEmail(),
                user.getFullname(),
                generatedUsername,
                request.getPassword()
        );

        return "Student registered successfully. Credentials sent to email.";
    }
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = jwtService.generateToken(user.getId(), user.getRole());
        String message;
        if(user.getRole().name().equals("ADMIN")){
            message = "Welcome to Admin Dashboard";
        } else {
            message = "Welcome Student";
        }
        return new AuthResponse(token, user.getRole().name(),user.getFullname(), message);
    }
}

