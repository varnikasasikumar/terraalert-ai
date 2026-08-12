package com.terraalert.processing.dto;

import java.time.LocalDateTime;

public class LandslidePredictionResponse {

    private String location;
    private Double latitude;
    private Double longitude;
    private Double landslideProbability;
    private String riskLevel;
    private LocalDateTime predictedAt;
    private String modelVersion;

    public LandslidePredictionResponse() {
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

    public Double getLandslideProbability() {
        return landslideProbability;
    }

    public void setLandslideProbability(Double landslideProbability) {
        this.landslideProbability = landslideProbability;
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