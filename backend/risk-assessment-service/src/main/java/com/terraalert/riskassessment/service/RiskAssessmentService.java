package com.terraalert.riskassessment.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.terraalert.riskassessment.dto.RiskAssessmentRequest;
import com.terraalert.riskassessment.dto.RiskAssessmentResponse;

@Service
public class RiskAssessmentService {

	public RiskAssessmentResponse assessRisk(
	        RiskAssessmentRequest request) {

	    Double floodProbability =
	            request.getFloodProbability();

	    Double landslideProbability =
	            request.getLandslideProbability();

	    String floodRisk;
	    String landslideRisk;
	    String overallRisk;

	    if (floodProbability == null) {
	        floodRisk = "UNKNOWN";
	    } else if (floodProbability >= 0.75) {
	        floodRisk = "HIGH";
	    } else if (floodProbability >= 0.50) {
	        floodRisk = "MEDIUM";
	    } else {
	        floodRisk = "LOW";
	    }

	    if (landslideProbability == null) {
	        landslideRisk = "UNKNOWN";
	    } else if (landslideProbability >= 0.75) {
	        landslideRisk = "HIGH";
	    } else if (landslideProbability >= 0.50) {
	        landslideRisk = "MEDIUM";
	    } else {
	        landslideRisk = "LOW";
	    }

	    if (floodRisk.equals("HIGH") || landslideRisk.equals("HIGH")) {
	        overallRisk = "HIGH";
	    } else if (floodRisk.equals("MEDIUM") || landslideRisk.equals("MEDIUM")) {
	        overallRisk = "MEDIUM";
	    } else if (floodRisk.equals("LOW") || landslideRisk.equals("LOW")) {
	        overallRisk = "LOW";
	    } else {
	        overallRisk = "UNKNOWN";
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