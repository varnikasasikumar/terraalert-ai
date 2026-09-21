package com.terraalert.landslideprediction.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.terraalert.landslideprediction.dto.LandslideMLRequest;
import com.terraalert.landslideprediction.dto.LandslideMLResponse;
import com.terraalert.landslideprediction.dto.LandslidePredictionRequest;
import com.terraalert.landslideprediction.dto.LandslidePredictionResponse;

@Service
public class LandslidePredictionService {

    private final RestClient restClient;

    public LandslidePredictionService(
            @Value("${landslide.ml.service.url:http://localhost:5001}") String baseUrl) {

        this.restClient = RestClient
                .builder()
                .baseUrl(baseUrl)
                .build();
    }

    public LandslidePredictionResponse predictLandslide(
            LandslidePredictionRequest request) {

        // Create request for Python ML model

        LandslideMLRequest mlRequest =
                new LandslideMLRequest();

        mlRequest.setRainfall_1d(
                request.getRainfall_1d()
        );

        mlRequest.setRainfall_3d(
                request.getRainfall_3d()
        );

        mlRequest.setRainfall_7d(
                request.getRainfall_7d()
        );

        mlRequest.setRainfall_15d(
                request.getRainfall_15d()
        );

        mlRequest.setRainfall_32d(
                request.getRainfall_32d()
        );

        mlRequest.setTemperature_max(
                request.getTemperature_max()
        );

        mlRequest.setTemperature_min(
                request.getTemperature_min()
        );


        // Call Python Flask ML service

        LandslideMLResponse mlResponse =
                restClient.post()
                        .uri("/predict")
                        .body(mlRequest)
                        .retrieve()
                        .body(LandslideMLResponse.class);


        // Convert ML response into TerraAlert response

        return new LandslidePredictionResponse(
                request.getLocation() != null ? request.getLocation() : "Selected Location",
                request.getLatitude() != null ? request.getLatitude() : 0.0,
                request.getLongitude() != null ? request.getLongitude() : 0.0,
                mlResponse.getLandslideProbability(),
                mlResponse.getRisk(),
                LocalDateTime.now(),
                "seattle-landslide-baseline"
        );
    }
}