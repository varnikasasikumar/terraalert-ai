package com.terraalert.evacuation.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.terraalert.evacuation.model.Resource;

public interface ResourceRepository extends MongoRepository<Resource, String> {

    List<Resource> findByLocation(String location);

    List<Resource> findByType(String type);

    List<Resource> findByStatus(String status);
}