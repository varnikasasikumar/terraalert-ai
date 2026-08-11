package com.terraalert.evacuation.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.terraalert.evacuation.model.Resource;
import com.terraalert.evacuation.repository.ResourceRepository;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceRepository resourceRepository;

    public ResourceController(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    // CREATE RESOURCE
    @PostMapping
    public ResponseEntity<Resource> createResource(
            @RequestBody Resource resource) {

        Resource savedResource =
                resourceRepository.save(resource);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedResource);
    }

    // GET ALL RESOURCES
    @GetMapping
    public ResponseEntity<List<Resource>> getAllResources() {

        return ResponseEntity.ok(
                resourceRepository.findAll()
        );
    }

    // GET RESOURCE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(
            @PathVariable String id) {

        return resourceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // GET RESOURCES BY LOCATION
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Resource>> getByLocation(
            @PathVariable String location) {

        return ResponseEntity.ok(
                resourceRepository.findByLocation(location)
        );
    }

    // GET RESOURCES BY TYPE
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Resource>> getByType(
            @PathVariable String type) {

        return ResponseEntity.ok(
                resourceRepository.findByType(type)
        );
    }

    // GET RESOURCES BY STATUS
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Resource>> getByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                resourceRepository.findByStatus(status)
        );
    }

    // DELETE RESOURCE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(
            @PathVariable String id) {

        if (!resourceRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        resourceRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}