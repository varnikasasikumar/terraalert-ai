package com.terraalert.auth.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.terraalert.auth.model.Alert;
import com.terraalert.auth.repository.AlertRepository;

@Service
public class AlertService {

    private final AlertRepository alertRepository;

    public AlertService(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    // =========================================================
    // GET ALL ALERTS
    // =========================================================

    public List<Alert> getAllAlerts() {

        return alertRepository.findAll();
    }

    // =========================================================
    // GET ALERT BY ID
    // =========================================================

    public Alert getAlertById(String id) {

        return alertRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Alert not found"));
    }

    // =========================================================
    // CREATE ALERT
    // =========================================================

    public Alert createAlert(Alert alert) {

        /*
         * New alerts should NOT immediately become Active.
         *
         * They first go to Pending Approval.
         */

        alert.setStatus("Pending Approval");

        /*
         * The alert has not been officially issued yet.
         */

        alert.setIssuedAt(null);

        /*
         * Valid-until will be assigned when
         * the alert is approved and sent.
         */

        alert.setValidUntil(null);

        return alertRepository.save(alert);
    }

    // =========================================================
    // UPDATE ALERT
    // =========================================================

    public Alert updateAlert(
            String id,
            Alert updatedAlert) {

        Alert existingAlert = getAlertById(id);

        existingAlert.setType(updatedAlert.getType());
        existingAlert.setArea(updatedAlert.getArea());
        existingAlert.setSeverity(updatedAlert.getSeverity());
        existingAlert.setSource(updatedAlert.getSource());
        existingAlert.setAffectedPopulation(
                updatedAlert.getAffectedPopulation()
        );
        existingAlert.setRecommendedAction(
                updatedAlert.getRecommendedAction()
        );

        /*
         * We deliberately do NOT allow the frontend
         * to directly change:
         *
         * status
         * issuedAt
         * validUntil
         *
         * Those values are controlled by the backend.
         */

        return alertRepository.save(existingAlert);
    }

    // =========================================================
    // APPROVE & SEND ALERT
    // =========================================================

    public Alert approveAlert(String id) {

        Alert alert = getAlertById(id);

        /*
         * Only pending alerts should normally
         * be approved.
         */

        if ("Active".equals(alert.getStatus())) {

            throw new RuntimeException(
                    "Alert has already been approved"
            );
        }

        if ("Resolved".equals(alert.getStatus())) {

            throw new RuntimeException(
                    "Resolved alert cannot be approved"
            );
        }

        LocalDateTime now = LocalDateTime.now();

        /*
         * Alert becomes officially active.
         */

        alert.setStatus("Active");

        /*
         * Current date/time becomes issued time.
         */

        alert.setIssuedAt(now);

        /*
         * Alert remains valid until tomorrow.
         *
         * This implements the requirement we discussed:
         * when the official clicks Approve & Send,
         * the valid date should be after the current date.
         */

        alert.setValidUntil(
                now.plusDays(1)
                   .withHour(21)
                   .withMinute(0)
                   .withSecond(0)
                   .withNano(0)
        );

        return alertRepository.save(alert);
    }

    // =========================================================
    // RESOLVE ALERT
    // =========================================================

    public Alert resolveAlert(String id) {

        Alert alert = getAlertById(id);

        alert.setStatus("Resolved");

        return alertRepository.save(alert);
    }

    // =========================================================
    // DELETE ALERT
    // =========================================================

    public void deleteAlert(String id) {

        if (!alertRepository.existsById(id)) {

            throw new RuntimeException(
                    "Alert not found"
            );
        }

        alertRepository.deleteById(id);
    }
}