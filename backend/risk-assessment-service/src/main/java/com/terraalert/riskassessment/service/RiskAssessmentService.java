package com.terraalert.riskassessment.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.terraalert.riskassessment.dto.RiskAssessmentRequest;
import com.terraalert.riskassessment.dto.RiskAssessmentResponse;

@Service
public class RiskAssessmentService {

    public RiskAssessmentResponse assessRisk(
            RiskAssessmentRequest request) {

        /*
         * The actual risk assessment policy will be implemented
         * after the flood and landslide model outputs are finalized.
         *
         * For now, this service only prepares the response structure.
         */

        return new RiskAssessmentResponse(
                request.getLocation(),
                request.getLatitude(),
                request.getLongitude(),
                request.getFloodProbability(),
                request.getLandslideProbability(),
                "UNKNOWN",
                "UNKNOWN",
                "UNKNOWN",
                LocalDateTime.now()
        );
    }
}