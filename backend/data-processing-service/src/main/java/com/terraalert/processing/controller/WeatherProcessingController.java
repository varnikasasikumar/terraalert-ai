package com.terraalert.processing.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.terraalert.processing.dto.WeatherProcessingRequest;
import com.terraalert.processing.dto.WeatherProcessingResponse;
import com.terraalert.processing.dto.DisasterDataRequest;
import com.terraalert.processing.dto.DisasterEventResponse;
import com.terraalert.processing.dto.DisasterEventsResponse;
import com.terraalert.processing.service.WeatherProcessingService;

@RestController
@RequestMapping("/api/processing/weather")
public class WeatherProcessingController {

    private final WeatherProcessingService weatherProcessingService;

    private List<DisasterEventResponse> latestEvents =
            new ArrayList<>();

    public WeatherProcessingController(
            WeatherProcessingService weatherProcessingService) {

        this.weatherProcessingService = weatherProcessingService;
    }

    @PostMapping
    public ResponseEntity<WeatherProcessingResponse> processWeatherData(
            @Valid @RequestBody WeatherProcessingRequest request) {

        WeatherProcessingResponse response =
                weatherProcessingService.processWeatherData(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/disasters")
    public ResponseEntity<DisasterEventsResponse> processMultipleDisasters(
             @RequestBody List<@Valid DisasterDataRequest> requests) {
    	
    	System.out.println(">>> DISASTER CONTROLLER REACHED <<<");
        System.out.println(">>> REQUEST COUNT: " + requests.size());

        List<DisasterEventResponse> events =
                new ArrayList<>();

        for (DisasterDataRequest request : requests) {

            DisasterEventResponse event =
                    weatherProcessingService.processDisasterData(request);

            if (event != null) {
                events.add(event);
            }
        }

        // Store latest detected events
        latestEvents = new ArrayList<>(events);

        return ResponseEntity.ok(
                new DisasterEventsResponse(events)
        );
    }

    @GetMapping("/disasters")
    public ResponseEntity<DisasterEventsResponse> getCurrentDisasters() {

        return ResponseEntity.ok(
                weatherProcessingService.getActiveDisasterEvents()
        );
    }
    
    @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(
            org.springframework.web.bind.MethodArgumentNotValidException ex) {

        StringBuilder message = new StringBuilder();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        message.append(error.getField())
                               .append(" : ")
                               .append(error.getDefaultMessage())
                               .append("\n")
                );

        return ResponseEntity.badRequest()
                .body(message.toString());
    }
    
    @ExceptionHandler(org.springframework.http.converter.HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleJsonError(
            org.springframework.http.converter.HttpMessageNotReadableException ex) {

        System.out.println(">>> JSON DESERIALIZATION ERROR <<<");
        ex.printStackTrace();

        return ResponseEntity.badRequest()
                .body("JSON ERROR: " + ex.getMostSpecificCause().getMessage());
    }
    
}