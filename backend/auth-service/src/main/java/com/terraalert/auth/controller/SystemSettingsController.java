package com.terraalert.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.terraalert.auth.model.SystemSettings;
import com.terraalert.auth.service.SystemSettingsService;

@RestController
@RequestMapping("/api/settings")
public class SystemSettingsController {

    private final SystemSettingsService systemSettingsService;

    public SystemSettingsController(SystemSettingsService systemSettingsService) {
        this.systemSettingsService = systemSettingsService;
    }

    // =========================================================
    // GET SYSTEM SETTINGS (ADMIN ONLY)
    // =========================================================

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SystemSettings> getSettings() {
        return ResponseEntity.ok(systemSettingsService.getSettings());
    }

    // =========================================================
    // UPDATE SYSTEM SETTINGS (ADMIN ONLY)
    // =========================================================

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SystemSettings> updateSettings(
            @RequestBody SystemSettings settings) {
        return ResponseEntity.ok(systemSettingsService.updateSettings(settings));
    }
}
