package com.terraalert.auth.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.terraalert.auth.dto.UserManagementResponse;
import com.terraalert.auth.model.User;
import com.terraalert.auth.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // =========================================================
    // GET ALL USERS
    // ADMIN ONLY
    // =========================================================

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserManagementResponse>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    // =========================================================
    // GET USER BY ID
    // ADMIN ONLY
    // =========================================================

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserManagementResponse> getUserById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                userService.getUserById(id)
        );
    }

    // =========================================================
    // UPDATE USER
    // ADMIN ONLY
    // =========================================================

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserManagementResponse> updateUser(
            @PathVariable String id,
            @RequestBody User user) {

        return ResponseEntity.ok(
                userService.updateUser(id, user)
        );
    }

    // =========================================================
    // DISABLE USER
    // ADMIN ONLY
    // =========================================================

    @PatchMapping("/{id}/disable")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserManagementResponse> disableUser(
            @PathVariable String id) {

        return ResponseEntity.ok(
                userService.disableUser(id)
        );
    }

    // =========================================================
    // ENABLE USER
    // ADMIN ONLY
    // =========================================================

    @PatchMapping("/{id}/enable")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserManagementResponse> enableUser(
            @PathVariable String id) {

        return ResponseEntity.ok(
                userService.enableUser(id)
        );
    }

    // =========================================================
    // DELETE USER
    // ADMIN ONLY
    // =========================================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(
            @PathVariable String id) {

        userService.deleteUser(id);

        return ResponseEntity.noContent().build();
    }
}