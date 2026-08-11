package com.terraalert.ingestion.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.terraalert.ingestion.dto.OpenMeteoResponse;

@Service
public class WeatherApiClient {

    private final RestTemplate restTemplate;

    @Value("${weather.api.base-url}")
    private String baseUrl;

    public WeatherApiClient() {
        this.restTemplate = new RestTemplate();
    }

    public OpenMeteoResponse getCurrentWeather(
            double latitude,
            double longitude) {

        String url =
                baseUrl
                + "?latitude=" + latitude
                + "&longitude=" + longitude
                + "&current=temperature_2m,"
                + "relative_humidity_2m,"
                + "precipitation,"
                + "surface_pressure,"
                + "wind_speed_10m";

        return restTemplate.getForObject(
                url,
                OpenMeteoResponse.class
        );
    }
}