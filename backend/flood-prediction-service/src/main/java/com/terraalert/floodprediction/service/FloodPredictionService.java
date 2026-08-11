package com.terraalert.floodprediction.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.terraalert.floodprediction.dto.FloodPredictionRequest;
import com.terraalert.floodprediction.dto.FloodPredictionResponse;

@Service
public class FloodPredictionService {

    public FloodPredictionResponse predictFlood(
            FloodPredictionRequest request) {

        /*
         * The real ML/DL model will be integrated here later.
         *
         * For now, this method only prepares the prediction
         * response structure.
         */

        return new FloodPredictionResponse(
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