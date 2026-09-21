package com.terraalert.evacuation.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.terraalert.evacuation.model.Shelter;
import com.terraalert.evacuation.repository.ShelterRepository;

@RestController
@RequestMapping("/api/shelters")
public class ShelterController {

    private final ShelterRepository shelterRepository;

    public ShelterController(ShelterRepository shelterRepository) {
        this.shelterRepository = shelterRepository;
    }

    // CREATE SHELTER
    @PostMapping
    public ResponseEntity<Shelter> createShelter(
            @RequestBody Shelter shelter) {

        Shelter savedShelter =
                shelterRepository.save(shelter);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedShelter);
    }

    // GET ALL SHELTERS
    @GetMapping
    public ResponseEntity<List<Shelter>> getAllShelters() {

        return ResponseEntity.ok(
                shelterRepository.findAll()
        );
    }

    // GET SHELTER BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Shelter> getShelterById(
            @PathVariable String id) {

        return shelterRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // GET SHELTERS BY LOCATION
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Shelter>> getByLocation(
            @PathVariable String location) {

        return ResponseEntity.ok(
                shelterRepository.findByLocation(location)
        );
    }

    // GET SHELTERS BY STATUS
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Shelter>> getByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                shelterRepository.findByStatus(status)
        );
    }

    // DELETE SHELTER
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShelter(
            @PathVariable String id) {

        if (!shelterRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        shelterRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}