package com.terraalert.processing.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.terraalert.processing.dto.GridRadFeatureResponse;
import com.terraalert.processing.dto.GridRadRequest;

@Service
public class GridRadClient {

    private final RestTemplate restTemplate;

    @Value("${gridrad.api.base-url:http://localhost:5003}")
    private String baseUrl;

    public GridRadClient() {
        this.restTemplate = new RestTemplate();
    }

    public GridRadFeatureResponse extractRadarFeatures(double latitude, double longitude, String timestamp) {
        String url = baseUrl + "/extract_radar";
        GridRadRequest request = new GridRadRequest(latitude, longitude, timestamp);
        ResponseEntity<GridRadFeatureResponse> response = restTemplate.postForEntity(url, request, GridRadFeatureResponse.class);
        return response.getBody();
    }
}
