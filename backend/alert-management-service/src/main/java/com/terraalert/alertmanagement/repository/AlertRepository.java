package com.terraalert.alertmanagement.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.terraalert.alertmanagement.model.Alert;

public interface AlertRepository extends MongoRepository<Alert, String> {

    List<Alert> findByLocation(String location);

    List<Alert> findByStatus(String status);

    List<Alert> findBySeverity(String severity);
}