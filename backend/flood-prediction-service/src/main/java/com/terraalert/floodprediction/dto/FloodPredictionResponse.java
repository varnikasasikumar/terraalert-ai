package com.terraalert.floodprediction.dto;

import java.time.LocalDateTime;

public class FloodPredictionResponse {

    private String location;

    private double latitude;

    private double longitude;

    private double floodProbability;

    private String riskLevel;

    private LocalDateTime predictedAt;

    private String modelVersion;

    public FloodPredictionResponse() {
    }

    public FloodPredictionResponse(
            String location,
            double latitude,
            double longitude,
            double floodProbability,
            String riskLevel,
            LocalDateTime predictedAt,
            String modelVersion) {

        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.floodProbability = floodProbability;
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

    public double getFloodProbability() {
        return floodProbability;
    }

    public void setFloodProbability(double floodProbability) {
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