package com.terraalert.processing.service;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.terraalert.processing.dto.LandslidePredictionRequest;
import com.terraalert.processing.model.ProcessedWeatherData;
import com.terraalert.processing.dto.LandslidePredictionResponse;

@Component
public class LandslidePredictionClient {

    private final RestClient restClient;

    public LandslidePredictionClient() {
        this.restClient = RestClient
                .builder()
                .baseUrl("http://localhost:8085")
                .build();
    }

    public LandslidePredictionResponse predictLandslide(
            ProcessedWeatherData data) {

        LandslidePredictionRequest request =
                new LandslidePredictionRequest();

        request.setLocation(data.getLocation());
        request.setLatitude(data.getLatitude());
        request.setLongitude(data.getLongitude());

        request.setRainfall(data.getRainfall());

        /*
         * Baseline ML features
         *
         * These values must come from the processed rainfall-history
         * pipeline. For the current integration test, we are using
         * the same real feature values that were used to test the
         * trained Seattle model.
         */

        request.setRainfall_1d(data.getRainfall1d());

        request.setRainfall_3d(data.getRainfall3d());

        request.setRainfall_7d(data.getRainfall7d());

        request.setRainfall_15d(data.getRainfall15d());

        request.setRainfall_32d(data.getRainfall32d());

        request.setTemperature_max(data.getTemperatureMax());

        request.setTemperature_min(data.getTemperatureMin());

        request.setSlope(data.getSlope());

        request.setAspect(data.getAspect());

        request.setTemperature(data.getTemperature());
        request.setHumidity(data.getHumidity());
        request.setWindSpeed(data.getWindSpeed());

        request.setObservedAt(data.getObservedAt());

        return restClient.post()
                .uri("/api/prediction/landslide")
                .body(request)
                .retrieve()
                .body(LandslidePredictionResponse.class);
    }
}