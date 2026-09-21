package com.terraalert.processing.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class DisasterDataRequest {

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;

    @NotBlank(message = "Disaster type is required")
    private String disasterType;

    @NotNull(message = "Weather data is required")
    @Valid
    private WeatherProcessingRequest weatherData;

    public DisasterDataRequest() {
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

    public String getDisasterType() {
        return disasterType;
    }

    public void setDisasterType(String disasterType) {
        this.disasterType = disasterType;
    }

    public WeatherProcessingRequest getWeatherData() {
        return weatherData;
    }

    public void setWeatherData(WeatherProcessingRequest weatherData) {
        this.weatherData = weatherData;
    }
}