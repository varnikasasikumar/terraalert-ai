package com.terraalert.evacuation.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.terraalert.evacuation.model.Shelter;

public interface ShelterRepository extends MongoRepository<Shelter, String> {

    List<Shelter> findByLocation(String location);

    List<Shelter> findByStatus(String status);
}