package com.terraalert.processing.service;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.terraalert.processing.dto.RiskAssessmentResponse;
import com.terraalert.processing.dto.RiskAssessmentRequest;
import com.terraalert.processing.model.ProcessedWeatherData;

@Component
public class RiskAssessmentClient {

    private final RestClient restClient;

    public RiskAssessmentClient() {
        this.restClient = RestClient
                .builder()
                .baseUrl("http://localhost:8086")
                .build();
    }

    public RiskAssessmentResponse assessRisk(
            ProcessedWeatherData data,
            Double floodProbability,
            Double landslideProbability) {

        RiskAssessmentRequest request =
                new RiskAssessmentRequest();

        request.setLocation(data.getLocation());
        request.setLatitude(data.getLatitude());
        request.setLongitude(data.getLongitude());

        request.setFloodProbability(floodProbability);
        request.setLandslideProbability(landslideProbability);

        return restClient.post()
                .uri("/api/risk-assessment")
                .body(request)
                .retrieve()
                .body(RiskAssessmentResponse .class);
    }
}