package com.terraalert.riskassessment.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.terraalert.riskassessment.dto.RiskAssessmentRequest;
import com.terraalert.riskassessment.dto.RiskAssessmentResponse;

@Service
public class RiskAssessmentService {

	public RiskAssessmentResponse assessRisk(
	        RiskAssessmentRequest request) {

	    double floodProbability =
	            request.getFloodProbability();

	    double landslideProbability =
	            request.getLandslideProbability();

	    String floodRisk;
	    String landslideRisk;
	    String overallRisk;

	    if (floodProbability >= 0.75) {
	        floodRisk = "HIGH";
	    } else if (floodProbability >= 0.50) {
	        floodRisk = "MEDIUM";
	    } else {
	        floodRisk = "LOW";
	    }

	    if (landslideProbability >= 0.75) {
	        landslideRisk = "HIGH";
	    } else if (landslideProbability >= 0.50) {
	        landslideRisk = "MEDIUM";
	    } else {
	        landslideRisk = "LOW";
	    }

	    if (floodRisk.equals("HIGH")
	            || landslideRisk.equals("HIGH")) {

	        overallRisk = "HIGH";

	    } else if (floodRisk.equals("MEDIUM")
	            || landslideRisk.equals("MEDIUM")) {

	        overallRisk = "MEDIUM";

	    } else {

	        overallRisk = "LOW";
	    }

	    return new RiskAssessmentResponse(
	            request.getLocation(),
	            request.getLatitude(),
	            request.getLongitude(),
	            floodProbability,
	            landslideProbability,
	            floodRisk,
	            landslideRisk,
	            overallRisk,
	            LocalDateTime.now()
	    );
	}
}