package com.terraalert.processing.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.terraalert.processing.dto.EvacuationRequest;
import com.terraalert.processing.dto.RiskAssessmentResponse;
import com.terraalert.processing.model.ProcessedWeatherData;

@Component
public class EvacuationResourceClient {

    private final RestClient restClient;

    public EvacuationResourceClient(
            @Value("${evacuation-resource.service.url:http://localhost:8088}") String baseUrl) {
        this.restClient = RestClient
                .builder()
                .baseUrl(baseUrl)
                .build();
    }

    public String generateRecommendation(
            ProcessedWeatherData data,
            RiskAssessmentResponse riskResponse) {

        String riskLevel = riskResponse.getOverallRisk();

        if (riskLevel == null ||
                riskLevel.equalsIgnoreCase("UNKNOWN")) {

            return "No evacuation recommendation. Risk level is UNKNOWN.";
        }

        EvacuationRequest request =
                new EvacuationRequest();

        request.setLocation(data.getLocation());
        request.setLatitude(data.getLatitude());
        request.setLongitude(data.getLongitude());

        request.setRiskLevel(riskLevel);

        // Population data is not available yet.
        request.setAffectedPopulation(null);

        return restClient.post()
                .uri("/api/evacuation/recommend")
                .body(request)
                .retrieve()
                .body(String.class);
    }
}