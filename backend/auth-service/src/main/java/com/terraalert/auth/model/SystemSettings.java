package com.terraalert.auth.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "system_settings")
public class SystemSettings {

    @Id
    private String id;

    private String systemName;
    private String defaultDistrict;
    private String timezone;
    private String dateFormat;
    private String timeFormat;
    private String language;
    private LocalDateTime updatedAt;

    // Default constructor
    public SystemSettings() {
    }

    // Parameterized constructor
    public SystemSettings(String id, String systemName, String defaultDistrict,
                          String timezone, String dateFormat, String timeFormat,
                          String language, LocalDateTime updatedAt) {
        this.id = id;
        this.systemName = systemName;
        this.defaultDistrict = defaultDistrict;
        this.timezone = timezone;
        this.dateFormat = dateFormat;
        this.timeFormat = timeFormat;
        this.language = language;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSystemName() {
        return systemName;
    }

    public void setSystemName(String systemName) {
        this.systemName = systemName;
    }

    public String getDefaultDistrict() {
        return defaultDistrict;
    }

    public void setDefaultDistrict(String defaultDistrict) {
        this.defaultDistrict = defaultDistrict;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public String getDateFormat() {
        return dateFormat;
    }

    public void setDateFormat(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    public String getTimeFormat() {
        return timeFormat;
    }

    public void setTimeFormat(String timeFormat) {
        this.timeFormat = timeFormat;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
