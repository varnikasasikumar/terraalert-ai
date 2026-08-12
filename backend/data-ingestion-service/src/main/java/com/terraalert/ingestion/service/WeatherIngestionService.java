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
    private final DataProcessingClient dataProcessingClient;
    
    public WeatherIngestionService(
            WeatherObservationRepository repository,
            WeatherApiClient weatherApiClient,
            DataProcessingClient dataProcessingClient) {

        this.repository = repository;
        this.weatherApiClient = weatherApiClient;
        this.dataProcessingClient = dataProcessingClient;
    }
    
    
    public IngestionResult saveWeatherObservation(
            WeatherObservation observation) {

        if (observation.getObservedAt() == null) {
            observation.setObservedAt(LocalDateTime.now());
        }

        var existingObservation =
                repository.findByLocationAndObservedAtAndSource(
                        observation.getLocation(),
                        observation.getObservedAt(),
                        observation.getSource()
                );

        if (existingObservation.isPresent()) {

            return new IngestionResult(
                    existingObservation.get(),
                    false
            );
        }

        WeatherObservation savedObservation =
                repository.save(observation);

        try {

            String processingResponse =
                    dataProcessingClient.processWeatherData(
                            savedObservation
                    );

            System.out.println(
                    "Data Processing Response: "
                    + processingResponse
            );

        } catch (Exception e) {

            System.out.println(
                    "Data Processing Service Error: "
                    + e.getMessage()
            );
        }

        return new IngestionResult(
                savedObservation,
                true
        );
    }

    
    public List<WeatherObservation> getAllWeatherObservations() {

        return repository.findAll();
    }

   
    public WeatherObservation getWeatherObservationById(
            String id) {

        return repository.findById(id)
                .orElse(null);
    }

 
    public void deleteWeatherObservation(String id) {

        repository.deleteById(id);
    }


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
  
        return saveWeatherObservation(observation);
    }
}