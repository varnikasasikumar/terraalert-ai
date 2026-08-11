package com.terraalert.weather.dto;

import java.time.LocalDateTime;

public class WeatherDataResponse {

    private String id;
    private String location;

    private double latitude;
    private double longitude;
    private double altitude;

    private double temperature;
    private double humidity;
    private double rainfall;
    private double windSpeed;
    private double pressure;

    private LocalDateTime measuredAt;

    private String source;

    // Default constructor
    public WeatherDataResponse() {
    }

    // Parameterized constructor
    public WeatherDataResponse(
            String id,
            String location,
            double latitude,
            double longitude,
            double altitude,
            double temperature,
            double humidity,
            double rainfall,
            double windSpeed,
            double pressure,
            LocalDateTime measuredAt,
            String source) {

        this.id = id;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.temperature = temperature;
        this.humidity = humidity;
        this.rainfall = rainfall;
        this.windSpeed = windSpeed;
        this.pressure = pressure;
        this.measuredAt = measuredAt;
        this.source = source;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public double getAltitude() {
        return altitude;
    }

    public void setAltitude(double altitude) {
        this.altitude = altitude;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getHumidity() {
        return humidity;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    public double getRainfall() {
        return rainfall;
    }

    public void setRainfall(double rainfall) {
        this.rainfall = rainfall;
    }

    public double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(double windSpeed) {
        this.windSpeed = windSpeed;
    }

    public double getPressure() {
        return pressure;
    }

    public void setPressure(double pressure) {
        this.pressure = pressure;
    }

    public LocalDateTime getMeasuredAt() {
        return measuredAt;
    }

    public void setMeasuredAt(LocalDateTime measuredAt) {
        this.measuredAt = measuredAt;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}