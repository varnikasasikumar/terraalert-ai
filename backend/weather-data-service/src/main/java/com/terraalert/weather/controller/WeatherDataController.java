package com.terraalert.weather.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.terraalert.weather.dto.WeatherDataRequest;
import com.terraalert.weather.dto.WeatherDataResponse;
import com.terraalert.weather.service.WeatherDataService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/weather")
public class WeatherDataController {

    private final WeatherDataService weatherDataService;

    public WeatherDataController(
            WeatherDataService weatherDataService) {

        this.weatherDataService = weatherDataService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<WeatherDataResponse> createWeatherData(
            @Valid @RequestBody WeatherDataRequest request) {

        WeatherDataResponse savedData =
                weatherDataService.saveWeatherData(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedData);
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<WeatherDataResponse>>
            getAllWeatherData() {

        return ResponseEntity.ok(
                weatherDataService.getAllWeatherData()
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<WeatherDataResponse>
            getWeatherDataById(
                    @PathVariable String id) {

        return ResponseEntity.ok(
                weatherDataService.getWeatherDataById(id)
        );
    }

    // GET BY LOCATION
    @GetMapping("/location/{location}")
    public ResponseEntity<List<WeatherDataResponse>>
            getWeatherDataByLocation(
                    @PathVariable String location) {

        return ResponseEntity.ok(
                weatherDataService
                        .getWeatherDataByLocation(location)
        );
    }

    // GET BY LOCATION AND TIME RANGE
    @GetMapping("/location/{location}/range")
    public ResponseEntity<List<WeatherDataResponse>>
            getWeatherDataByLocationAndTimeRange(
                    @PathVariable String location,
                    @RequestParam LocalDateTime start,
                    @RequestParam LocalDateTime end) {

        return ResponseEntity.ok(
                weatherDataService
                        .getWeatherDataByLocationAndTimeRange(
                                location,
                                start,
                                end
                        )
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWeatherData(
            @PathVariable String id) {

        weatherDataService.deleteWeatherData(id);

        return ResponseEntity.noContent().build();
    }
}