package com.terraalert.riskassessment.dto;

import java.time.LocalDateTime;

public class RiskAssessmentResponse {

    private String location;

    private double latitude;

    private double longitude;

    private Double floodProbability;

    private Double landslideProbability;

    private String floodRisk;

    private String landslideRisk;

    private String overallRisk;

    private LocalDateTime assessedAt;

    public RiskAssessmentResponse() {
    }

    public RiskAssessmentResponse(
            String location,
            double latitude,
            double longitude,
            Double floodProbability,
            Double landslideProbability,
            String floodRisk,
            String landslideRisk,
            String overallRisk,
            LocalDateTime assessedAt) {

        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.floodProbability = floodProbability;
        this.landslideProbability = landslideProbability;
        this.floodRisk = floodRisk;
        this.landslideRisk = landslideRisk;
        this.overallRisk = overallRisk;
        this.assessedAt = assessedAt;
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

    public String getFloodRisk() {
        return floodRisk;
    }

    public void setFloodRisk(String floodRisk) {
        this.floodRisk = floodRisk;
    }

    public String getLandslideRisk() {
        return landslideRisk;
    }

    public void setLandslideRisk(String landslideRisk) {
        this.landslideRisk = landslideRisk;
    }

    public String getOverallRisk() {
        return overallRisk;
    }

    public void setOverallRisk(String overallRisk) {
        this.overallRisk = overallRisk;
    }

    public LocalDateTime getAssessedAt() {
        return assessedAt;
    }

    public void setAssessedAt(LocalDateTime assessedAt) {
        this.assessedAt = assessedAt;
    }
}