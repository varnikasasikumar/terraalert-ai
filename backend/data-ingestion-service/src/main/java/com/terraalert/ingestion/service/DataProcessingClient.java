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

    public String processWeatherData(WeatherObservation observation) {

        WeatherProcessingRequest request =new WeatherProcessingRequest();

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

        
        request.setSoilMoisture(
                observation.getSoilMoisture()
        );

        request.setDailyDates(
                observation.getDailyDates()
        );

        request.setPast32DaysRainfall(
                observation.getPast32DaysRainfall()
        );

        request.setDailyTemperatureMax(
                observation.getDailyTemperatureMax()
        );

        request.setDailyTemperatureMin(
                observation.getDailyTemperatureMin()
        );

        request.setElevation(
                observation.getAltitude()
        );

        request.setObservedAt(
                observation.getObservedAt()
        );

        request.setSource(
                observation.getSource()
        );

        request.setPredictionTarget(
                observation.getPredictionTarget()
        );

        // TEMPORARY DEBUG
        System.out.println("=== DAILY WEATHER DEBUG ===");
        System.out.println("dailyDates = " + request.getDailyDates());
        System.out.println("past32DaysRainfall = " + request.getPast32DaysRainfall());
        System.out.println("dailyTemperatureMax = " + request.getDailyTemperatureMax());
        System.out.println("dailyTemperatureMin = " + request.getDailyTemperatureMin());
        System.out.println("===========================");

        return restClient.post()
                .uri("/api/processing/weather")
                .body(request)
                .retrieve()
                .body(String.class);
            }
}