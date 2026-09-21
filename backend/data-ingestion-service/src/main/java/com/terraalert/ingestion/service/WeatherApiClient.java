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
                + "wind_speed_10m,"
                + "soil_moisture_0_to_7cm"
                + "&daily=precipitation_sum,"
                + "temperature_2m_max,"
                + "temperature_2m_min"
                + "&past_days=32&timezone=auto";

        return restTemplate.getForObject(
                url,
                OpenMeteoResponse.class
        );
    }
    
    public OpenMeteoResponse getHistoricalWeather(
            double latitude,
            double longitude,
            String startDate,
            String endDate) {

        String url =
                "https://archive-api.open-meteo.com/v1/archive"
                + "?latitude=" + latitude
                + "&longitude=" + longitude
                + "&start_date=" + startDate
                + "&end_date=" + endDate
                + "&hourly=temperature_2m,"
                + "relative_humidity_2m,"
                + "precipitation,"
                + "surface_pressure,"
                + "wind_speed_10m,"
                + "soil_moisture_0_to_7cm"
                + "&daily=precipitation_sum,"
                + "temperature_2m_max,"
                + "temperature_2m_min"
                + "&timezone=UTC";

        return restTemplate.getForObject(
                url,
                OpenMeteoResponse.class
        );
    }
    
}