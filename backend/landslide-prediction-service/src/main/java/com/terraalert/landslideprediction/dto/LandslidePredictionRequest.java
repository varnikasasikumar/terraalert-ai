package com.terraalert.landslideprediction.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class LandslidePredictionRequest {

    private String location = "Selected Location";

    private Double latitude = 0.0;

    private Double longitude = 0.0;

    private Double rainfall;
    
    private Double rainfall_1d;

    private Double rainfall_3d;

    private Double rainfall_7d;

    private Double rainfall_15d;

    private Double rainfall_32d;

    private Double temperature_max;

    private Double temperature_min;
    
    private Double soilMoisture;

    private Double elevation;

    private Double slope;

    private Double aspect;

    private Double temperature;

    private Double humidity;

    private Double windSpeed;

    private LocalDateTime observedAt = LocalDateTime.now();

    public LandslidePredictionRequest() {
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

    public Double getRainfall() {
        return rainfall;
    }

    public void setRainfall(Double rainfall) {
        this.rainfall = rainfall;
    }

    public Double getSoilMoisture() {
        return soilMoisture;
    }

    public void setSoilMoisture(Double soilMoisture) {
        this.soilMoisture = soilMoisture;
    }

    public Double getElevation() {
        return elevation;
    }

    public void setElevation(Double elevation) {
        this.elevation = elevation;
    }

    public Double getSlope() {
        return slope;
    }

    public void setSlope(Double slope) {
        this.slope = slope;
    }

    public Double getAspect() {
        return aspect;
    }

    public void setAspect(Double aspect) {
        this.aspect = aspect;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getHumidity() {
        return humidity;
    }

    public void setHumidity(Double humidity) {
        this.humidity = humidity;
    }

    public Double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(Double windSpeed) {
        this.windSpeed = windSpeed;
    }

    public LocalDateTime getObservedAt() {
        return observedAt;
    }

    public void setObservedAt(LocalDateTime observedAt) {
        this.observedAt = observedAt;
    }
    
    public Double getRainfall_1d() {
        return rainfall_1d;
    }

    public void setRainfall_1d(Double rainfall_1d) {
        this.rainfall_1d = rainfall_1d;
    }

    public Double getRainfall_3d() {
        return rainfall_3d;
    }

    public void setRainfall_3d(Double rainfall_3d) {
        this.rainfall_3d = rainfall_3d;
    }

    public Double getRainfall_7d() {
        return rainfall_7d;
    }

    public void setRainfall_7d(Double rainfall_7d) {
        this.rainfall_7d = rainfall_7d;
    }

    public Double getRainfall_15d() {
        return rainfall_15d;
    }

    public void setRainfall_15d(Double rainfall_15d) {
        this.rainfall_15d = rainfall_15d;
    }

    public Double getRainfall_32d() {
        return rainfall_32d;
    }

    public void setRainfall_32d(Double rainfall_32d) {
        this.rainfall_32d = rainfall_32d;
    }

    public Double getTemperature_max() {
        return temperature_max;
    }

    public void setTemperature_max(Double temperature_max) {
        this.temperature_max = temperature_max;
    }

    public Double getTemperature_min() {
        return temperature_min;
    }

    public void setTemperature_min(Double temperature_min) {
        this.temperature_min = temperature_min;
    }
    
}