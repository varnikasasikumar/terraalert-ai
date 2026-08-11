package com.terraalert.auth.service;

import java.time.LocalDateTime;
import com.terraalert.auth.exception.ResourceAlreadyExistsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.terraalert.auth.model.Role;
import com.terraalert.auth.model.User;
import com.terraalert.auth.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
        	throw new ResourceAlreadyExistsException("Username already exists");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
        	throw new ResourceAlreadyExistsException("Email already exists");
        }

        // Hash the password before saving it
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.FIELD_OFFICER);
        user.setEnabled(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }
    
    public User findByUsername(String username) {

        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
}