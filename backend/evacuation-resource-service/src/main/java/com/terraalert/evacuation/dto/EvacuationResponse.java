package com.terraalert.evacuation.dto;

import java.time.LocalDateTime;

public class EvacuationResponse {

    private String location;

    private double latitude;

    private double longitude;

    private String riskLevel;

    private String recommendation;

    private String nearestShelter;

    private Integer availableShelterCapacity;

    private LocalDateTime generatedAt;

    public EvacuationResponse() {
    }

    public EvacuationResponse(
            String location,
            double latitude,
            double longitude,
            String riskLevel,
            String recommendation,
            String nearestShelter,
            Integer availableShelterCapacity,
            LocalDateTime generatedAt) {

        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.riskLevel = riskLevel;
        this.recommendation = recommendation;
        this.nearestShelter = nearestShelter;
        this.availableShelterCapacity = availableShelterCapacity;
        this.generatedAt = generatedAt;
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

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    public String getNearestShelter() {
        return nearestShelter;
    }

    public void setNearestShelter(String nearestShelter) {
        this.nearestShelter = nearestShelter;
    }

    public Integer getAvailableShelterCapacity() {
        return availableShelterCapacity;
    }

    public void setAvailableShelterCapacity(Integer availableShelterCapacity) {
        this.availableShelterCapacity = availableShelterCapacity;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }
}