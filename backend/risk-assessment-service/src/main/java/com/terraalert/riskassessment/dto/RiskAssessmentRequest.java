package com.terraalert.riskassessment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class RiskAssessmentRequest {

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;

    @NotNull(message = "Flood probability is required")
    private Double floodProbability;

    @NotNull(message = "Landslide probability is required")
    private Double landslideProbability;

    public RiskAssessmentRequest() {
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

    public Double getLandslideProbability() {
        return landslideProbability;
    }

    public void setLandslideProbability(Double landslideProbability) {
        this.landslideProbability = landslideProbability;
    }
}