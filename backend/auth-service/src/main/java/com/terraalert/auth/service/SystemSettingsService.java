package com.terraalert.auth.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.terraalert.auth.model.SystemSettings;
import com.terraalert.auth.repository.SystemSettingsRepository;

@Service
public class SystemSettingsService {

    private final SystemSettingsRepository repository;

    public SystemSettingsService(SystemSettingsRepository repository) {
        this.repository = repository;
    }

    // =========================================================
    // GET SYSTEM SETTINGS (SINGLETON)
    // =========================================================

    public SystemSettings getSettings() {
        List<SystemSettings> allSettings = repository.findAll();

        if (!allSettings.isEmpty()) {
            return allSettings.get(0);
        }

        // Initialize default settings if none exist
        SystemSettings defaultSettings = new SystemSettings();
        defaultSettings.setSystemName("AI Powered Disaster Management");
        defaultSettings.setDefaultDistrict("Harris County, Texas");
        defaultSettings.setTimezone("IST (UTC+5:30) Asia/Kolkata");
        defaultSettings.setDateFormat("DD-MM-YYYY");
        defaultSettings.setTimeFormat("12 Hour");
        defaultSettings.setLanguage("English");
        defaultSettings.setUpdatedAt(LocalDateTime.now());

        return repository.save(defaultSettings);
    }

    // =========================================================
    // UPDATE SYSTEM SETTINGS
    // =========================================================

    public SystemSettings updateSettings(SystemSettings incomingSettings) {
        SystemSettings existing = getSettings();

        if (incomingSettings.getSystemName() != null) {
            existing.setSystemName(incomingSettings.getSystemName());
        }
        if (incomingSettings.getDefaultDistrict() != null) {
            existing.setDefaultDistrict(incomingSettings.getDefaultDistrict());
        }
        if (incomingSettings.getTimezone() != null) {
            existing.setTimezone(incomingSettings.getTimezone());
        }
        if (incomingSettings.getDateFormat() != null) {
            existing.setDateFormat(incomingSettings.getDateFormat());
        }
        if (incomingSettings.getTimeFormat() != null) {
            existing.setTimeFormat(incomingSettings.getTimeFormat());
        }
        if (incomingSettings.getLanguage() != null) {
            existing.setLanguage(incomingSettings.getLanguage());
        }

        existing.setUpdatedAt(LocalDateTime.now());

        return repository.save(existing);
    }
}
