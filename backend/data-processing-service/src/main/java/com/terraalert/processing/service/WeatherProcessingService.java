package com.terraalert.processing.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.terraalert.processing.dto.DisasterDataRequest;
import com.terraalert.processing.dto.DisasterEventResponse;
import com.terraalert.processing.dto.DisasterEventsResponse;
import com.terraalert.processing.dto.FloodPredictionResponse;
import com.terraalert.processing.dto.LandslidePredictionResponse;
import com.terraalert.processing.dto.RiskAssessmentResponse;
import com.terraalert.processing.dto.WeatherProcessingRequest;
import com.terraalert.processing.dto.WeatherProcessingResponse;
import com.terraalert.processing.dto.GridRadFeatureResponse;
import com.terraalert.processing.model.ProcessedWeatherData;

@Service
public class WeatherProcessingService {

    private final FloodPredictionClient floodPredictionClient;

    private final LandslidePredictionClient landslidePredictionClient;

    private final RiskAssessmentClient riskAssessmentClient;

    private final AlertManagementClient alertManagementClient;

    private final EvacuationResourceClient evacuationResourceClient;

    // =========================================================
    // ACTIVE DISASTER EVENTS
    // =========================================================

    /*
     * Temporary in-memory storage.
     *
     * Key format:
     *
     *     LOCATION + DISASTER TYPE
     *
     * Example:
     *
     *     HOUSTON_FLOOD
     *     SEATTLE_LANDSLIDE
     *
     * This allows the dashboard to retrieve the latest
     * active disaster events through GET /disasters.
     *
     * Later this can be replaced with MongoDB persistence.
     */

    private final Map<String, DisasterEventResponse> activeDisasterEvents =
            new ConcurrentHashMap<>();

    private final GridRadClient gridRadClient;

    public WeatherProcessingService(
            FloodPredictionClient floodPredictionClient,
            LandslidePredictionClient landslidePredictionClient,
            RiskAssessmentClient riskAssessmentClient,
            AlertManagementClient alertManagementClient,
            EvacuationResourceClient evacuationResourceClient,
            GridRadClient gridRadClient) {

        this.floodPredictionClient = floodPredictionClient;
        this.landslidePredictionClient = landslidePredictionClient;
        this.riskAssessmentClient = riskAssessmentClient;
        this.alertManagementClient = alertManagementClient;
        this.evacuationResourceClient = evacuationResourceClient;
        this.gridRadClient = gridRadClient;
    }

    // =========================================================
    // EXISTING WEATHER PROCESSING
    // =========================================================

    public WeatherProcessingResponse processWeatherData(
            WeatherProcessingRequest request) {

        // -----------------------------------------------------
        // 1. Convert incoming request into processed weather data
        // -----------------------------------------------------

        ProcessedWeatherData processedData =
                new ProcessedWeatherData();

        processedData.setLocation(
                request.getLocation()
        );

        processedData.setLatitude(
                request.getLatitude()
        );

        processedData.setLongitude(
                request.getLongitude()
        );

        processedData.setTemperature(
                request.getTemperature()
        );

        processedData.setHumidity(
                request.getHumidity()
        );

        processedData.setRainfall(
                request.getRainfall()
        );

        processedData.setWindSpeed(
                request.getWindSpeed()
        );

        processedData.setPressure(
                request.getPressure()
        );

        processedData.setSoilMoisture(
                request.getSoilMoisture()
        );

        processedData.setElevation(
                request.getElevation()
        );

        processedData.setPredictionTarget(
                request.getPredictionTarget()
        );

        calculateLandslideFeatures(request, processedData);

        String target = request.getPredictionTarget() != null ? request.getPredictionTarget().toUpperCase() : null;

        // -----------------------------------------------------
        // Radar features (GridRad integration)
        // -----------------------------------------------------

        if (target == null || "FLOOD".equals(target)) {
            try {
                // Retrieve real-time radar proxy data from GridRad extraction service
                String timestamp = request.getObservedAt() != null ? request.getObservedAt().toString() : "2017-08-26T11:00:00Z";
                System.out.println("Fetching GridRad features for: " + request.getLatitude() + ", " + request.getLongitude() + " at " + timestamp);
                
                GridRadFeatureResponse radarFeatures = gridRadClient.extractRadarFeatures(
                        request.getLatitude(),
                        request.getLongitude(),
                        timestamp
                );

                processedData.setReflectivityMean(radarFeatures.getReflectivityMean());
                processedData.setReflectivityMax(radarFeatures.getReflectivityMax());
                processedData.setReflectivityMin(radarFeatures.getReflectivityMin());
                processedData.setReflectivityStd(radarFeatures.getReflectivityStd());
                processedData.setReflectivityMedian(radarFeatures.getReflectivityMedian());
                processedData.setReflectivityGe20Pct(radarFeatures.getReflectivityGe20Pct());
                processedData.setReflectivityGe30Pct(radarFeatures.getReflectivityGe30Pct());
                processedData.setReflectivityGe40Pct(radarFeatures.getReflectivityGe40Pct());
                processedData.setRadarObservationCount(radarFeatures.getRadarObservationCount());

            } catch (Exception e) {
                System.err.println("GridRad extraction failed: " + e.getMessage());
            }
        }

        processedData.setObservedAt(
                request.getObservedAt()
        );

        processedData.setSource(
                request.getSource()
        );

        // -----------------------------------------------------
        // 2. Flood prediction
        // -----------------------------------------------------

        FloodPredictionResponse floodResponse = null;
        if (target == null || "FLOOD".equals(target)) {
            try {
                floodResponse = floodPredictionClient.predictFlood(processedData);
                System.out.println("Flood Prediction Response: " + floodResponse.getFloodProbability());
            } catch (Exception e) {
                System.err.println("Flood Prediction failed: " + e.getMessage());
            }
        }

        // -----------------------------------------------------
        // 3. Landslide prediction
        // -----------------------------------------------------

        LandslidePredictionResponse landslideResponse = null;
        if (target == null || "LANDSLIDE".equals(target)) {
            try {
                landslideResponse = landslidePredictionClient.predictLandslide(processedData);
                System.out.println("Landslide Prediction Response: " + landslideResponse.getLandslideProbability());
            } catch (Exception e) {
                System.err.println("Landslide Prediction failed: " + e.getMessage());
            }
        }

        // -----------------------------------------------------
        // 4. Combined risk assessment
        // -----------------------------------------------------

        RiskAssessmentResponse riskResponse = null;
        try {
            riskResponse = riskAssessmentClient.assessRisk(
                    processedData,
                    floodResponse != null ? floodResponse.getFloodProbability() : null,
                    landslideResponse != null ? landslideResponse.getLandslideProbability() : null
            );
            System.out.println("Risk Assessment Response: " + riskResponse.getOverallRisk());
        } catch (Exception e) {
            System.err.println("Risk Assessment failed: " + e.getMessage());
            // Create dummy risk response so the rest of the flow doesn't crash
            riskResponse = new RiskAssessmentResponse();
            riskResponse.setLocation(processedData.getLocation());
            riskResponse.setLatitude(processedData.getLatitude());
            riskResponse.setLongitude(processedData.getLongitude());
            riskResponse.setFloodRisk("UNKNOWN");
            riskResponse.setLandslideRisk("UNKNOWN");
            riskResponse.setOverallRisk("UNKNOWN");
            riskResponse.setAssessedAt(LocalDateTime.now());
        }

        // -----------------------------------------------------
        // 5. Create disaster events
        // -----------------------------------------------------

        DisasterEventResponse floodEvent = null;
        if (target == null || "FLOOD".equals(target)) {
            floodEvent = createDisasterEvent(
                    processedData,
                    "FLOOD",
                    floodResponse != null ? floodResponse.getFloodProbability() : null,
                    riskResponse.getFloodRisk(),
                    riskResponse.getOverallRisk()
            );
        }

        DisasterEventResponse landslideEvent = null;
        if (target == null || "LANDSLIDE".equals(target)) {
            landslideEvent = createDisasterEvent(
                    processedData,
                    "LANDSLIDE",
                    landslideResponse != null ? landslideResponse.getLandslideProbability() : null,
                    riskResponse.getLandslideRisk(),
                    riskResponse.getOverallRisk()
            );
        }

        // -----------------------------------------------------
        // 6. Print disaster events
        // -----------------------------------------------------

        if (floodEvent != null) {

            System.out.println(
                    "Flood Disaster Event: "
                            + floodEvent.getLocation()
                            + " | "
                            + floodEvent.getDisasterType()
                            + " | "
                            + floodEvent.getProbability()
                            + " | "
                            + floodEvent.getRiskLevel()
            );
        }

        if (landslideEvent != null) {

            System.out.println(
                    "Landslide Disaster Event: "
                            + landslideEvent.getLocation()
                            + " | "
                            + landslideEvent.getDisasterType()
                            + " | "
                            + landslideEvent.getProbability()
                            + " | "
                            + landslideEvent.getRiskLevel()
            );
        }

        // -----------------------------------------------------
        // 7. Create alert
        // -----------------------------------------------------

        try {
            String alertResponse = alertManagementClient.createAlert(processedData, riskResponse);
            System.out.println("Alert Management Response: " + alertResponse);
        } catch (Exception e) {
            System.err.println("Alert Management failed: " + e.getMessage());
        }

        // -----------------------------------------------------
        // 8. Generate evacuation recommendation
        // -----------------------------------------------------

        try {
            String evacuationResponse = evacuationResourceClient.generateRecommendation(processedData, riskResponse);
            System.out.println("Evacuation Resource Response: " + evacuationResponse);
        } catch (Exception e) {
            System.err.println("Evacuation Resource failed: " + e.getMessage());
        }

        // -----------------------------------------------------
        // 9. Return existing weather processing response
        // -----------------------------------------------------

        return new WeatherProcessingResponse(
                processedData.getLocation(),
                processedData.getLatitude(),
                processedData.getLongitude(),
                riskResponse.getFloodProbability(),
                riskResponse.getLandslideProbability(),
                riskResponse.getFloodRisk(),
                riskResponse.getLandslideRisk(),
                riskResponse.getOverallRisk(),
                riskResponse.getAssessedAt()
        );
    }

    // =========================================================
    // CREATE DISASTER EVENT
    // =========================================================

    private DisasterEventResponse createDisasterEvent(
            ProcessedWeatherData data,
            String disasterType,
            Double probability,
            String riskLevel,
            String overallRisk) {

        String eventKey =
                data.getLocation().trim().toUpperCase()
                        + "_"
                        + disasterType.toUpperCase();

        DisasterEventResponse event =
                new DisasterEventResponse(

                        // -------------------------------------------------
                        // Disaster information
                        // -------------------------------------------------

                        data.getLocation(),
                        data.getLatitude(),
                        data.getLongitude(),
                        disasterType,
                        probability,
                        riskLevel,
                        overallRisk,
                        "ACTIVE",
                        LocalDateTime.now(),

                            // -------------------------------------------------
                            // Environmental evidence
                            // -------------------------------------------------

                            data.getTemperature() != null ? data.getTemperature() : 0.0,
                            data.getHumidity() != null ? data.getHumidity() : 0.0,
                            data.getRainfall() != null ? data.getRainfall() : 0.0,
                            data.getWindSpeed() != null ? data.getWindSpeed() : 0.0,
                            data.getPressure() != null ? data.getPressure() : 0.0,
                            data.getSoilMoisture() != null ? data.getSoilMoisture() : 0.0,
                            data.getElevation() != null ? data.getElevation() : 0.0,

                         // -------------------------------------------------
                         // Landslide evidence
                         // -------------------------------------------------

                         data.getRainfall1d() != null ? data.getRainfall1d() : 0.0,
                         data.getRainfall3d() != null ? data.getRainfall3d() : 0.0,
                         data.getRainfall7d() != null ? data.getRainfall7d() : 0.0,
                         data.getRainfall15d() != null ? data.getRainfall15d() : 0.0,
                         data.getRainfall32d() != null ? data.getRainfall32d() : 0.0,

                         data.getTemperatureMax() != null ? data.getTemperatureMax() : 0.0,
                         data.getTemperatureMin() != null ? data.getTemperatureMin() : 0.0,

                         data.getSlope() != null ? data.getSlope() : 0.0,
                         data.getAspect() != null ? data.getAspect() : 0.0,

                         // -------------------------------------------------
                         // Radar evidence
                         // -------------------------------------------------

                         data.getReflectivityMean() != null ? data.getReflectivityMean() : 0.0,
                            data.getReflectivityMax() != null ? data.getReflectivityMax() : 0.0,
                            data.getReflectivityMin() != null ? data.getReflectivityMin() : 0.0,
                            data.getReflectivityStd() != null ? data.getReflectivityStd() : 0.0,
                            data.getReflectivityMedian() != null ? data.getReflectivityMedian() : 0.0,

                            data.getReflectivityGe20Pct() != null ? data.getReflectivityGe20Pct() : 0.0,
                            data.getReflectivityGe30Pct() != null ? data.getReflectivityGe30Pct() : 0.0,
                            data.getReflectivityGe40Pct() != null ? data.getReflectivityGe40Pct() : 0.0,

                            data.getRadarObservationCount() != null ? data.getRadarObservationCount() : 0,

                            // -------------------------------------------------
                            // Observation information
                            // -------------------------------------------------

                            data.getObservedAt() != null
                                    ? data.getObservedAt().toString()
                                    : null,

                            data.getSource()
                    );

        // =====================================================
        // STORE / UPDATE ACTIVE EVENT
        // =====================================================

        activeDisasterEvents.put(
                eventKey,
                event
        );

        String otherDisasterType = disasterType.equals("FLOOD") ? "LANDSLIDE" : "FLOOD";
        String otherEventKey = data.getLocation().trim().toUpperCase() + "_" + otherDisasterType;
        DisasterEventResponse otherEvent = activeDisasterEvents.get(otherEventKey);
        if (otherEvent != null) {
            otherEvent.setOverallRisk(overallRisk);
        }

        return event;
    }

    // =========================================================
    // SINGLE DISASTER PROCESSING
    // =========================================================

    public DisasterEventResponse processDisasterData(
            DisasterDataRequest request) {

        // -----------------------------------------------------
        // 1. Validate disaster type
        // -----------------------------------------------------

        if (request == null) {
            throw new IllegalArgumentException(
                    "Disaster request cannot be null"
            );
        }

        if (request.getDisasterType() == null
                || request.getDisasterType().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Disaster type cannot be null or empty"
            );
        }

        String disasterType =
                request.getDisasterType()
                        .trim()
                        .toUpperCase();

        // -----------------------------------------------------
        // 2. Validate weather data
        // -----------------------------------------------------

        if (request.getWeatherData() == null) {

            throw new IllegalArgumentException(
                    "Weather data cannot be null"
            );
        }

        // -----------------------------------------------------
        // 3. Process weather data
        // -----------------------------------------------------

        ProcessedWeatherData processedData =
                new ProcessedWeatherData();

        processedData.setLocation(
                request.getLocation()
        );

        processedData.setLatitude(
                request.getLatitude()
        );

        processedData.setLongitude(
                request.getLongitude()
        );

        WeatherProcessingRequest weatherData =
                request.getWeatherData();

        processedData.setTemperature(
                weatherData.getTemperature()
        );

        processedData.setHumidity(
                weatherData.getHumidity()
        );

        processedData.setRainfall(
                weatherData.getRainfall()
        );

        processedData.setWindSpeed(
                weatherData.getWindSpeed()
        );

        processedData.setPressure(
                weatherData.getPressure()
        );

        processedData.setSoilMoisture(
                weatherData.getSoilMoisture()
        );

        processedData.setElevation(
                weatherData.getElevation()
        );
        
     processedData.setAspect(
             weatherData.getAspect()
     );
     
     calculateLandslideFeatures(weatherData, processedData);

        // -----------------------------------------------------
        // Radar features (GridRad integration)
        // -----------------------------------------------------

        try {
            // Retrieve real-time radar proxy data from GridRad extraction service
            String timestamp = weatherData.getObservedAt() != null ? weatherData.getObservedAt().toString() : "2017-08-26T11:00:00Z";
            System.out.println("Fetching GridRad features for: " + request.getLatitude() + ", " + request.getLongitude() + " at " + timestamp);
            
            GridRadFeatureResponse radarFeatures = gridRadClient.extractRadarFeatures(
                    request.getLatitude(),
                    request.getLongitude(),
                    timestamp
            );

            processedData.setReflectivityMean(radarFeatures.getReflectivityMean());
            processedData.setReflectivityMax(radarFeatures.getReflectivityMax());
            processedData.setReflectivityMin(radarFeatures.getReflectivityMin());
            processedData.setReflectivityStd(radarFeatures.getReflectivityStd());
            processedData.setReflectivityMedian(radarFeatures.getReflectivityMedian());
            processedData.setReflectivityGe20Pct(radarFeatures.getReflectivityGe20Pct());
            processedData.setReflectivityGe30Pct(radarFeatures.getReflectivityGe30Pct());
            processedData.setReflectivityGe40Pct(radarFeatures.getReflectivityGe40Pct());
            processedData.setRadarObservationCount(radarFeatures.getRadarObservationCount());

        } catch (Exception e) {
            System.err.println("GridRad extraction failed: " + e.getMessage());
            // Important: We do NOT fill with 0s if it fails, we will let it pass as nulls 
            // to fail the Flood Prediction properly or we could skip Flood prediction entirely.
        }

        processedData.setObservedAt(
                weatherData.getObservedAt()
        );

        processedData.setSource(
                weatherData.getSource()
        );

        // -----------------------------------------------------
        // 4. FLOOD
        // -----------------------------------------------------

        if ("FLOOD".equals(disasterType)) {

            FloodPredictionResponse floodResponse = null;
            try {
                floodResponse = floodPredictionClient.predictFlood(processedData);
            } catch (Exception e) {}



            Double existingLandslideProb = null;
            String landslideKey = processedData.getLocation().trim().toUpperCase() + "_LANDSLIDE";
            DisasterEventResponse existingLandslide = activeDisasterEvents.get(landslideKey);
            if (existingLandslide != null) {
                existingLandslideProb = existingLandslide.getProbability();
            }

            RiskAssessmentResponse riskResponse = riskAssessmentClient.assessRisk(
                    processedData,
                    floodResponse != null ? floodResponse.getFloodProbability() : null,
                    existingLandslideProb
            );

            return createDisasterEvent(
                    processedData,
                    "FLOOD",
                    riskResponse.getFloodProbability(),
                    riskResponse.getFloodRisk(),
                    riskResponse.getOverallRisk()
            );
        }

        // -----------------------------------------------------
        // 5. LANDSLIDE
        // -----------------------------------------------------

        if ("LANDSLIDE".equals(disasterType)) {

            LandslidePredictionResponse landslideResponse = null;
            try {
                landslideResponse = landslidePredictionClient.predictLandslide(processedData);
            } catch (Exception e) {}


            Double existingFloodProb = null;
            String floodKey = processedData.getLocation().trim().toUpperCase() + "_FLOOD";
            DisasterEventResponse existingFlood = activeDisasterEvents.get(floodKey);
            if (existingFlood != null) {
                existingFloodProb = existingFlood.getProbability();
            }

            RiskAssessmentResponse riskResponse = riskAssessmentClient.assessRisk(
                    processedData,
                    existingFloodProb,
                    landslideResponse != null ? landslideResponse.getLandslideProbability() : null
            );

            return createDisasterEvent(
                    processedData,
                    "LANDSLIDE",
                    riskResponse.getLandslideProbability(),
                    riskResponse.getLandslideRisk(),
                    riskResponse.getOverallRisk()
            );
        }

        // -----------------------------------------------------
        // 6. Unsupported disaster type
        // -----------------------------------------------------

        throw new IllegalArgumentException(
                "Unsupported disaster type: "
                        + request.getDisasterType()
        );
    }

    // =========================================================
    // GET CURRENT ACTIVE DISASTER EVENTS
    // =========================================================

    public DisasterEventsResponse getActiveDisasterEvents() {

        /*
         * Convert the current active-event map into a list.
         *
         * The dashboard will receive only currently active
         * HIGH / CRITICAL disaster events.
         */

        List<DisasterEventResponse> events =
                new ArrayList<>(
                        activeDisasterEvents.values()
                );

        return new DisasterEventsResponse(
                events
        );
    }

    // Removed manual getRiskLevel because RiskAssessmentService is the single source of truth

    // =========================================================
    // FEATURE ENGINEERING
    // =========================================================

    private void calculateLandslideFeatures(WeatherProcessingRequest weatherData, ProcessedWeatherData processedData) {
        if (weatherData.getDailyDates() == null || weatherData.getPast32DaysRainfall() == null) {
            System.err.println(">>> Missing daily weather arrays. Cannot calculate landslide features.");
            return;
        }

        List<String> dates = weatherData.getDailyDates();
        List<Double> rainfall = weatherData.getPast32DaysRainfall();
        List<Double> tmax = weatherData.getDailyTemperatureMax();
        List<Double> tmin = weatherData.getDailyTemperatureMin();

        // Find target date index from observation timestamp
        String targetDateStr = weatherData.getObservedAt() != null
                ? weatherData.getObservedAt().toLocalDate().toString()
                : java.time.LocalDate.now().toString();
        int targetIndex = -1;
        for (int i = 0; i < dates.size(); i++) {
            if (dates.get(i).equals(targetDateStr)) {
                targetIndex = i;
                break;
            }
        }

        if (targetIndex == -1) {
            System.err.println(">>> Target observation date " + targetDateStr + " not found in dailyDates array. Falling back to latest daily index.");
            targetIndex = dates.size() - 1;
        }

        if (targetIndex != -1) {
            processedData.setTemperatureMax(tmax != null && targetIndex < tmax.size() ? tmax.get(targetIndex) : null);
            processedData.setTemperatureMin(tmin != null && targetIndex < tmin.size() ? tmin.get(targetIndex) : null);

            processedData.setRainfall1d(accumulateRainfall(targetIndex, 1, rainfall));
            processedData.setRainfall3d(accumulateRainfall(targetIndex, 3, rainfall));
            processedData.setRainfall7d(accumulateRainfall(targetIndex, 7, rainfall));
            processedData.setRainfall15d(accumulateRainfall(targetIndex, 15, rainfall));
            processedData.setRainfall32d(accumulateRainfall(targetIndex, 32, rainfall));

            System.out.println("=== LANDSLIDE FEATURES ===");
            System.out.println("Target Date Index: " + targetIndex + " (" + dates.get(targetIndex) + ")");
            System.out.println("Rainfall 1d: " + processedData.getRainfall1d());
            System.out.println("Rainfall 3d: " + processedData.getRainfall3d());
            System.out.println("Rainfall 7d: " + processedData.getRainfall7d());
            System.out.println("Rainfall 15d: " + processedData.getRainfall15d());
            System.out.println("Rainfall 32d: " + processedData.getRainfall32d());
            System.out.println("==========================");
        }
    }

    private Double accumulateRainfall(int targetIndex, int days, List<Double> rainfall) {
        double sum = 0.0;
        int validDays = 0;
        for (int offset = 0; offset < days; offset++) {
            int i = targetIndex - offset;
            if (i >= 0 && i < rainfall.size() && rainfall.get(i) != null) {
                sum += rainfall.get(i);
                validDays++;
            }
        }
        return sum;
    }
}