package com.terraalert.floodprediction.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FloodPredictionRequest {

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;

    // Weather features
    private Double rainfall;
    private Double soilMoisture;
    private Double temperature;
    private Double humidity;
    private Double pressure;
    private Double windSpeed;

    // Terrain / river information
    private Double elevation;
    private Double riverLevel;

    // Radar features required by the trained Flood Random Forest model
    private Double reflectivityMean;
    private Double reflectivityMax;
    private Double reflectivityMin;
    private Double reflectivityStd;
    private Double reflectivityMedian;

    private Double reflectivityGe20Pct;
    private Double reflectivityGe30Pct;
    private Double reflectivityGe40Pct;

    private Integer radarObservationCount;

    @NotNull(message = "Observed time is required")
    private LocalDateTime observedAt;

    public FloodPredictionRequest() {
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

    public Double getPressure() {
        return pressure;
    }

    public void setPressure(Double pressure) {
        this.pressure = pressure;
    }

    public Double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(Double windSpeed) {
        this.windSpeed = windSpeed;
    }

    public Double getElevation() {
        return elevation;
    }

    public void setElevation(Double elevation) {
        this.elevation = elevation;
    }

    public Double getRiverLevel() {
        return riverLevel;
    }

    public void setRiverLevel(Double riverLevel) {
        this.riverLevel = riverLevel;
    }

    public Double getReflectivityMean() {
        return reflectivityMean;
    }

    public void setReflectivityMean(Double reflectivityMean) {
        this.reflectivityMean = reflectivityMean;
    }

    public Double getReflectivityMax() {
        return reflectivityMax;
    }

    public void setReflectivityMax(Double reflectivityMax) {
        this.reflectivityMax = reflectivityMax;
    }

    public Double getReflectivityMin() {
        return reflectivityMin;
    }

    public void setReflectivityMin(Double reflectivityMin) {
        this.reflectivityMin = reflectivityMin;
    }

    public Double getReflectivityStd() {
        return reflectivityStd;
    }

    public void setReflectivityStd(Double reflectivityStd) {
        this.reflectivityStd = reflectivityStd;
    }

    public Double getReflectivityMedian() {
        return reflectivityMedian;
    }

    public void setReflectivityMedian(Double reflectivityMedian) {
        this.reflectivityMedian = reflectivityMedian;
    }

    public Double getReflectivityGe20Pct() {
        return reflectivityGe20Pct;
    }

    public void setReflectivityGe20Pct(Double reflectivityGe20Pct) {
        this.reflectivityGe20Pct = reflectivityGe20Pct;
    }

    public Double getReflectivityGe30Pct() {
        return reflectivityGe30Pct;
    }

    public void setReflectivityGe30Pct(Double reflectivityGe30Pct) {
        this.reflectivityGe30Pct = reflectivityGe30Pct;
    }

    public Double getReflectivityGe40Pct() {
        return reflectivityGe40Pct;
    }

    public void setReflectivityGe40Pct(Double reflectivityGe40Pct) {
        this.reflectivityGe40Pct = reflectivityGe40Pct;
    }

    public Integer getRadarObservationCount() {
        return radarObservationCount;
    }

    public void setRadarObservationCount(Integer radarObservationCount) {
        this.radarObservationCount = radarObservationCount;
    }

    public LocalDateTime getObservedAt() {
        return observedAt;
    }

    public void setObservedAt(LocalDateTime observedAt) {
        this.observedAt = observedAt;
    }
}