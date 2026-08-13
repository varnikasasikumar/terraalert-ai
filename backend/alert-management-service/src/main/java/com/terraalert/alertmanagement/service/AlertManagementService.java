package com.terraalert.alertmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.terraalert.alertmanagement.dto.AlertRequest;
import com.terraalert.alertmanagement.dto.AlertResponse;
import com.terraalert.alertmanagement.model.Alert;
import com.terraalert.alertmanagement.repository.AlertRepository;

@Service
public class AlertManagementService {

    private final AlertRepository alertRepository;

    public AlertManagementService(
            AlertRepository alertRepository) {

        this.alertRepository = alertRepository;
    }

    
    public AlertResponse createAlert(AlertRequest request) {

        Alert alert = new Alert();

        alert.setLocation(request.getLocation());
        alert.setLatitude(request.getLatitude());
        alert.setLongitude(request.getLongitude());
        alert.setAlertType(request.getAlertType());
        alert.setSeverity(request.getSeverity());
        alert.setMessage(request.getMessage());
        alert.setStatus("PENDING");
        alert.setCreatedAt(request.getCreatedAt());

        Alert savedAlert = alertRepository.save(alert);

        return convertToResponse(savedAlert);
    }

    
    public List<AlertResponse> getAllAlerts() {

        return alertRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    
    public AlertResponse getAlertById(String id) {

        return alertRepository.findById(id)
                .map(this::convertToResponse)
                .orElse(null);
    }

    
    public List<AlertResponse> getAlertsByStatus(
            String status) {

        return alertRepository.findByStatus(status)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    
    public List<AlertResponse> getAlertsBySeverity(
            String severity) {

        return alertRepository.findBySeverity(severity)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    
    public void deleteAlert(String id) {

        alertRepository.deleteById(id);
    }

    
    private AlertResponse convertToResponse(Alert alert) {

        return new AlertResponse(
                alert.getId(),
                alert.getLocation(),
                alert.getLatitude(),
                alert.getLongitude(),
                alert.getAlertType(),
                alert.getSeverity(),
                alert.getMessage(),
                alert.getStatus(),
                alert.getCreatedAt()
        );
    }
}