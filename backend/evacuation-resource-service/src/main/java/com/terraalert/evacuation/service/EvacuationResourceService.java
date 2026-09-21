package com.terraalert.evacuation.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.terraalert.evacuation.dto.EvacuationRequest;
import com.terraalert.evacuation.dto.EvacuationResponse;
import com.terraalert.evacuation.model.Shelter;
import com.terraalert.evacuation.repository.ShelterRepository;

@Service
public class EvacuationResourceService {

    private final ShelterRepository shelterRepository;

    public EvacuationResourceService(
            ShelterRepository shelterRepository) {

        this.shelterRepository = shelterRepository;
    }

    public EvacuationResponse generateEvacuationRecommendation(
            EvacuationRequest request) {

        List<Shelter> shelters =
                shelterRepository.findByStatus("AVAILABLE");

        String nearestShelter = "NOT_AVAILABLE";
        Integer availableCapacity = 0;

        if (!shelters.isEmpty()) {

            Shelter nearest = null;
            double shortestDistance = Double.MAX_VALUE;

            for (Shelter shelter : shelters) {

                double distance = calculateDistance(
                        request.getLatitude(),
                        request.getLongitude(),
                        shelter.getLatitude(),
                        shelter.getLongitude()
                );

                int shelterAvailableCapacity =
                        shelter.getCapacity()
                        - shelter.getCurrentOccupancy();

                // Ignore shelters that have no available capacity
                if (shelterAvailableCapacity <= 0) {
                    continue;
                }

                if (distance < shortestDistance) {

                    shortestDistance = distance;
                    nearest = shelter;
                }
            }

            if (nearest != null) {

                nearestShelter = nearest.getName();

                availableCapacity =
                        nearest.getCapacity()
                        - nearest.getCurrentOccupancy();
            }
        }

        String recommendation;

        if ("HIGH".equalsIgnoreCase(request.getRiskLevel())
                || "CRITICAL".equalsIgnoreCase(request.getRiskLevel())) {

            recommendation =
                    "Evacuation recommended. Move affected population to the nearest available shelter.";

        } else if ("MEDIUM".equalsIgnoreCase(request.getRiskLevel())) {

            recommendation =
                    "Prepare for possible evacuation and monitor the situation.";

        } else {

            recommendation =
                    "No immediate evacuation required. Continue monitoring.";
        }

        return new EvacuationResponse(
                request.getLocation(),
                request.getLatitude(),
                request.getLongitude(),
                request.getRiskLevel(),
                recommendation,
                nearestShelter,
                availableCapacity,
                LocalDateTime.now()
        );
    }
    
    private double calculateDistance(
            double latitude1,
            double longitude1,
            double latitude2,
            double longitude2) {

        final double EARTH_RADIUS_KM = 6371.0;

        double lat1 = Math.toRadians(latitude1);
        double lat2 = Math.toRadians(latitude2);

        double deltaLat =
                Math.toRadians(latitude2 - latitude1);

        double deltaLon =
                Math.toRadians(longitude2 - longitude1);

        double a =
                Math.sin(deltaLat / 2)
                * Math.sin(deltaLat / 2)
                + Math.cos(lat1)
                * Math.cos(lat2)
                * Math.sin(deltaLon / 2)
                * Math.sin(deltaLon / 2);

        double c =
                2 * Math.atan2(
                        Math.sqrt(a),
                        Math.sqrt(1 - a)
                );

        return EARTH_RADIUS_KM * c;
    }
}