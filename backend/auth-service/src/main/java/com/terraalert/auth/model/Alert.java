package com.terraalert.auth.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "alerts")
public class Alert {

    @Id
    private String id;

    private String type;
    private String area;
    private String severity;
    private String source;

    private LocalDateTime issuedAt;

    private String status;

    private int affectedPopulation;

    private String recommendedAction;

    private LocalDateTime validUntil;

    public Alert() {
    }

    public Alert(
            String id,
            String type,
            String area,
            String severity,
            String source,
            LocalDateTime issuedAt,
            String status,
            int affectedPopulation,
            String recommendedAction,
            LocalDateTime validUntil) {

        this.id = id;
        this.type = type;
        this.area = area;
        this.severity = severity;
        this.source = source;
        this.issuedAt = issuedAt;
        this.status = status;
        this.affectedPopulation = affectedPopulation;
        this.recommendedAction = recommendedAction;
        this.validUntil = validUntil;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public LocalDateTime getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(LocalDateTime issuedAt) {
        this.issuedAt = issuedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getAffectedPopulation() {
        return affectedPopulation;
    }

    public void setAffectedPopulation(int affectedPopulation) {
        this.affectedPopulation = affectedPopulation;
    }

    public String getRecommendedAction() {
        return recommendedAction;
    }

    public void setRecommendedAction(String recommendedAction) {
        this.recommendedAction = recommendedAction;
    }

    public LocalDateTime getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(LocalDateTime validUntil) {
        this.validUntil = validUntil;
    }
}