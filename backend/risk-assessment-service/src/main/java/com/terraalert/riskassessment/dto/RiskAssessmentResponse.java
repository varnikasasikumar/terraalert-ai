package com.terraalert.riskassessment.dto;

import java.time.LocalDateTime;

public class RiskAssessmentResponse {

    private String location;

    private double latitude;

    private double longitude;

    private double floodProbability;

    private double landslideProbability;

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
            double floodProbability,
            double landslideProbability,
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

    public double getFloodProbability() {
        return floodProbability;
    }

    public void setFloodProbability(double floodProbability) {
        this.floodProbability = floodProbability;
    }

    public double getLandslideProbability() {
        return landslideProbability;
    }

    public void setLandslideProbability(double landslideProbability) {
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