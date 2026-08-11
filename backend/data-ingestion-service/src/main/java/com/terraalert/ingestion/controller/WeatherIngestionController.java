package com.terraalert.ingestion.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import jakarta.validation.Valid;
import com.terraalert.ingestion.dto.IngestionResult;
import com.terraalert.ingestion.dto.WeatherObservationRequest;
import com.terraalert.ingestion.model.WeatherObservation;
import com.terraalert.ingestion.service.WeatherIngestionService;

@RestController
@RequestMapping("/api/ingestion/weather")
public class WeatherIngestionController {

    private final WeatherIngestionService weatherIngestionService;

    public WeatherIngestionController(
            WeatherIngestionService weatherIngestionService) {

        this.weatherIngestionService = weatherIngestionService;
    }

    @PostMapping
    public ResponseEntity<WeatherObservation> saveWeatherObservation(
            @Valid @RequestBody WeatherObservationRequest request) {

        WeatherObservation observation = new WeatherObservation();

        observation.setLocation(request.getLocation());
        observation.setLatitude(request.getLatitude());
        observation.setLongitude(request.getLongitude());
        observation.setAltitude(request.getAltitude());
        observation.setTemperature(request.getTemperature());
        observation.setHumidity(request.getHumidity());
        observation.setRainfall(request.getRainfall());
        observation.setWindSpeed(request.getWindSpeed());
        observation.setPressure(request.getPressure());
        observation.setObservedAt(request.getObservedAt());
        observation.setSource(request.getSource());

        IngestionResult result =
                weatherIngestionService
                        .saveWeatherObservation(observation);

        if (result.isCreated()) {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(result.getObservation());
        }

        return ResponseEntity
                .ok(result.getObservation());
    }
    // READ ALL
    @GetMapping
    public ResponseEntity<List<WeatherObservation>>
            getAllWeatherObservations() {

        return ResponseEntity.ok(
                weatherIngestionService
                        .getAllWeatherObservations()
        );
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<WeatherObservation>
            getWeatherObservationById(
                    @PathVariable String id) {

        WeatherObservation observation =
                weatherIngestionService
                        .getWeatherObservationById(id);

        if (observation == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(observation);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWeatherObservation(
            @PathVariable String id) {

        weatherIngestionService
                .deleteWeatherObservation(id);

        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/current")
    public ResponseEntity<WeatherObservation> ingestCurrentWeather(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam String location) {

        IngestionResult result =
                weatherIngestionService.ingestCurrentWeather(
                        latitude,
                        longitude,
                        location
                );

        return ResponseEntity.ok(result.getObservation());
    }
}