package com.terraalert.landslideprediction.dto;

public class LandslideMLRequest {

    private double rainfall_1d;
    private double rainfall_3d;
    private double rainfall_7d;
    private double rainfall_15d;
    private double rainfall_32d;

    private double temperature_max;
    private double temperature_min;

    public LandslideMLRequest() {
    }

    public double getRainfall_1d() {
        return rainfall_1d;
    }

    public void setRainfall_1d(double rainfall_1d) {
        this.rainfall_1d = rainfall_1d;
    }

    public double getRainfall_3d() {
        return rainfall_3d;
    }

    public void setRainfall_3d(double rainfall_3d) {
        this.rainfall_3d = rainfall_3d;
    }

    public double getRainfall_7d() {
        return rainfall_7d;
    }

    public void setRainfall_7d(double rainfall_7d) {
        this.rainfall_7d = rainfall_7d;
    }

    public double getRainfall_15d() {
        return rainfall_15d;
    }

    public void setRainfall_15d(double rainfall_15d) {
        this.rainfall_15d = rainfall_15d;
    }

    public double getRainfall_32d() {
        return rainfall_32d;
    }

    public void setRainfall_32d(double rainfall_32d) {
        this.rainfall_32d = rainfall_32d;
    }

    public double getTemperature_max() {
        return temperature_max;
    }

    public void setTemperature_max(double temperature_max) {
        this.temperature_max = temperature_max;
    }

    public double getTemperature_min() {
        return temperature_min;
    }

    public void setTemperature_min(double temperature_min) {
        this.temperature_min = temperature_min;
    }
}