package com.terraalert.floodprediction.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.terraalert.floodprediction.dto.FloodPredictionRequest;
import com.terraalert.floodprediction.dto.FloodPredictionResponse;

@Service
public class FloodPredictionService {

    private final RestClient restClient;

    public FloodPredictionService() {
        this.restClient = RestClient
                .builder()
                .baseUrl("http://localhost:5002")
                .build();
    }

    public FloodPredictionResponse predictFlood(
            FloodPredictionRequest request) {

        Map<String, Object> mlRequest = new HashMap<>();

        // Radar features
        mlRequest.put(
                "reflectivityMean",
                request.getReflectivityMean()
        );

        mlRequest.put(
                "reflectivityMax",
                request.getReflectivityMax()
        );

        mlRequest.put(
                "reflectivityMin",
                request.getReflectivityMin()
        );

        mlRequest.put(
                "reflectivityStd",
                request.getReflectivityStd()
        );

        mlRequest.put(
                "reflectivityMedian",
                request.getReflectivityMedian()
        );

        mlRequest.put(
                "reflectivityGe20Pct",
                request.getReflectivityGe20Pct()
        );

        mlRequest.put(
                "reflectivityGe30Pct",
                request.getReflectivityGe30Pct()
        );

        mlRequest.put(
                "reflectivityGe40Pct",
                request.getReflectivityGe40Pct()
        );

        mlRequest.put(
                "radarObservationCount",
                request.getRadarObservationCount()
        );

        // Weather features
        mlRequest.put(
                "temperature",
                request.getTemperature()
        );

        mlRequest.put(
                "humidity",
                request.getHumidity()
        );

        mlRequest.put(
                "rainfall",
                request.getRainfall()
        );

        mlRequest.put(
                "pressure",
                request.getPressure()
        );

        mlRequest.put(
                "windSpeed",
                request.getWindSpeed()
        );

        mlRequest.put(
                "soilMoisture",
                request.getSoilMoisture()
        );

        // Call Flood ML FastAPI service
        Map<String, Object> mlResponse =
                restClient.post()
                        .uri("/api/predict/flood")
                        .body(mlRequest)
                        .retrieve()
                        .body(Map.class);

        double floodProbability =
                ((Number) mlResponse.get("floodProbability"))
                        .doubleValue();

        String riskLevel;

        if (floodProbability >= 0.75) {

            riskLevel = "HIGH";

        } else if (floodProbability >= 0.50) {

            riskLevel = "MEDIUM";

        } else {

            riskLevel = "LOW";
        }

        return new FloodPredictionResponse(
                request.getLocation(),
                request.getLatitude(),
                request.getLongitude(),
                floodProbability,
                riskLevel,
                LocalDateTime.now(),
                "flood-random-forest"
        );
    }
}