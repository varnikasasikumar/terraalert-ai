package com.terraalert.landslideprediction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.terraalert.landslideprediction.dto.LandslidePredictionRequest;
import com.terraalert.landslideprediction.dto.LandslidePredictionResponse;
import com.terraalert.landslideprediction.service.LandslidePredictionService;

@RestController
@RequestMapping("/api/prediction/landslide")
public class LandslidePredictionController {

    private final LandslidePredictionService landslidePredictionService;

    public LandslidePredictionController(
            LandslidePredictionService landslidePredictionService) {

        this.landslidePredictionService = landslidePredictionService;
    }

    @PostMapping
    public ResponseEntity<LandslidePredictionResponse> predictLandslide(
            @Valid @RequestBody LandslidePredictionRequest request) {

        LandslidePredictionResponse response =
                landslidePredictionService.predictLandslide(request);

        return ResponseEntity.ok(response);
    }
}