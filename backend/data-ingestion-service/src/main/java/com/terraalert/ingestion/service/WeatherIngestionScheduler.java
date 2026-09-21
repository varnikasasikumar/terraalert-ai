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
    public void ingestHistoricalScenarios() {

        // ----------------------------------------------------
        // 1. HOUSTON FLOOD HISTORICAL SCENARIO (predictionTarget = FLOOD)
        // ----------------------------------------------------

        double latitude = 29.7604;
        double longitude = -95.3698;
        String location = "Houston";
        String startDate = "2017-07-26";
        String endDate = "2017-08-26";

        IngestionResult floodResult =
                weatherIngestionService.ingestHistoricalWeather(
                        latitude,
                        longitude,
                        location,
                        startDate,
                        endDate,
                        "FLOOD"
                );

        if (floodResult.isCreated()) {
            System.out.println(
                    "=== FLOOD HISTORICAL INGESTION ===\n"
                    + "New flood historical data ingested for "
                    + floodResult.getObservation().getLocation()
                    + " at "
                    + floodResult.getObservation().getObservedAt()
                    + " (Target: FLOOD)"
            );
        } else {
            System.out.println(
                    "=== FLOOD HISTORICAL INGESTION ===\n"
                    + "Duplicate flood historical data skipped for "
                    + floodResult.getObservation().getLocation()
            );
        }

        // ----------------------------------------------------
        // 2. SEATTLE LANDSLIDE HISTORICAL SCENARIO (predictionTarget = LANDSLIDE)
        // ----------------------------------------------------

        IngestionResult landslideResult =
                weatherIngestionService.ingestSeattleLandslideHistoricalWeather();

        if (landslideResult.isCreated()) {
            System.out.println(
                    "=== LANDSLIDE HISTORICAL INGESTION ===\n"
                    + "New landslide historical data ingested for "
                    + landslideResult.getObservation().getLocation()
                    + " at "
                    + landslideResult.getObservation().getObservedAt()
                    + " (Target: LANDSLIDE)"
            );
        } else {
            System.out.println(
                    "=== LANDSLIDE HISTORICAL INGESTION ===\n"
                    + "Duplicate landslide historical data skipped for "
                    + landslideResult.getObservation().getLocation()
            );
        }
    }
}