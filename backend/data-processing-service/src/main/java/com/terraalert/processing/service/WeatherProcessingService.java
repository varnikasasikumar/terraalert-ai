package com.terraalert.processing.service;

import org.springframework.stereotype.Service;

import com.terraalert.processing.dto.WeatherProcessingRequest;
import com.terraalert.processing.model.ProcessedWeatherData;

@Service
public class WeatherProcessingService {

    public ProcessedWeatherData processWeatherData(
            WeatherProcessingRequest request) {

        ProcessedWeatherData processedData =
                new ProcessedWeatherData();

        processedData.setLocation(request.getLocation());
        processedData.setLatitude(request.getLatitude());
        processedData.setLongitude(request.getLongitude());

        processedData.setTemperature(
                request.getTemperature()
        );

        processedData.setHumidity(
                request.getHumidity()
        );

        processedData.setRainfall(
                request.getRainfall()
        );

        processedData.setWindSpeed(
                request.getWindSpeed()
        );

        processedData.setPressure(
                request.getPressure()
        );

        processedData.setSoilMoisture(
                request.getSoilMoisture()
        );

        processedData.setElevation(
                request.getElevation()
        );

        processedData.setObservedAt(
                request.getObservedAt()
        );

        processedData.setSource(
                request.getSource()
        );

        return processedData;
    }
}