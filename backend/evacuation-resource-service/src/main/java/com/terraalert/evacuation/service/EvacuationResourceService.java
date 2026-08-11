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

            Shelter shelter = shelters.get(0);

            nearestShelter = shelter.getName();

            availableCapacity =
                    shelter.getCapacity()
                    - shelter.getCurrentOccupancy();
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
}