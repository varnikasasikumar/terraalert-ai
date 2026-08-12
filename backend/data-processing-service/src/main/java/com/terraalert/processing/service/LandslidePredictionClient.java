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

    public LandslidePredictionResponse predictLandslide(ProcessedWeatherData data) {

        LandslidePredictionRequest request =
                new LandslidePredictionRequest();

        request.setLocation(data.getLocation());
        request.setLatitude(data.getLatitude());
        request.setLongitude(data.getLongitude());

        request.setRainfall(data.getRainfall());
        request.setSoilMoisture(data.getSoilMoisture());
        request.setElevation(data.getElevation());

        // Terrain data is not available in ProcessedWeatherData yet.
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