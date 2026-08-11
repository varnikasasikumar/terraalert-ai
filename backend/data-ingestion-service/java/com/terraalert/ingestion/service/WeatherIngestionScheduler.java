package com.terraalert.ingestion.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.terraalert.ingestion.dto.IngestionResult;
import com.terraalert.ingestion.model.WeatherObservation;

@Component
public class WeatherIngestionScheduler {

    private final WeatherIngestionService weatherIngestionService;

    public WeatherIngestionScheduler(
            WeatherIngestionService weatherIngestionService) {

        this.weatherIngestionService = weatherIngestionService;
    }

    @Scheduled(fixedRateString = "${weather.ingestion.interval}")
    public void ingestHoustonWeather() {

        double latitude = 29.7604;
        double longitude = -95.3698;
        String location = "Houston";

        IngestionResult result =
                weatherIngestionService.ingestCurrentWeather(
                        latitude,
                        longitude,
                        location
                );

        if (result.isCreated()) {

            System.out.println(
                    "New weather data ingested for "
                    + result.getObservation().getLocation()
                    + " at "
                    + result.getObservation().getObservedAt()
            );

        } else {

            System.out.println(
                    "Duplicate weather data skipped for "
                    + result.getObservation().getLocation()
                    + " at "
                    + result.getObservation().getObservedAt()
            );
        }
    }
}