package com.terraalert.landslideprediction.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.terraalert.landslideprediction.dto.LandslidePredictionRequest;
import com.terraalert.landslideprediction.dto.LandslidePredictionResponse;

@Service
public class LandslidePredictionService {

    public LandslidePredictionResponse predictLandslide(
            LandslidePredictionRequest request) {

        /*
         * The real ML/DL model will be integrated here later.
         *
         * For now, this only prepares the prediction
         * response structure.
         */

        return new LandslidePredictionResponse(
                request.getLocation(),
                request.getLatitude(),
                request.getLongitude(),
                0.0,
                "UNKNOWN",
                LocalDateTime.now(),
                "NOT_AVAILABLE"
        );
    }
}