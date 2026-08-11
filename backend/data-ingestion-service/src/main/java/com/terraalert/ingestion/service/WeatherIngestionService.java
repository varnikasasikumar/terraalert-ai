package com.terraalert.ingestion.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import com.terraalert.ingestion.dto.IngestionResult;
import com.terraalert.ingestion.dto.OpenMeteoResponse;
import com.terraalert.ingestion.model.WeatherObservation;
import com.terraalert.ingestion.repository.WeatherObservationRepository;

@Service
public class WeatherIngestionService {

    private final WeatherObservationRepository repository;
    private final WeatherApiClient weatherApiClient;

    public WeatherIngestionService(
            WeatherObservationRepository repository,
            WeatherApiClient weatherApiClient) {

        this.repository = repository;
        this.weatherApiClient = weatherApiClient;
    }

    public IngestionResult saveWeatherObservation(
            WeatherObservation observation) {

        if (observation.getObservedAt() == null) {
            observation.setObservedAt(LocalDateTime.now());
        }

        return repository
                .findByLocationAndObservedAtAndSource(
                        observation.getLocation(),
                        observation.getObservedAt(),
                        observation.getSource()
                )
                .map(existingObservation ->
                        new IngestionResult(
                                existingObservation,
                                false
                        )
                )
                .orElseGet(() ->
                        new IngestionResult(
                                repository.save(observation),
                                true
                        )
                );
    }

    // Get all weather observations
    public List<WeatherObservation> getAllWeatherObservations() {

        return repository.findAll();
    }

    // Get weather observation by ID
    public WeatherObservation getWeatherObservationById(
            String id) {

        return repository.findById(id)
                .orElse(null);
    }

    // Delete weather observation
    public void deleteWeatherObservation(String id) {

        repository.deleteById(id);
    }

    // Ingest current weather from Open-Meteo
    public IngestionResult ingestCurrentWeather(
            double latitude,
            double longitude,
            String location) {

        OpenMeteoResponse response =
                weatherApiClient.getCurrentWeather(
                        latitude,
                        longitude
                );

        OpenMeteoResponse.CurrentWeather current = response.getCurrent();

        WeatherObservation observation =new WeatherObservation();

        observation.setLocation(location);
        observation.setLatitude(latitude);
        observation.setLongitude(longitude);
        observation.setTemperature(current.getTemperature());
        observation.setHumidity(current.getHumidity());
        observation.setRainfall(current.getPrecipitation());
        observation.setPressure(current.getPressure());
        observation.setWindSpeed(current.getWindSpeed());
        observation.setSource("Open-Meteo");
        observation.setObservedAt(LocalDateTime.now());
        // Use the duplicate-protected save method
        return saveWeatherObservation(observation);
    }
}