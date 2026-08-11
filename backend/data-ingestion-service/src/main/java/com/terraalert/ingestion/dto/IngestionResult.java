package com.terraalert.ingestion.dto;

import com.terraalert.ingestion.model.WeatherObservation;

public class IngestionResult {

    private WeatherObservation observation;
    private boolean created;

    public IngestionResult() {
    }

    public IngestionResult(
            WeatherObservation observation,
            boolean created) {

        this.observation = observation;
        this.created = created;
    }

    public WeatherObservation getObservation() {
        return observation;
    }

    public void setObservation(WeatherObservation observation) {
        this.observation = observation;
    }

    public boolean isCreated() {
        return created;
    }

    public void setCreated(boolean created) {
        this.created = created;
    }
}