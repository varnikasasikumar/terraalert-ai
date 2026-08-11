package com.terraalert.ingestion.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.terraalert.ingestion.model.WeatherObservation;

public interface WeatherObservationRepository
        extends MongoRepository<WeatherObservation, String> {

    Optional<WeatherObservation> findByLocationAndObservedAtAndSource(
            String location,
            LocalDateTime observedAt,
            String source
    );
}