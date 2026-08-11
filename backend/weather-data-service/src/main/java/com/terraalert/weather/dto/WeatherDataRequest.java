package com.terraalert.weather.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;

public class WeatherDataRequest {

    @NotBlank(message = "Location is required")
    private String location;

    @DecimalMin(value = "-90.0",
            message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0",
            message = "Latitude must be between -90 and 90")
    private double latitude;

    @DecimalMin(value = "-180.0",
            message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0",
            message = "Longitude must be between -180 and 180")
    private double longitude;

    @DecimalMin(value = "0.0",
            message = "Altitude cannot be negative")
    private double altitude;

    @DecimalMin(value = "-100.0",
            message = "Invalid temperature")
    @DecimalMax(value = "70.0",
            message = "Invalid temperature")
    private double temperature;

    @DecimalMin(value = "0.0",
            message = "Humidity cannot be below 0")
    @DecimalMax(value = "100.0",
            message = "Humidity cannot exceed 100")
    private double humidity;

    @DecimalMin(value = "0.0",
            message = "Rainfall cannot be negative")
    private double rainfall;

    @DecimalMin(value = "0.0",
            message = "Wind speed cannot be negative")
    private double windSpeed;

    @DecimalMin(value = "0.0",
            message = "Pressure cannot be negative")
    private double pressure;

    private LocalDateTime measuredAt;

    private String source;

    // Default constructor
    public WeatherDataRequest() {
    }

    // Getters and Setters

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