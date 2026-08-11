package com.terraalert.auth.controller;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.terraalert.auth.dto.RegisterRequest;
import com.terraalert.auth.dto.RegisterResponse;
import com.terraalert.auth.model.User;
import com.terraalert.auth.service.UserService;
import com.terraalert.auth.exception.InvalidCredentialsException;
import com.terraalert.auth.dto.LoginRequest;
import com.terraalert.auth.dto.LoginResponse;
import com.terraalert.auth.security.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(
            UserService userService,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {

        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setFullName(request.getFullName());
        user.setRole(request.getRole());

        User savedUser = userService.registerUser(user);

        RegisterResponse response = new RegisterResponse(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getRole(),
                savedUser.isEnabled()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        try {

            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(),
                                    request.getPassword()
                            )
                    );

            String username = authentication.getName();

            String token = jwtService.generateToken(username);

            User user = userService.findByUsername(username);

            LoginResponse response = new LoginResponse(
                    token,
                    user.getUsername(),
                    user.getFullName(),
                    user.getRole()
            );

            return ResponseEntity.ok(response);

        } catch (AuthenticationException exception) {

            throw new InvalidCredentialsException(
                    "Invalid username or password"
            );
        }
    }
}