package com.terraalert.processing.service;

import org.springframework.stereotype.Service;

import com.terraalert.processing.dto.FloodPredictionResponse;
import com.terraalert.processing.dto.LandslidePredictionResponse;
import com.terraalert.processing.dto.RiskAssessmentResponse;
import com.terraalert.processing.dto.WeatherProcessingRequest;
import com.terraalert.processing.model.ProcessedWeatherData;

@Service
public class WeatherProcessingService {

	private final FloodPredictionClient floodPredictionClient;
	private final LandslidePredictionClient landslidePredictionClient;
	private final RiskAssessmentClient riskAssessmentClient;
	private final AlertManagementClient alertManagementClient;
	private final EvacuationResourceClient evacuationResourceClient;
	
	public WeatherProcessingService(
	        FloodPredictionClient floodPredictionClient,
	        LandslidePredictionClient landslidePredictionClient,
	        RiskAssessmentClient riskAssessmentClient,
	        AlertManagementClient alertManagementClient,
	        EvacuationResourceClient evacuationResourceClient) {

	    this.floodPredictionClient = floodPredictionClient;
	    this.landslidePredictionClient = landslidePredictionClient;
	    this.riskAssessmentClient = riskAssessmentClient;
	    this.alertManagementClient = alertManagementClient;
	    this.evacuationResourceClient = evacuationResourceClient;
	}

    public ProcessedWeatherData processWeatherData(
            WeatherProcessingRequest request) {

        ProcessedWeatherData processedData =
                new ProcessedWeatherData();

        processedData.setLocation(request.getLocation());

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
        
        processedData.setReflectivityMean(
                request.getReflectivityMean()
        );

        processedData.setReflectivityMax(
                request.getReflectivityMax()
        );

        processedData.setReflectivityMin(
                request.getReflectivityMin()
        );

        processedData.setReflectivityStd(
                request.getReflectivityStd()
        );

        processedData.setReflectivityMedian(
                request.getReflectivityMedian()
        );

        processedData.setReflectivityGe20Pct(
                request.getReflectivityGe20Pct()
        );

        processedData.setReflectivityGe30Pct(
                request.getReflectivityGe30Pct()
        );

        processedData.setReflectivityGe40Pct(
                request.getReflectivityGe40Pct()
        );

        processedData.setRadarObservationCount(
                request.getRadarObservationCount()
        );

        processedData.setObservedAt(
                request.getObservedAt()
        );

        processedData.setSource(
                request.getSource()
        );

        FloodPredictionResponse floodResponse =
                floodPredictionClient.predictFlood(processedData);

        System.out.println(
                "Flood Prediction Response: "
                + floodResponse.getFloodProbability()
        );

        LandslidePredictionResponse landslideResponse =
                landslidePredictionClient.predictLandslide(processedData);

        System.out.println(
                "Landslide Prediction Response: "
                + landslideResponse.getLandslideProbability()
        );

        RiskAssessmentResponse riskResponse =
                riskAssessmentClient.assessRisk(
                        processedData,
                        floodResponse.getFloodProbability(),
                        landslideResponse.getLandslideProbability()
                );

        System.out.println(
                "Risk Assessment Response: "
                + riskResponse.getOverallRisk()
        );

        String alertResponse =
                alertManagementClient.createAlert(
                        processedData,
                        riskResponse
                );

        System.out.println(
                "Alert Management Response: "
                + alertResponse
        );
        
        String evacuationResponse =
                evacuationResourceClient.generateRecommendation(
                        processedData,
                        riskResponse
                );

        System.out.println(
                "Evacuation Resource Response: "
                + evacuationResponse
        );

        return processedData;
    }
}