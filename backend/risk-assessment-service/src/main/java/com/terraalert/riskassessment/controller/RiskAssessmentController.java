package com.terraalert.riskassessment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.terraalert.riskassessment.dto.RiskAssessmentRequest;
import com.terraalert.riskassessment.dto.RiskAssessmentResponse;
import com.terraalert.riskassessment.service.RiskAssessmentService;

@RestController
@RequestMapping("/api/risk-assessment")
public class RiskAssessmentController {

    private final RiskAssessmentService riskAssessmentService;

    public RiskAssessmentController(
            RiskAssessmentService riskAssessmentService) {

        this.riskAssessmentService = riskAssessmentService;
    }

    @PostMapping
    public ResponseEntity<RiskAssessmentResponse> assessRisk(
            @Valid @RequestBody RiskAssessmentRequest request) {

        RiskAssessmentResponse response =
                riskAssessmentService.assessRisk(request);

        return ResponseEntity.ok(response);
    }
}