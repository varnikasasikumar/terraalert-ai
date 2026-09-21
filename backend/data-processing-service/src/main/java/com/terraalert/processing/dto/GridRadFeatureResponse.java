package com.terraalert.processing.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GridRadFeatureResponse {

    @JsonProperty("reflectivityMean")
    private double reflectivityMean;

    @JsonProperty("reflectivityMax")
    private double reflectivityMax;

    @JsonProperty("reflectivityMin")
    private double reflectivityMin;

    @JsonProperty("reflectivityStd")
    private double reflectivityStd;

    @JsonProperty("reflectivityMedian")
    private double reflectivityMedian;

    @JsonProperty("reflectivityGe20Pct")
    private double reflectivityGe20Pct;

    @JsonProperty("reflectivityGe30Pct")
    private double reflectivityGe30Pct;

    @JsonProperty("reflectivityGe40Pct")
    private double reflectivityGe40Pct;

    @JsonProperty("radarObservationCount")
    private int radarObservationCount;

    // Getters and Setters

    public double getReflectivityMean() { return reflectivityMean; }
    public void setReflectivityMean(double reflectivityMean) { this.reflectivityMean = reflectivityMean; }

    public double getReflectivityMax() { return reflectivityMax; }
    public void setReflectivityMax(double reflectivityMax) { this.reflectivityMax = reflectivityMax; }

    public double getReflectivityMin() { return reflectivityMin; }
    public void setReflectivityMin(double reflectivityMin) { this.reflectivityMin = reflectivityMin; }

    public double getReflectivityStd() { return reflectivityStd; }
    public void setReflectivityStd(double reflectivityStd) { this.reflectivityStd = reflectivityStd; }

    public double getReflectivityMedian() { return reflectivityMedian; }
    public void setReflectivityMedian(double reflectivityMedian) { this.reflectivityMedian = reflectivityMedian; }

    public double getReflectivityGe20Pct() { return reflectivityGe20Pct; }
    public void setReflectivityGe20Pct(double reflectivityGe20Pct) { this.reflectivityGe20Pct = reflectivityGe20Pct; }

    public double getReflectivityGe30Pct() { return reflectivityGe30Pct; }
    public void setReflectivityGe30Pct(double reflectivityGe30Pct) { this.reflectivityGe30Pct = reflectivityGe30Pct; }

    public double getReflectivityGe40Pct() { return reflectivityGe40Pct; }
    public void setReflectivityGe40Pct(double reflectivityGe40Pct) { this.reflectivityGe40Pct = reflectivityGe40Pct; }

    public int getRadarObservationCount() { return radarObservationCount; }
    public void setRadarObservationCount(int radarObservationCount) { this.radarObservationCount = radarObservationCount; }
}
