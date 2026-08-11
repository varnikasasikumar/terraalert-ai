package com.terraalert.weather.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.terraalert.weather.dto.WeatherDataRequest;
import com.terraalert.weather.dto.WeatherDataResponse;
import com.terraalert.weather.exception.ResourceNotFoundException;
import com.terraalert.weather.model.WeatherData;
import com.terraalert.weather.repository.WeatherDataRepository;

@Service
public class WeatherDataService {

    private final WeatherDataRepository weatherDataRepository;

    public WeatherDataService(
            WeatherDataRepository weatherDataRepository) {

        this.weatherDataRepository = weatherDataRepository;
    }

    // CREATE
    public WeatherDataResponse saveWeatherData(
            WeatherDataRequest request) {

        WeatherData weatherData = new WeatherData();

        weatherData.setLocation(request.getLocation());
        weatherData.setLatitude(request.getLatitude());
        weatherData.setLongitude(request.getLongitude());
        weatherData.setAltitude(request.getAltitude());
        weatherData.setTemperature(request.getTemperature());
        weatherData.setHumidity(request.getHumidity());
        weatherData.setRainfall(request.getRainfall());
        weatherData.setWindSpeed(request.getWindSpeed());
        weatherData.setPressure(request.getPressure());

        weatherData.setMeasuredAt(
                request.getMeasuredAt() != null
                        ? request.getMeasuredAt()
                        : LocalDateTime.now()
        );

        weatherData.setSource(request.getSource());

        WeatherData savedData =
                weatherDataRepository.save(weatherData);

        return convertToResponse(savedData);
    }

    // READ ALL
    public List<WeatherDataResponse> getAllWeatherData() {

        return weatherDataRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // READ BY ID
    public WeatherDataResponse getWeatherDataById(String id) {

        WeatherData weatherData =
                weatherDataRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Weather data not found with id: "
                                                + id
                                )
                        );

        return convertToResponse(weatherData);
    }

    // READ BY LOCATION
    public List<WeatherDataResponse> getWeatherDataByLocation(
            String location) {

        return weatherDataRepository
                .findByLocation(location)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // READ BY LOCATION AND TIME RANGE
    public List<WeatherDataResponse>
            getWeatherDataByLocationAndTimeRange(
                    String location,
                    LocalDateTime start,
                    LocalDateTime end) {

        return weatherDataRepository
                .findByLocationAndMeasuredAtBetween(
                        location,
                        start,
                        end
                )
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // DELETE
    public void deleteWeatherData(String id) {

        if (!weatherDataRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Weather data not found with id: " + id
            );
        }

        weatherDataRepository.deleteById(id);
    }

    // ENTITY → RESPONSE DTO
    private WeatherDataResponse convertToResponse(
            WeatherData weatherData) {

        return new WeatherDataResponse(
                weatherData.getId(),
                weatherData.getLocation(),
                weatherData.getLatitude(),
                weatherData.getLongitude(),
                weatherData.getAltitude(),
                weatherData.getTemperature(),
                weatherData.getHumidity(),
                weatherData.getRainfall(),
                weatherData.getWindSpeed(),
                weatherData.getPressure(),
                weatherData.getMeasuredAt(),
                weatherData.getSource()
        );
    }
}