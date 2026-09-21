package com.terraalert.floodprediction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.terraalert.floodprediction.dto.FloodPredictionRequest;
import com.terraalert.floodprediction.dto.FloodPredictionResponse;
import com.terraalert.floodprediction.service.FloodPredictionService;

@RestController
@RequestMapping("/api/prediction/flood")
public class FloodPredictionController {

    private final FloodPredictionService floodPredictionService;

    public FloodPredictionController(
            FloodPredictionService floodPredictionService) {

        this.floodPredictionService = floodPredictionService;
    }

    @PostMapping
    public ResponseEntity<FloodPredictionResponse> predictFlood(
            @Valid @RequestBody FloodPredictionRequest request) {

        FloodPredictionResponse response =
                floodPredictionService.predictFlood(request);

        return ResponseEntity.ok(response);
    }
}