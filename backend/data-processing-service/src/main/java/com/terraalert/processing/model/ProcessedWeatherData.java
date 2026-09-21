package com.terraalert.processing.model;

import java.time.LocalDateTime;

public class ProcessedWeatherData {

    private String location;

    private double latitude;

    private double longitude;

    private Double temperature;

    private Double humidity;

    private Double rainfall;

    private Double windSpeed;

    private Double pressure;

    private Double soilMoisture;

    private Double elevation;
    
 // =========================================================
 // LANDSLIDE FEATURES
 // =========================================================

 private Double rainfall1d;

 private Double rainfall3d;

 private Double rainfall7d;

 private Double rainfall15d;

 private Double rainfall32d;

 private Double temperatureMax;

 private Double temperatureMin;

 private Double slope;

 private Double aspect;

    private LocalDateTime observedAt;
    private Double reflectivityMean;
    private Double reflectivityMax;
    private Double reflectivityMin;
    private Double reflectivityStd;
    private Double reflectivityMedian;

    private Double reflectivityGe20Pct;
    private Double reflectivityGe30Pct;
    private Double reflectivityGe40Pct;

    private Integer radarObservationCount;
    private String source;
    private String predictionTarget;
    
    public ProcessedWeatherData() {
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

    public Double getElevation() {
        return elevation;
    }

    public void setElevation(Double elevation) {
        this.elevation = elevation;
    }
    
    public Double getRainfall1d() {
        return rainfall1d;
    }

    public void setRainfall1d(Double rainfall1d) {
        this.rainfall1d = rainfall1d;
    }

    public Double getRainfall3d() {
        return rainfall3d;
    }

    public void setRainfall3d(Double rainfall3d) {
        this.rainfall3d = rainfall3d;
    }

    public Double getRainfall7d() {
        return rainfall7d;
    }

    public void setRainfall7d(Double rainfall7d) {
        this.rainfall7d = rainfall7d;
    }

    public Double getRainfall15d() {
        return rainfall15d;
    }

    public void setRainfall15d(Double rainfall15d) {
        this.rainfall15d = rainfall15d;
    }

    public Double getRainfall32d() {
        return rainfall32d;
    }

    public void setRainfall32d(Double rainfall32d) {
        this.rainfall32d = rainfall32d;
    }

    public Double getTemperatureMax() {
        return temperatureMax;
    }

    public void setTemperatureMax(Double temperatureMax) {
        this.temperatureMax = temperatureMax;
    }

    public Double getTemperatureMin() {
        return temperatureMin;
    }

    public void setTemperatureMin(Double temperatureMin) {
        this.temperatureMin = temperatureMin;
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

    public String getPredictionTarget() {
        return predictionTarget;
    }

    public void setPredictionTarget(String predictionTarget) {
        this.predictionTarget = predictionTarget;
    }
}