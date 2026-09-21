package com.terraalert.auth.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.terraalert.auth.dto.UserManagementResponse;
import com.terraalert.auth.exception.ResourceAlreadyExistsException;
import com.terraalert.auth.model.Role;
import com.terraalert.auth.model.User;
import com.terraalert.auth.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // =========================================================
    // REGISTER USER
    // =========================================================

    public User registerUser(User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new ResourceAlreadyExistsException(
                    "Username already exists"
            );
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ResourceAlreadyExistsException(
                    "Email already exists"
            );
        }

        // Hash password before saving
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        // Default role
        if (user.getRole() == null) {
            user.setRole(Role.FIELD_OFFICER);
        }

        user.setEnabled(true);

        user.setCreatedAt(
                LocalDateTime.now()
        );

        user.setUpdatedAt(
                LocalDateTime.now()
        );

        return userRepository.save(user);
    }

    // =========================================================
    // FIND USER BY USERNAME
    // Used during login
    // =========================================================

    public User findByUsername(String username) {

        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );
    }

    // =========================================================
    // GET ALL USERS
    // ADMIN ONLY
    // =========================================================

    public List<UserManagementResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::toUserManagementResponse)
                .toList();
    }

    // =========================================================
    // GET USER BY ID
    // ADMIN ONLY
    // =========================================================

    public UserManagementResponse getUserById(String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        return toUserManagementResponse(user);
    }

    // =========================================================
    // UPDATE USER
    // ADMIN ONLY
    // =========================================================

    public UserManagementResponse updateUser(
            String id,
            User updatedUser) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        // Update username only if supplied
        if (updatedUser.getUsername() != null
                && !updatedUser.getUsername()
                        .equals(existingUser.getUsername())) {

            if (userRepository.existsByUsername(
                    updatedUser.getUsername())) {

                throw new ResourceAlreadyExistsException(
                        "Username already exists"
                );
            }

            existingUser.setUsername(
                    updatedUser.getUsername()
            );
        }

        // Update email only if supplied
        if (updatedUser.getEmail() != null
                && !updatedUser.getEmail()
                        .equals(existingUser.getEmail())) {

            if (userRepository.existsByEmail(
                    updatedUser.getEmail())) {

                throw new ResourceAlreadyExistsException(
                        "Email already exists"
                );
            }

            existingUser.setEmail(
                    updatedUser.getEmail()
            );
        }

        if (updatedUser.getFullName() != null) {
            existingUser.setFullName(
                    updatedUser.getFullName()
            );
        }

        if (updatedUser.getRole() != null) {
            existingUser.setRole(
                    updatedUser.getRole()
            );
        }

        existingUser.setEnabled(
                updatedUser.isEnabled()
        );

        existingUser.setUpdatedAt(
                LocalDateTime.now()
        );

        User savedUser =
                userRepository.save(existingUser);

        return toUserManagementResponse(savedUser);
    }

    // =========================================================
    // DISABLE USER
    // =========================================================

    public UserManagementResponse disableUser(
            String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        user.setEnabled(false);

        user.setUpdatedAt(
                LocalDateTime.now()
        );

        User savedUser =
                userRepository.save(user);

        return toUserManagementResponse(savedUser);
    }

    // =========================================================
    // ENABLE USER
    // =========================================================

    public UserManagementResponse enableUser(
            String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        user.setEnabled(true);

        user.setUpdatedAt(
                LocalDateTime.now()
        );

        User savedUser =
                userRepository.save(user);

        return toUserManagementResponse(savedUser);
    }

    // =========================================================
    // DELETE USER
    // =========================================================

    public void deleteUser(String id) {

        if (!userRepository.existsById(id)) {

            throw new RuntimeException(
                    "User not found"
            );
        }

        userRepository.deleteById(id);
    }

    // =========================================================
    // CONVERT USER → SAFE RESPONSE
    // =========================================================

    private UserManagementResponse toUserManagementResponse(
            User user) {

        return new UserManagementResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                user.isEnabled(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}