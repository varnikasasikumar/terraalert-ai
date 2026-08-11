package com.terraalert.processing.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.terraalert.processing.dto.WeatherProcessingRequest;
import com.terraalert.processing.model.ProcessedWeatherData;
import com.terraalert.processing.service.WeatherProcessingService;

@RestController
@RequestMapping("/api/processing/weather")
public class WeatherProcessingController {

    private final WeatherProcessingService weatherProcessingService;

    public WeatherProcessingController(
            WeatherProcessingService weatherProcessingService) {

        this.weatherProcessingService = weatherProcessingService;
    }

    @PostMapping
    public ResponseEntity<ProcessedWeatherData> processWeatherData(
            @Valid @RequestBody WeatherProcessingRequest request) {

        ProcessedWeatherData processedData =
                weatherProcessingService.processWeatherData(request);

        return ResponseEntity.ok(processedData);
    }
}