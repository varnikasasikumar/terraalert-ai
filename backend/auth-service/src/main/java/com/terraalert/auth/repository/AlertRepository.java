package com.terraalert.auth.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.terraalert.auth.model.Alert;

public interface AlertRepository extends MongoRepository<Alert, String> {
}