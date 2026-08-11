package com.terraalert.weather.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.terraalert.weather.model.WeatherData;

public interface WeatherDataRepository
        extends MongoRepository<WeatherData, String> {

    List<WeatherData> findByLocation(String location);

    List<WeatherData> findByLocationAndMeasuredAtBetween(
            String location,
            LocalDateTime start,
            LocalDateTime end
    );
}