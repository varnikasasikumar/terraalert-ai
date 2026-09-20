package com.terraalert.processing.dto;

import java.time.LocalDateTime;

public class DisasterEventResponse {

    private String location;

    private double latitude;

    private double longitude;

    private String disasterType;

    private Double probability;

    private String riskLevel;

    private String overallRisk;

    private String status;

    private LocalDateTime detectedAt;


    // =========================================================
    // ENVIRONMENTAL EVIDENCE
    // =========================================================

    private double temperature;

    private double humidity;

    private double rainfall;

    private double windSpeed;

    private double pressure;

    private double soilMoisture;

    private double elevation;


    // =========================================================
    // LANDSLIDE EVIDENCE
    // =========================================================

    private double rainfall1d;

    private double rainfall3d;

    private double rainfall7d;

    private double rainfall15d;

    private double rainfall32d;

    private double temperatureMax;

    private double temperatureMin;

    private Double slope;

    private Double aspect;


    // =========================================================
    // RADAR EVIDENCE
    // =========================================================

    private double reflectivityMean;

    private double reflectivityMax;

    private double reflectivityMin;

    private double reflectivityStd;

    private double reflectivityMedian;

    private double reflectivityGe20Pct;

    private double reflectivityGe30Pct;

    private double reflectivityGe40Pct;

    private int radarObservationCount;


    // =========================================================
    // OBSERVATION INFORMATION
    // =========================================================

    private String observedAt;

    private String source;


    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public DisasterEventResponse(
            String location,
            double latitude,
            double longitude,
            String disasterType,
            Double probability,
            String riskLevel,
            String overallRisk,
            String status,
            LocalDateTime detectedAt,

            // Environmental evidence
            double temperature,
            double humidity,
            double rainfall,
            double windSpeed,
            double pressure,
            double soilMoisture,
            double elevation,

            // Landslide evidence
            double rainfall1d,
            double rainfall3d,
            double rainfall7d,
            double rainfall15d,
            double rainfall32d,

            double temperatureMax,
            double temperatureMin,

            Double slope,
            Double aspect,

            // Radar evidence
            double reflectivityMean,
            double reflectivityMax,
            double reflectivityMin,
            double reflectivityStd,
            double reflectivityMedian,

            double reflectivityGe20Pct,
            double reflectivityGe30Pct,
            double reflectivityGe40Pct,

            int radarObservationCount,

            // Observation information
            String observedAt,
            String source
    ) {

        this.location = location;

        this.latitude = latitude;

        this.longitude = longitude;

        this.disasterType = disasterType;

        this.probability = probability;

        this.riskLevel = riskLevel;
        
        this.overallRisk = overallRisk;

        this.status = status;

        this.detectedAt = detectedAt;


        // =====================================================
        // ENVIRONMENTAL EVIDENCE
        // =====================================================

        this.temperature = temperature;

        this.humidity = humidity;

        this.rainfall = rainfall;

        this.windSpeed = windSpeed;

        this.pressure = pressure;

        this.soilMoisture = soilMoisture;

        this.elevation = elevation;


        // =====================================================
        // LANDSLIDE EVIDENCE
        // =====================================================

        this.rainfall1d = rainfall1d;

        this.rainfall3d = rainfall3d;

        this.rainfall7d = rainfall7d;

        this.rainfall15d = rainfall15d;

        this.rainfall32d = rainfall32d;

        this.temperatureMax = temperatureMax;

        this.temperatureMin = temperatureMin;

        this.slope = slope;

        this.aspect = aspect;


        // =====================================================
        // RADAR EVIDENCE
        // =====================================================

        this.reflectivityMean = reflectivityMean;

        this.reflectivityMax = reflectivityMax;

        this.reflectivityMin = reflectivityMin;

        this.reflectivityStd = reflectivityStd;

        this.reflectivityMedian = reflectivityMedian;

        this.reflectivityGe20Pct = reflectivityGe20Pct;

        this.reflectivityGe30Pct = reflectivityGe30Pct;

        this.reflectivityGe40Pct = reflectivityGe40Pct;

        this.radarObservationCount = radarObservationCount;


        // =====================================================
        // OBSERVATION INFORMATION
        // =====================================================

        this.observedAt = observedAt;

        this.source = source;
    }


    // =========================================================
    // GETTERS
    // =========================================================

    public String getLocation() {
        return location;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public String getDisasterType() {
        return disasterType;
    }

    public Double getProbability() {
        return probability;
    }

    public void setProbability(Double probability) {
        this.probability = probability;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public String getOverallRisk() {
        return overallRisk;
    }
    
    public void setOverallRisk(String overallRisk) {
        this.overallRisk = overallRisk;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getDetectedAt() {
        return detectedAt;
    }


    // =========================================================
    // ENVIRONMENTAL GETTERS
    // =========================================================

    public double getTemperature() {
        return temperature;
    }

    public double getHumidity() {
        return humidity;
    }

    public double getRainfall() {
        return rainfall;
    }

    public double getWindSpeed() {
        return windSpeed;
    }

    public double getPressure() {
        return pressure;
    }

    public double getSoilMoisture() {
        return soilMoisture;
    }

    public double getElevation() {
        return elevation;
    }


    // =========================================================
    // LANDSLIDE GETTERS
    // =========================================================

    public double getRainfall1d() {
        return rainfall1d;
    }

    public double getRainfall3d() {
        return rainfall3d;
    }

    public double getRainfall7d() {
        return rainfall7d;
    }

    public double getRainfall15d() {
        return rainfall15d;
    }

    public double getRainfall32d() {
        return rainfall32d;
    }

    public double getTemperatureMax() {
        return temperatureMax;
    }

    public double getTemperatureMin() {
        return temperatureMin;
    }

    public Double getSlope() {
        return slope;
    }

    public Double getAspect() {
        return aspect;
    }


    // =========================================================
    // RADAR GETTERS
    // =========================================================

    public double getReflectivityMean() {
        return reflectivityMean;
    }

    public double getReflectivityMax() {
        return reflectivityMax;
    }

    public double getReflectivityMin() {
        return reflectivityMin;
    }

    public double getReflectivityStd() {
        return reflectivityStd;
    }

    public double getReflectivityMedian() {
        return reflectivityMedian;
    }

    public double getReflectivityGe20Pct() {
        return reflectivityGe20Pct;
    }

    public double getReflectivityGe30Pct() {
        return reflectivityGe30Pct;
    }

    public double getReflectivityGe40Pct() {
        return reflectivityGe40Pct;
    }

    public int getRadarObservationCount() {
        return radarObservationCount;
    }


    // =========================================================
    // OBSERVATION GETTERS
    // =========================================================

    public String getObservedAt() {
        return observedAt;
    }

    public String getSource() {
        return source;
    }
}