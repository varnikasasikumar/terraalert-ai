package com.terraalert.landslideprediction.dto;

import java.time.LocalDateTime;

public class LandslidePredictionResponse {

    private String location;

    private double latitude;

    private double longitude;

    private double landslideProbability;

    private String riskLevel;

    private LocalDateTime predictedAt;

    private String modelVersion;

    public LandslidePredictionResponse() {
    }

    public LandslidePredictionResponse(
            String location,
            double latitude,
            double longitude,
            double landslideProbability,
            String riskLevel,
            LocalDateTime predictedAt,
            String modelVersion) {

        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.landslideProbability = landslideProbability;
        this.riskLevel = riskLevel;
        this.predictedAt = predictedAt;
        this.modelVersion = modelVersion;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLandslideProbability() {
        return landslideProbability;
    }

    public void setLandslideProbability(double landslideProbability) {
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