package com.terraalert.processing.dto;

import java.time.LocalDateTime;

public class RiskAssessmentResponse {

    private String location;
    private Double latitude;
    private Double longitude;

    private Double floodProbability;
    private Double landslideProbability;

    private String floodRisk;
    private String landslideRisk;
    private String overallRisk;

    private LocalDateTime assessedAt;

    public RiskAssessmentResponse() {
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