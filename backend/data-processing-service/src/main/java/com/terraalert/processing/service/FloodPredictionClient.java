package com.terraalert.processing.service;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.terraalert.processing.dto.FloodPredictionRequest;
import com.terraalert.processing.model.ProcessedWeatherData;
import com.terraalert.processing.dto.FloodPredictionResponse;

@Component
public class FloodPredictionClient {

    private final RestClient restClient;

    public FloodPredictionClient() {
        this.restClient = RestClient
                .builder()
                .baseUrl("http://localhost:8084")
                .build();
    }

    public FloodPredictionResponse predictFlood(ProcessedWeatherData data) {

        FloodPredictionRequest request =
                new FloodPredictionRequest();

        request.setLocation(data.getLocation());
        request.setLatitude(data.getLatitude());
        request.setLongitude(data.getLongitude());

        request.setRainfall(data.getRainfall());
        request.setSoilMoisture(data.getSoilMoisture());
        request.setTemperature(data.getTemperature());
        request.setHumidity(data.getHumidity());
        request.setPressure(data.getPressure());
        request.setWindSpeed(data.getWindSpeed());
        request.setElevation(data.getElevation());

        // River-level data is not available yet.
        request.setRiverLevel(null);

        request.setObservedAt(data.getObservedAt());

        return restClient.post()
                .uri("/api/prediction/flood")
                .body(request)
                .retrieve()
                .body(FloodPredictionResponse.class);
    }
}