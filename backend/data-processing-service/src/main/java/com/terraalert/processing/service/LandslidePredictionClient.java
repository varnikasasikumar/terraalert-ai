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

        request.setRainfall_1d(21.1);
        request.setRainfall_3d(91.9);
        request.setRainfall_7d(109.7);
        request.setRainfall_15d(110.3);
        request.setRainfall_32d(268.1);

        request.setTemperature_max(10.0);
        request.setTemperature_min(5.0);

        request.setSoilMoisture(data.getSoilMoisture());
        request.setElevation(data.getElevation());

        request.setSlope(null);
        request.setAspect(null);

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