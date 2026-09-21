package com.terraalert.landslideprediction.dto;

public class LandslideMLResponse {

    private int prediction;

    private double landslideProbability;

    private String risk;


    public LandslideMLResponse() {
    }


    public int getPrediction() {
        return prediction;
    }

    public void setPrediction(int prediction) {
        this.prediction = prediction;
    }


    public double getLandslideProbability() {
        return landslideProbability;
    }

    public void setLandslideProbability(
            double landslideProbability) {

        this.landslideProbability =
                landslideProbability;
    }


    public String getRisk() {
        return risk;
    }

    public void setRisk(String risk) {
        this.risk = risk;
    }
}