package com.terraalert.ingestion.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OpenMeteoResponse {

    private CurrentWeather current;

    private DailyWeather daily;
    
    private HourlyWeather hourly;

    public OpenMeteoResponse() {
    }

    public CurrentWeather getCurrent() {
        return current;
    }

    public void setCurrent(CurrentWeather current) {
        this.current = current;
    }

    public DailyWeather getDaily() {
        return daily;
    }

    public void setDaily(DailyWeather daily) {
        this.daily = daily;
    }
    
    public HourlyWeather getHourly() {
        return hourly;
    }

    public void setHourly(HourlyWeather hourly) {
        this.hourly = hourly;
    }

    public static class DailyWeather {
        private java.util.List<String> time;

        @JsonProperty("precipitation_sum")
        private java.util.List<Double> precipitationSum;

        @JsonProperty("temperature_2m_max")
        private java.util.List<Double> temperature2mMax;

        @JsonProperty("temperature_2m_min")
        private java.util.List<Double> temperature2mMin;

        public DailyWeather() {
        }

        public java.util.List<String> getTime() {
            return time;
        }

        public void setTime(java.util.List<String> time) {
            this.time = time;
        }

        public java.util.List<Double> getPrecipitationSum() {
            return precipitationSum;
        }

        public void setPrecipitationSum(java.util.List<Double> precipitationSum) {
            this.precipitationSum = precipitationSum;
        }

        public java.util.List<Double> getTemperature2mMax() {
            return temperature2mMax;
        }

        public void setTemperature2mMax(java.util.List<Double> temperature2mMax) {
            this.temperature2mMax = temperature2mMax;
        }

        public java.util.List<Double> getTemperature2mMin() {
            return temperature2mMin;
        }

        public void setTemperature2mMin(java.util.List<Double> temperature2mMin) {
            this.temperature2mMin = temperature2mMin;
        }
    }
    
    public static class HourlyWeather {

        private java.util.List<String> time;

        @JsonProperty("temperature_2m")
        private java.util.List<Double> temperature;

        @JsonProperty("relative_humidity_2m")
        private java.util.List<Double> humidity;

        private java.util.List<Double> precipitation;

        @JsonProperty("surface_pressure")
        private java.util.List<Double> pressure;

        @JsonProperty("wind_speed_10m")
        private java.util.List<Double> windSpeed;

        @JsonProperty("soil_moisture_0_to_7cm")
        private java.util.List<Double> soilMoisture;

        public HourlyWeather() {
        }

        public java.util.List<String> getTime() {
            return time;
        }

        public void setTime(java.util.List<String> time) {
            this.time = time;
        }

        public java.util.List<Double> getTemperature() {
            return temperature;
        }

        public void setTemperature(java.util.List<Double> temperature) {
            this.temperature = temperature;
        }

        public java.util.List<Double> getHumidity() {
            return humidity;
        }

        public void setHumidity(java.util.List<Double> humidity) {
            this.humidity = humidity;
        }

        public java.util.List<Double> getPrecipitation() {
            return precipitation;
        }

        public void setPrecipitation(java.util.List<Double> precipitation) {
            this.precipitation = precipitation;
        }

        public java.util.List<Double> getPressure() {
            return pressure;
        }

        public void setPressure(java.util.List<Double> pressure) {
            this.pressure = pressure;
        }

        public java.util.List<Double> getWindSpeed() {
            return windSpeed;
        }

        public void setWindSpeed(java.util.List<Double> windSpeed) {
            this.windSpeed = windSpeed;
        }

        public java.util.List<Double> getSoilMoisture() {
            return soilMoisture;
        }

        public void setSoilMoisture(java.util.List<Double> soilMoisture) {
            this.soilMoisture = soilMoisture;
        }
    }

    public static class CurrentWeather {

        @JsonProperty("temperature_2m")
        private double temperature;

        @JsonProperty("relative_humidity_2m")
        private double humidity;

        private double precipitation;

        @JsonProperty("surface_pressure")
        private double pressure;

        @JsonProperty("wind_speed_10m")
        private double windSpeed;

        @JsonProperty("soil_moisture_0_to_7cm")
        private Double soilMoisture;

        private String time;

        public CurrentWeather() {
        }

        public double getTemperature() {
            return temperature;
        }

        public void setTemperature(double temperature) {
            this.temperature = temperature;
        }

        public double getHumidity() {
            return humidity;
        }

        public void setHumidity(double humidity) {
            this.humidity = humidity;
        }

        public double getPrecipitation() {
            return precipitation;
        }

        public void setPrecipitation(double precipitation) {
            this.precipitation = precipitation;
        }

        public double getPressure() {
            return pressure;
        }

        public void setPressure(double pressure) {
            this.pressure = pressure;
        }

        public double getWindSpeed() {
            return windSpeed;
        }

        public void setWindSpeed(double windSpeed) {
            this.windSpeed = windSpeed;
        }

        public Double getSoilMoisture() {
            return soilMoisture;
        }

        public void setSoilMoisture(Double soilMoisture) {
            this.soilMoisture = soilMoisture;
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }
    }
}