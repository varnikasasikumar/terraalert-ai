package com.terraalert.ingestion.service;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.terraalert.ingestion.dto.WeatherProcessingRequest;
import com.terraalert.ingestion.model.WeatherObservation;

@Component
public class DataProcessingClient {

    private final RestClient restClient;

    public DataProcessingClient() {
        this.restClient = RestClient
                .builder()
                .baseUrl("http://127.0.0.1:8083")
                .build();
    }

    public String processWeatherData(
            WeatherObservation observation) {

        WeatherProcessingRequest request =
                new WeatherProcessingRequest();

        request.setLocation(
                observation.getLocation()
        );

        request.setLatitude(
                observation.getLatitude()
        );

        request.setLongitude(
                observation.getLongitude()
        );

        request.setTemperature(
                observation.getTemperature()
        );

        request.setHumidity(
                observation.getHumidity()
        );

        request.setRainfall(
                observation.getRainfall()
        );

        request.setWindSpeed(
                observation.getWindSpeed()
        );

        request.setPressure(
                observation.getPressure()
        );

        
        request.setSoilMoisture(null);

        request.setElevation(
                observation.getAltitude()
        );

        request.setObservedAt(
                observation.getObservedAt()
        );

        request.setSource(
                observation.getSource()
        );

        return restClient.post()
                .uri("/api/processing/weather")
                .body(request)
                .retrieve()
                .body(String.class);
    }
}