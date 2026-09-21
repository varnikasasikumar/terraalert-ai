package com.terraalert.alertmanagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.terraalert.alertmanagement.dto.AlertRequest;
import com.terraalert.alertmanagement.dto.AlertResponse;
import com.terraalert.alertmanagement.service.AlertManagementService;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final AlertManagementService alertManagementService;

    public AlertController(
            AlertManagementService alertManagementService) {

        this.alertManagementService = alertManagementService;
    }

    // CREATE ALERT
    @PostMapping
    public ResponseEntity<AlertResponse> createAlert(
            @Valid @RequestBody AlertRequest request) {

        AlertResponse response =
                alertManagementService.createAlert(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // GET ALL ALERTS
    @GetMapping
    public ResponseEntity<List<AlertResponse>> getAllAlerts() {

        return ResponseEntity.ok(
                alertManagementService.getAllAlerts()
        );
    }

    // GET ALERT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<AlertResponse> getAlertById(
            @PathVariable String id) {

        AlertResponse response =
                alertManagementService.getAlertById(id);

        if (response == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(response);
    }

    // GET ALERTS BY STATUS
    @GetMapping("/status/{status}")
    public ResponseEntity<List<AlertResponse>> getAlertsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                alertManagementService
                        .getAlertsByStatus(status)
        );
    }

    // GET ALERTS BY SEVERITY
    @GetMapping("/severity/{severity}")
    public ResponseEntity<List<AlertResponse>> getAlertsBySeverity(
            @PathVariable String severity) {

        return ResponseEntity.ok(
                alertManagementService
                        .getAlertsBySeverity(severity)
        );
    }

    // DELETE ALERT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlert(
            @PathVariable String id) {

        alertManagementService.deleteAlert(id);

        return ResponseEntity.noContent().build();
    }
}