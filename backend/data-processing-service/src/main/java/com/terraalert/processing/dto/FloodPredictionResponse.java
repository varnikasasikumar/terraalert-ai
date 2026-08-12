package com.terraalert.processing.dto;

import java.time.LocalDateTime;

public class FloodPredictionResponse {

    private String location;
    private Double latitude;
    private Double longitude;
    private Double floodProbability;
    private String riskLevel;
    private LocalDateTime predictedAt;
    private String modelVersion;

    public FloodPredictionResponse() {
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getFloodProbability() {
        return floodProbability;
    }

    public void setFloodProbability(Double floodProbability) {
        this.floodProbability = floodProbability;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public LocalDateTime getPredictedAt() {
        return predictedAt;
    }

    public void setPredictedAt(LocalDateTime predictedAt) {
        this.predictedAt = predictedAt;
    }

    public String getModelVersion() {
        return modelVersion;
    }

    public void setModelVersion(String modelVersion) {
        this.modelVersion = modelVersion;
    }
}