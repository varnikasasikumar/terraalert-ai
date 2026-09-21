package com.terraalert.auth.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.terraalert.auth.model.SystemSettings;

@Repository
public interface SystemSettingsRepository extends MongoRepository<SystemSettings, String> {
}
