package com.terraalert.ingestion.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "weather_observations")
public class WeatherObservation {

    @Id
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

    private Double soilMoisture;

    private java.util.List<Double> past32DaysRainfall;

    private java.util.List<String> dailyDates;

    private java.util.List<Double> dailyTemperatureMax;

    private java.util.List<Double> dailyTemperatureMin;

    private LocalDateTime observedAt;

    private String source;

    private String predictionTarget;

    public WeatherObservation() {
    }

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

    public Double getSoilMoisture() {
        return soilMoisture;
    }

    public void setSoilMoisture(Double soilMoisture) {
        this.soilMoisture = soilMoisture;
    }

    public java.util.List<Double> getPast32DaysRainfall() {
        return past32DaysRainfall;
    }

    public void setPast32DaysRainfall(java.util.List<Double> past32DaysRainfall) {
        this.past32DaysRainfall = past32DaysRainfall;
    }

    public java.util.List<String> getDailyDates() {
        return dailyDates;
    }

    public void setDailyDates(java.util.List<String> dailyDates) {
        this.dailyDates = dailyDates;
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

    public String getPredictionTarget() {
        return predictionTarget;
    }

    public void setPredictionTarget(String predictionTarget) {
        this.predictionTarget = predictionTarget;
    }
}