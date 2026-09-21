package com.terraalert.processing.dto;

public class RiskAssessmentRequest {

    private String location;

    private Double latitude;

    private Double longitude;

    private Double floodProbability;

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