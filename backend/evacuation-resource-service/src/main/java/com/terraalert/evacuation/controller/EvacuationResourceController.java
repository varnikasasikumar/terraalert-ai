package com.terraalert.evacuation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.terraalert.evacuation.dto.EvacuationRequest;
import com.terraalert.evacuation.dto.EvacuationResponse;
import com.terraalert.evacuation.service.EvacuationResourceService;

@RestController
@RequestMapping("/api/evacuation")
public class EvacuationResourceController {

    private final EvacuationResourceService evacuationResourceService;

    public EvacuationResourceController(
            EvacuationResourceService evacuationResourceService) {

        this.evacuationResourceService = evacuationResourceService;
    }

    @PostMapping("/recommend")
    public ResponseEntity<EvacuationResponse> generateRecommendation(
            @Valid @RequestBody EvacuationRequest request) {

        EvacuationResponse response =
                evacuationResourceService
                        .generateEvacuationRecommendation(request);

        return ResponseEntity.ok(response);
    }
}