package com.terraalert.auth.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.terraalert.auth.model.Alert;
import com.terraalert.auth.service.AlertService;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping
    @PreAuthorize("""
            hasAnyRole(
                'ADMIN',
                'DISASTER_MANAGER',
                'FIELD_OFFICER',
                'ANALYST'
            )
            """)
    public ResponseEntity<List<Alert>> getAllAlerts() {

        return ResponseEntity.ok(
                alertService.getAllAlerts()
        );
    }


    @GetMapping("/{id}")
    @PreAuthorize("""
            hasAnyRole(
                'ADMIN',
                'DISASTER_MANAGER',
                'FIELD_OFFICER',
                'ANALYST'
            )
            """)
    public ResponseEntity<Alert> getAlertById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                alertService.getAlertById(id)
        );
    }

    @PostMapping
    @PreAuthorize("""
            hasAnyRole(
                'ADMIN',
                'DISASTER_MANAGER',
                'FIELD_OFFICER'
            )
            """)
    public ResponseEntity<Alert> createAlert(
            @RequestBody Alert alert) {

        Alert savedAlert =
                alertService.createAlert(alert);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedAlert);
    }

    @PutMapping("/{id}")
    @PreAuthorize("""
            hasAnyRole(
                'ADMIN',
                'DISASTER_MANAGER',
                'FIELD_OFFICER'
            )
            """)
    public ResponseEntity<Alert> updateAlert(
            @PathVariable String id,
            @RequestBody Alert alert) {

        return ResponseEntity.ok(
                alertService.updateAlert(id, alert)
        );
    }

    @PatchMapping("/{id}/approve")
    @PreAuthorize("""
            hasAnyRole(
                'ADMIN',
                'DISASTER_MANAGER'
            )
            """)
    public ResponseEntity<Alert> approveAlert(
            @PathVariable String id) {

        return ResponseEntity.ok(
                alertService.approveAlert(id)
        );
    }

    // =========================================================
    // RESOLVE ALERT
    // =========================================================

    @PatchMapping("/{id}/resolve")
    @PreAuthorize("""
            hasAnyRole(
                'ADMIN',
                'DISASTER_MANAGER',
                'FIELD_OFFICER'
            )
            """)
    public ResponseEntity<Alert> resolveAlert(
            @PathVariable String id) {

        return ResponseEntity.ok(
                alertService.resolveAlert(id)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("""
            hasAnyRole(
                'ADMIN',
                'DISASTER_MANAGER'
            )
            """)
    public ResponseEntity<Void> deleteAlert(
            @PathVariable String id) {

        alertService.deleteAlert(id);

        return ResponseEntity.noContent().build();
    }
}