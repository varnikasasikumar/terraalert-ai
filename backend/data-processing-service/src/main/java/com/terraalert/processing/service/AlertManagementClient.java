package com.terraalert.processing.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.terraalert.processing.dto.AlertRequest;
import com.terraalert.processing.dto.RiskAssessmentResponse;
import com.terraalert.processing.model.ProcessedWeatherData;

@Component
public class AlertManagementClient {

    private final RestClient restClient;

    public AlertManagementClient() {
        this.restClient = RestClient
                .builder()
                .baseUrl("http://localhost:8087")
                .build();
    }

    public String createAlert(
            ProcessedWeatherData data,
            RiskAssessmentResponse riskResponse) {

        String overallRisk = riskResponse.getOverallRisk();

        
        if (overallRisk == null ||
                overallRisk.equalsIgnoreCase("UNKNOWN")) {

            return "No alert created. Risk level is UNKNOWN.";
        }

        AlertRequest request = new AlertRequest();

        request.setLocation(data.getLocation());
        request.setLatitude(data.getLatitude());
        request.setLongitude(data.getLongitude());

        request.setSeverity(overallRisk);

        if (overallRisk.equalsIgnoreCase("HIGH")) {
            request.setAlertType("Disaster Warning");
            request.setMessage(
                    "High disaster risk detected in "
                    + data.getLocation()
                    + ". Immediate attention required."
            );

        } else if (overallRisk.equalsIgnoreCase("MEDIUM")) {
            request.setAlertType("Disaster Alert");
            request.setMessage(
                    "Moderate disaster risk detected in "
                    + data.getLocation()
                    + ". Monitor the situation."
            );

        } else {
            request.setAlertType("Disaster Advisory");
            request.setMessage(
                    "Low disaster risk detected in "
                    + data.getLocation()
                    + ". Continue monitoring."
            );
        }

        request.setCreatedAt(LocalDateTime.now());

        return restClient.post()
                .uri("/api/alerts")
                .body(request)
                .retrieve()
                .body(String.class);
    }
}