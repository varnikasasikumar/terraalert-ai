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

        java.util.Optional<WeatherObservation> existingObservation;

        if (observation.getPredictionTarget() != null) {
            existingObservation =
                    repository.findByLocationAndObservedAtAndSourceAndPredictionTarget(
                            observation.getLocation(),
                            observation.getObservedAt(),
                            observation.getSource(),
                            observation.getPredictionTarget()
                    );
        } else {
            existingObservation =
                    repository.findByLocationAndObservedAtAndSource(
                            observation.getLocation(),
                            observation.getObservedAt(),
                            observation.getSource()
                    );
        }

        if (existingObservation.isPresent()) {

            WeatherObservation existing = existingObservation.get();

            try {
                String processingResponse =
                        dataProcessingClient.processWeatherData(existing);

                System.out.println(
                        "Reprocessed existing historical data: "
                                + processingResponse
                );

            } catch (Exception e) {

                System.out.println(
                        "Data Processing Service Error while reprocessing: "
                                + e.getMessage()
                );
            }

            return new IngestionResult(
                    existing,
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
        OpenMeteoResponse.DailyWeather daily = response.getDaily();

        WeatherObservation observation = new WeatherObservation();

        observation.setLocation(location);
        observation.setLatitude(latitude);
        observation.setLongitude(longitude);
        observation.setTemperature(current.getTemperature());
        observation.setHumidity(current.getHumidity());
        observation.setRainfall(current.getPrecipitation());
        observation.setPressure(current.getPressure());
        observation.setWindSpeed(current.getWindSpeed());
        observation.setSoilMoisture(current.getSoilMoisture());
        observation.setSource("Open-Meteo");
        observation.setObservedAt(LocalDateTime.now());
        
        if (daily != null) {
            observation.setDailyDates(daily.getTime());
            observation.setPast32DaysRainfall(daily.getPrecipitationSum());
            observation.setDailyTemperatureMax(daily.getTemperature2mMax());
            observation.setDailyTemperatureMin(daily.getTemperature2mMin());
        }

        return saveWeatherObservation(observation);
    }
    
    public IngestionResult ingestHistoricalWeather(
            double latitude,
            double longitude,
            String location,
            String startDate,
            String endDate) {

        OpenMeteoResponse response =
                weatherApiClient.getHistoricalWeather(
                        latitude,
                        longitude,
                        startDate,
                        endDate
                );

        OpenMeteoResponse.DailyWeather daily =
                response.getDaily();

        OpenMeteoResponse.HourlyWeather hourly =
                response.getHourly();

        WeatherObservation observation =
                new WeatherObservation();

        observation.setLocation(location);
        observation.setLatitude(latitude);
        observation.setLongitude(longitude);
        observation.setSource("HISTORICAL-SIMULATION");

        // --------------------------------------------------
        // 32-day historical data
        // --------------------------------------------------

        if (daily != null) {

            observation.setDailyDates(
                    daily.getTime()
            );

            observation.setPast32DaysRainfall(
                    daily.getPrecipitationSum()
            );

            observation.setDailyTemperatureMax(
                    daily.getTemperature2mMax()
            );

            observation.setDailyTemperatureMin(
                    daily.getTemperature2mMin()
            );
        }

        // --------------------------------------------------
        // Find the target observation time
        // --------------------------------------------------

        String targetTime =
                endDate + "T11:00";

        int hourlyIndex = -1;

        if (hourly != null && hourly.getTime() != null) {

            hourlyIndex =
                    hourly.getTime().indexOf(targetTime);
        }

        if (hourlyIndex == -1) {

            throw new IllegalStateException(
                    "Historical hourly weather not found for "
                    + targetTime
            );
        }

        // --------------------------------------------------
        // Current weather values for the GridRad timestamp
        // --------------------------------------------------

        observation.setTemperature(
                hourly.getTemperature().get(hourlyIndex)
        );

        observation.setHumidity(
                hourly.getHumidity().get(hourlyIndex)
        );

        observation.setRainfall(
                hourly.getPrecipitation().get(hourlyIndex)
        );

        observation.setPressure(
                hourly.getPressure().get(hourlyIndex)
        );

        observation.setWindSpeed(
                hourly.getWindSpeed().get(hourlyIndex)
        );

        observation.setSoilMoisture(
                hourly.getSoilMoisture().get(hourlyIndex)
        );

        // --------------------------------------------------
        // IMPORTANT:
        // Match the GridRad timestamp
        // --------------------------------------------------

        observation.setObservedAt(
                LocalDateTime.parse(
                        targetTime + ":00"
                )
        );

        observation.setPredictionTarget("FLOOD");

        return saveWeatherObservation(observation);
    }

    public IngestionResult ingestHistoricalWeather(
            double latitude,
            double longitude,
            String location,
            String startDate,
            String endDate,
            String predictionTarget) {

        IngestionResult result = ingestHistoricalWeather(latitude, longitude, location, startDate, endDate);
        result.getObservation().setPredictionTarget(predictionTarget);
        return result;
    }

    public IngestionResult ingestSeattleLandslideHistoricalWeather() {

        WeatherObservation observation = new WeatherObservation();

        observation.setLocation("Seattle");
        observation.setLatitude(47.6062);
        observation.setLongitude(-122.3321);
        observation.setSource("HISTORICAL-SIMULATION");
        observation.setPredictionTarget("LANDSLIDE");
        observation.setObservedAt(LocalDateTime.parse("1978-11-03T11:00:00"));

        // Historical features derived from Seattle dataset record 1978-11-03
        observation.setDailyDates(List.of("1978-11-03"));
        observation.setPast32DaysRainfall(List.of(26.7));
        observation.setDailyTemperatureMax(List.of(13.9));
        observation.setDailyTemperatureMin(List.of(6.7));

        observation.setRainfall(26.7);
        observation.setTemperature(10.3);
        observation.setHumidity(85.0);
        observation.setWindSpeed(12.0);
        observation.setPressure(1012.0);
        observation.setSoilMoisture(0.75);

        return saveWeatherObservation(observation);
    }
}