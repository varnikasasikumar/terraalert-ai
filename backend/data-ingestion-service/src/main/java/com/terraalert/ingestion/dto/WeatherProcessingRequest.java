package com.terraalert.ingestion.dto;

import java.time.LocalDateTime;

public class WeatherProcessingRequest {

    private String location;

    private Double latitude;

    private Double longitude;

    private Double temperature;

    private Double humidity;

    private Double rainfall;

    private Double windSpeed;

    private Double pressure;

    private Double soilMoisture;

    private java.util.List<String> dailyDates;

    private java.util.List<Double> past32DaysRainfall;

    private java.util.List<Double> dailyTemperatureMax;

    private java.util.List<Double> dailyTemperatureMin;

    private Double elevation;

    private LocalDateTime observedAt;

    private String source;

    private String predictionTarget;

    public WeatherProcessingRequest() {
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

    public Double getRainfall() {
        return rainfall;
    }

    public void setRainfall(Double rainfall) {
        this.rainfall = rainfall;
    }

    public Double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(Double windSpeed) {
        this.windSpeed = windSpeed;
    }

    public Double getPressure() {
        return pressure;
    }

    public void setPressure(Double pressure) {
        this.pressure = pressure;
    }

    public Double getSoilMoisture() {
        return soilMoisture;
    }

    public void setSoilMoisture(Double soilMoisture) {
        this.soilMoisture = soilMoisture;
    }

    public java.util.List<String> getDailyDates() {
        return dailyDates;
    }

    public void setDailyDates(java.util.List<String> dailyDates) {
        this.dailyDates = dailyDates;
    }

    public java.util.List<Double> getPast32DaysRainfall() {
        return past32DaysRainfall;
    }

    public void setPast32DaysRainfall(java.util.List<Double> past32DaysRainfall) {
        this.past32DaysRainfall = past32DaysRainfall;
    }

    public java.util.List<Double> getDailyTemperatureMax() {
        return dailyTemperatureMax;
    }

    public void setDailyTemperatureMax(java.util.List<Double> dailyTemperatureMax) {
        this.dailyTemperatureMax = dailyTemperatureMax;
    }

    public java.util.List<Double> getDailyTemperatureMin() {
        return dailyTemperatureMin;
    }

    public void setDailyTemperatureMin(java.util.List<Double> dailyTemperatureMin) {
        this.dailyTemperatureMin = dailyTemperatureMin;
    }

    public Double getElevation() {
        return elevation;
    }

    public void setElevation(Double elevation) {
        this.elevation = elevation;
    }

    public LocalDateTime getObservedAt() {
        return observedAt;
    }

    public void setObservedAt(LocalDateTime observedAt) {
        this.observedAt = observedAt;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getPredictionTarget() {
        return predictionTarget;
    }

    public void setPredictionTarget(String predictionTarget) {
        this.predictionTarget = predictionTarget;
    }
}