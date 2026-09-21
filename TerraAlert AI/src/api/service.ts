// ============================================================
// TERRALERT AI - API SERVICE
// ============================================================

// ============================================================
// DATA TYPES
// ============================================================

export interface VillageData {
  id: string;
  name: string;
  district: string;

  riskIndex: number;
  floodRisk: number;
  landslideRisk: number;

  overallRisk: "Critical" | "High" | "Moderate" | "Low";

  population: number;
  aiPriorityScore: number;

  rescueTeams: number;
  boats: number;
  ambulances: number;
  foodKits: number;

  coordinates: [number, number];
}

// ============================================================
// WEATHER
// ============================================================

export interface WeatherData {
  rainfall24h: number;
  rainfallStatus: "Heavy" | "Moderate" | "Light" | "Very High";

  riverLevel: number;
  riverStatus: "Danger" | "Warning" | "Normal";

  soilMoisture: number;
  soilMoistureStatus: "High" | "Very High" | "Normal";

  temperature: number;
  humidity: number;
  windSpeed: number;

  terrainSlope: number;
  landUseChange: number;
}

// ============================================================
// ALERTS
// ============================================================

export interface AlertItem {
  id: string;

  type:
    | "Flood Warning"
    | "Landslide Warning"
    | "Heavy Rain Alert"
    | "Dam Overflow Alert";

  area: string;

  severity: "High" | "Medium" | "Low";

  source: "AI Model" | "IMD" | "Sensors";

  issuedAt: string | null;

  status: "Active" | "Pending Approval" | "Resolved";

  affectedPopulation: number;

  recommendedAction: string;

  validUntil: string | null;
}

// ============================================================
// SHELTERS
// ============================================================

export interface ShelterData {
  id: string;
  name: string;
  district: string;

  distance: string;
  estTime: string;

  capacity: number;
  available: number;

  status: "Open" | "Full" | "Standby";

  facilities: {
    water: boolean;
    power: boolean;
    medical: boolean;
    food: boolean;
    sanitation: boolean;
  };

  coordinates: [number, number];
}

// ============================================================
// EVACUATION RECOMMENDATION
// ============================================================

export interface EvacuationRecommendation {
  location: string;
  latitude: number;
  longitude: number;
  riskLevel: string;
  recommendation: string;
  nearestShelter: string;
  availableShelterCapacity: number;
  generatedAt: string;
}

// ============================================================
// RESOURCES
// ============================================================

export interface ResourceItem {
  id: string;
  type: string;
  name: string;
  location: string;
  quantity: number;
  availableQuantity: number;
  status: string;
}

// ============================================================
// SYSTEM STATUS
// ============================================================

export interface SystemStatus {
  weatherApi: "Connected" | "Error";
  riverSensorApi: "Connected" | "Error";
  satelliteService: "Connected" | "Error";
  aiModelService: "Connected" | "Error";
  notificationService: "Connected" | "Error";
  database: "Connected" | "Error";

  lastUpdated: string;
}

// ============================================================
// HISTORICAL EVENTS
// ============================================================

export interface HistoricalEvent {
  year: string;
  eventType: string;
  countOrDate: string;
}

// ============================================================
// SYSTEM SETTINGS
// ============================================================

export interface SystemSettingsData {
  id?: string;
  systemName: string;
  defaultDistrict: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  language: string;
  updatedAt?: string;
}

// ============================================================
// FLOOD PREDICTION
// ============================================================

export interface FloodPrediction {
  location: string;
  latitude: number;
  longitude: number;

  floodProbability: number;

  riskLevel: string;

  predictedAt: string;

  modelUsed?: string;
  modelVersion?: string;
}

// ============================================================
// LANDSLIDE PREDICTION
// ============================================================

export interface LandslidePrediction {
  location: string;
  latitude: number;
  longitude: number;

  landslideProbability: number;

  riskLevel: string;

  predictedAt: string;

  modelVersion: string;
}

// ============================================================
// RISK ASSESSMENT
// ============================================================

export interface RiskAssessment {
  location: string;
  latitude: number;
  longitude: number;

  floodProbability: number;
  landslideProbability: number;

  floodRisk: string;
  landslideRisk: string;

  overallRisk: string;

  assessedAt: string;
}

// ============================================================
// DISASTER EVIDENCE
// ============================================================

export interface DisasterEvidence {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  pressure: number;

  soilMoisture: number;
  elevation: number;

  reflectivityMean: number;
  reflectivityMax: number;
  reflectivityMin: number;
  reflectivityStd: number;
  reflectivityMedian: number;

  reflectivityGe20Pct: number;
  reflectivityGe30Pct: number;
  reflectivityGe40Pct: number;

  radarObservationCount: number;

  observedAt: string;
  source: string;
}

// ============================================================
// DISASTER EVENT
// ============================================================

export interface DisasterEvent {
  location: string;

  latitude: number;
  longitude: number;

  disasterType: "FLOOD" | "LANDSLIDE";

  probability: number;

  riskLevel: string;

  overallRisk: string;

  status: string;

  detectedAt: string;

  evidence: DisasterEvidence;
}

// ============================================================
// DISASTER EVENTS RESPONSE
// ============================================================

export interface DisasterEventsResponse {
  events: DisasterEvent[];
}

// ============================================================
// MOCK VILLAGES
// ============================================================

const MOCK_VILLAGES: VillageData[] = [
  {
    id: "houston-1",
    name: "Houston",
    district: "Harris County, Texas",

    riskIndex: 90,
    floodRisk: 94,
    landslideRisk: 35,

    overallRisk: "Critical",

    population: 2300,

    aiPriorityScore: 95,

    rescueTeams: 5,
    boats: 4,
    ambulances: 3,
    foodKits: 1200,

    coordinates: [29.7604, -95.3698],
  },

  {
    id: "houston-2",
    name: "Addicks",
    district: "Harris County, Texas",

    riskIndex: 82,
    floodRisk: 88,
    landslideRisk: 30,

    overallRisk: "High",

    population: 1850,

    aiPriorityScore: 88,

    rescueTeams: 3,
    boats: 2,
    ambulances: 2,
    foodKits: 800,

    coordinates: [29.7608, -95.6365],
  },

  {
    id: "houston-3",
    name: "Kingwood",
    district: "Harris County, Texas",

    riskIndex: 76,
    floodRisk: 81,
    landslideRisk: 28,

    overallRisk: "High",

    population: 2100,

    aiPriorityScore: 84,

    rescueTeams: 3,
    boats: 2,
    ambulances: 2,
    foodKits: 700,

    coordinates: [30.0474, -95.1836],
  },
];

// ============================================================
// MOCK WEATHER
// ============================================================

const MOCK_WEATHER: WeatherData = {
  rainfall24h: 75,

  rainfallStatus: "Very High",

  riverLevel: 4.2,

  riverStatus: "Danger",

  soilMoisture: 72,

  soilMoistureStatus: "High",

  temperature: 24.5,

  humidity: 88,

  windSpeed: 12,

  terrainSlope: 18,

  landUseChange: 8,
};

// ============================================================
// MOCK ALERTS
// ============================================================

const MOCK_ALERTS: AlertItem[] = [
  {
    id: "alert-001",

    type: "Flood Warning",

    area: "Houston",

    severity: "High",

    source: "AI Model",

    issuedAt: "14 Aug 2026, 10:15 AM",

    status: "Active",

    affectedPopulation: 2300,

    recommendedAction:
      "Initiate flood preparedness measures and monitor evacuation routes.",

    validUntil: "14 Aug 2026, 10:00 PM",
  },

  {
    id: "alert-002",

    type: "Heavy Rain Alert",

    area: "Addicks",

    severity: "High",

    source: "IMD",

    issuedAt: "14 Aug 2026, 09:40 AM",

    status: "Active",

    affectedPopulation: 1850,

    recommendedAction:
      "Monitor rainfall intensity and prepare emergency response resources.",

    validUntil: "14 Aug 2026, 08:00 PM",
  },

  {
    id: "alert-003",

    type: "Landslide Warning",

    area: "Kingwood",

    severity: "Medium",

    source: "AI Model",

    issuedAt: "14 Aug 2026, 08:30 AM",

    status: "Active",

    affectedPopulation: 2100,

    recommendedAction:
      "Monitor unstable terrain and restrict access to high-risk areas.",

    validUntil: "15 Aug 2026, 08:30 AM",
  },

  {
    id: "alert-004",

    type: "Dam Overflow Alert",

    area: "Houston",

    severity: "Medium",

    source: "Sensors",

    issuedAt: "13 Aug 2026, 07:15 PM",

    status: "Pending Approval",

    affectedPopulation: 1200,

    recommendedAction:
      "Review downstream evacuation readiness and emergency shelter capacity.",

    validUntil: "14 Aug 2026, 07:15 PM",
  },
];

// ============================================================
// MOCK SHELTERS
// ============================================================

const MOCK_SHELTERS: ShelterData[] = [
  {
    id: "houston-s1",

    name: "Houston Emergency Shelter",

    district: "Houston, Texas",

    distance: "2.4 km",

    estTime: "8 min",

    capacity: 2000,

    available: 1500,

    status: "Open",

    facilities: {
      water: true,
      power: true,
      medical: true,
      food: true,
      sanitation: true,
    },

    coordinates: [29.7604, -95.3698],
  },

  {
    id: "houston-s2",

    name: "Harris County Emergency Center",

    district: "Houston, Texas",

    distance: "5.8 km",

    estTime: "15 min",

    capacity: 1200,

    available: 850,

    status: "Open",

    facilities: {
      water: true,
      power: true,
      medical: true,
      food: true,
      sanitation: true,
    },

    coordinates: [29.7752, -95.3678],
  },

  {
    id: "seattle-s1",

    name: "Seattle Emergency Shelter",

    district: "Seattle, Washington",

    distance: "3.1 km",

    estTime: "10 min",

    capacity: 1500,

    available: 1100,

    status: "Open",

    facilities: {
      water: true,
      power: true,
      medical: true,
      food: true,
      sanitation: true,
    },

    coordinates: [47.6062, -122.3321],
  },

  {
    id: "seattle-s2",

    name: "King County Emergency Center",

    district: "Seattle, Washington",

    distance: "6.4 km",

    estTime: "17 min",

    capacity: 1000,

    available: 650,

    status: "Open",

    facilities: {
      water: true,
      power: true,
      medical: true,
      food: true,
      sanitation: true,
    },

    coordinates: [47.6101, -122.2015],
  },
];

// ============================================================
// MOCK SYSTEM STATUS
// ============================================================

const MOCK_SYSTEM_STATUS: SystemStatus = {
  weatherApi: "Connected",

  riverSensorApi: "Connected",

  satelliteService: "Connected",

  aiModelService: "Connected",

  notificationService: "Connected",

  database: "Connected",

  lastUpdated: "14 Aug 2026, 12:00 PM",
};

// ============================================================
// MOCK HISTORICAL EVENTS
// ============================================================

const MOCK_HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    year: "Houston Flood Event",
    eventType: "Flood",
    countOrDate: "Hurricane Harvey - Aug 2017",
  },

  {
    year: "Houston Rainfall Event",
    eventType: "Extreme Rainfall",
    countOrDate: "May 2015",
  },

  {
    year: "Seattle Landslide Event",
    eventType: "Landslide",
    countOrDate: "Dec 2022",
  },

  {
    year: "Seattle Rainfall Event",
    eventType: "Heavy Rainfall",
    countOrDate: "Nov 2021",
  },
];

// ============================================================
// MOCK DISASTER EVENTS
// ============================================================

const MOCK_DISASTER_EVENTS: DisasterEvent[] = [
  {
    location: "Houston",

    latitude: 29.7604,

    longitude: -95.3698,

    disasterType: "FLOOD",

    probability: 0.94,

    riskLevel: "Critical",

    overallRisk: "Critical",

    status: "ACTIVE",

    detectedAt: new Date().toISOString(),

    evidence: {
      temperature: 24.5,

      humidity: 88,

      rainfall: 75,

      windSpeed: 12,

      pressure: 1002,

      soilMoisture: 72,

      elevation: 30,

      reflectivityMean: 35,

      reflectivityMax: 52,

      reflectivityMin: 18,

      reflectivityStd: 8,

      reflectivityMedian: 34,

      reflectivityGe20Pct: 92,

      reflectivityGe30Pct: 78,

      reflectivityGe40Pct: 45,

      radarObservationCount: 3413621,

      observedAt: new Date().toISOString(),

      source: "GridRad + AI Model",
    },
  },

  {
    location: "Addicks",

    latitude: 29.7608,

    longitude: -95.6365,

    disasterType: "FLOOD",

    probability: 0.86,

    riskLevel: "High",

    overallRisk: "High",

    status: "ACTIVE",

    detectedAt: new Date().toISOString(),

    evidence: {
      temperature: 25,

      humidity: 86,

      rainfall: 68,

      windSpeed: 10,

      pressure: 1004,

      soilMoisture: 69,

      elevation: 28,

      reflectivityMean: 31,

      reflectivityMax: 47,

      reflectivityMin: 16,

      reflectivityStd: 7,

      reflectivityMedian: 30,

      reflectivityGe20Pct: 88,

      reflectivityGe30Pct: 70,

      reflectivityGe40Pct: 38,

      radarObservationCount: 3413621,

      observedAt: new Date().toISOString(),

      source: "GridRad + AI Model",
    },
  },

  {
    location: "Kingwood",

    latitude: 30.0474,

    longitude: -95.1836,

    disasterType: "LANDSLIDE",

    probability: 0.78,

    riskLevel: "High",

    overallRisk: "High",

    status: "ACTIVE",

    detectedAt: new Date().toISOString(),

    evidence: {
      temperature: 23.8,

      humidity: 91,

      rainfall: 82,

      windSpeed: 9,

      pressure: 1001,

      soilMoisture: 84,

      elevation: 45,

      reflectivityMean: 29,

      reflectivityMax: 44,

      reflectivityMin: 15,

      reflectivityStd: 6,

      reflectivityMedian: 28,

      reflectivityGe20Pct: 84,

      reflectivityGe30Pct: 62,

      reflectivityGe40Pct: 31,

      radarObservationCount: 3413621,

      observedAt: new Date().toISOString(),

      source: "GridRad + AI Model",
    },
  },
];

// ============================================================
// API BASE URL
// ============================================================

export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL || "http://localhost:8080/api";

// ============================================================
// API SERVICE
// ============================================================

export const TerraAlertAPI = {
  // ==========================================================
  // IMPORTANT
  //
  // Keep this FALSE while demonstrating the frontend.
  //
  // When the backend is ready:
  //
  // useRealBackend: true
  //
  // ==========================================================

  useRealBackend: true,

  // ==========================================================
  // AUTHENTICATION HEADERS
  // ==========================================================

  getAuthHeaders(): HeadersInit {
    const token =
      localStorage.getItem("terraalert_token") || localStorage.getItem("token");

    return {
      "Content-Type": "application/json",

      Accept: "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    };
  },

  // ==========================================================
  // REAL LANDSLIDE ML PREDICTION
  // Route via API Gateway: :8080/api/prediction/landslide
  // ==========================================================

  async predictLandslide(data: {
    location?: string;
    latitude?: number;
    longitude?: number;
    rainfall_1d: number;
    rainfall_3d: number;
    rainfall_7d: number;
    rainfall_15d: number;
    rainfall_32d: number;
    temperature_max: number;
    temperature_min: number;
  }): Promise<LandslidePrediction> {
    const payload = {
      location: data.location || "Seattle Region",
      latitude: data.latitude ?? 47.6062,
      longitude: data.longitude ?? -122.3321,
      rainfall_1d: data.rainfall_1d,
      rainfall_3d: data.rainfall_3d,
      rainfall_7d: data.rainfall_7d,
      rainfall_15d: data.rainfall_15d,
      rainfall_32d: data.rainfall_32d,
      temperature_max: data.temperature_max,
      temperature_min: data.temperature_min,
      observedAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/prediction/landslide`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        errorText || `Landslide prediction failed: ${response.status}`,
      );
    }

    return response.json();
  },

  // ==========================================================
  // REAL FLOOD ML PREDICTION
  // Route via API Gateway: :8080/api/prediction/flood
  // ==========================================================

  async predictFlood(data: {
    location?: string;
    latitude?: number;
    longitude?: number;
    rainfall: number;
    soilMoisture: number;
    temperature: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    elevation?: number;
    riverLevel?: number;
    reflectivityMean: number;
    reflectivityMax: number;
    reflectivityMin: number;
    reflectivityStd: number;
    reflectivityMedian: number;
    reflectivityGe20Pct: number;
    reflectivityGe30Pct: number;
    reflectivityGe40Pct: number;
    radarObservationCount: number;
  }): Promise<FloodPrediction> {
    const payload = {
      location: data.location || "Houston Region",
      latitude: data.latitude ?? 29.7604,
      longitude: data.longitude ?? -95.3698,
      rainfall: data.rainfall,
      soilMoisture: data.soilMoisture,
      temperature: data.temperature,
      humidity: data.humidity,
      pressure: data.pressure,
      windSpeed: data.windSpeed,
      elevation: data.elevation ?? 30.0,
      riverLevel: data.riverLevel ?? 5.0,
      reflectivityMean: data.reflectivityMean,
      reflectivityMax: data.reflectivityMax,
      reflectivityMin: data.reflectivityMin,
      reflectivityStd: data.reflectivityStd,
      reflectivityMedian: data.reflectivityMedian,
      reflectivityGe20Pct: data.reflectivityGe20Pct,
      reflectivityGe30Pct: data.reflectivityGe30Pct,
      reflectivityGe40Pct: data.reflectivityGe40Pct,
      radarObservationCount: data.radarObservationCount,
      observedAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/prediction/flood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        errorText || `Flood prediction failed: ${response.status}`,
      );
    }

    return response.json();
  },

  // ==========================================================
  // WEATHER PROCESSING
  //
  // REAL ML BACKEND
  // Port: 8083
  // ==========================================================

  async processWeatherData(data: {
    location: string;

    latitude: number;

    longitude: number;

    temperature: number;

    humidity: number;

    rainfall: number;

    windSpeed: number;

    pressure: number;

    soilMoisture: number;

    elevation: number;

    reflectivityMean: number;

    reflectivityMax: number;

    reflectivityMin: number;

    reflectivityStd: number;

    reflectivityMedian: number;

    reflectivityGe20Pct: number;

    reflectivityGe30Pct: number;

    reflectivityGe40Pct: number;

    radarObservationCount: number;

    observedAt: string;

    source: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/processing/weather`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Weather processing failed: ${response.status}`);
    }

    return response.json();
  },

  // ==========================================================
  // MULTIPLE DISASTER PROCESSING
  // ==========================================================

  async processMultipleDisasters(
    requests: Array<{
      location: string;

      latitude: number;

      longitude: number;

      disasterType: "FLOOD" | "LANDSLIDE";

      weatherData: {
        location: string;

        latitude: number;

        longitude: number;

        temperature: number;

        humidity: number;

        rainfall: number;

        windSpeed: number;

        pressure: number;

        soilMoisture: number;

        elevation: number;

        reflectivityMean: number;

        reflectivityMax: number;

        reflectivityMin: number;

        reflectivityStd: number;

        reflectivityMedian: number;

        reflectivityGe20Pct: number;

        reflectivityGe30Pct: number;

        reflectivityGe40Pct: number;

        radarObservationCount: number;

        observedAt: string;

        source: string;
      };
    }>,
  ): Promise<DisasterEventsResponse> {
    const response = await fetch(
      `${API_BASE_URL}/processing/weather/disasters`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(requests),
      },
    );

    if (!response.ok) {
      throw new Error(`Disaster processing failed: ${response.status}`);
    }

    const data = await response.json();

    return {
      events: (data.events || []).map((event: any) => ({
        location: event.location,

        latitude: event.latitude,

        longitude: event.longitude,

        disasterType: event.disasterType,

        probability: event.probability,

        riskLevel: event.riskLevel,

        overallRisk: event.overallRisk,

        status: event.status,

        detectedAt: event.detectedAt,

        evidence: {
          temperature: event.temperature,

          humidity: event.humidity,

          rainfall: event.rainfall,

          windSpeed: event.windSpeed,

          pressure: event.pressure,

          soilMoisture: event.soilMoisture,

          elevation: event.elevation,

          reflectivityMean: event.reflectivityMean,

          reflectivityMax: event.reflectivityMax,

          reflectivityMin: event.reflectivityMin,

          reflectivityStd: event.reflectivityStd,

          reflectivityMedian: event.reflectivityMedian,

          reflectivityGe20Pct: event.reflectivityGe20Pct,

          reflectivityGe30Pct: event.reflectivityGe30Pct,

          reflectivityGe40Pct: event.reflectivityGe40Pct,

          radarObservationCount: event.radarObservationCount,

          observedAt: event.observedAt,

          source: event.source,
        },
      })),
    };
  },

  // ==========================================================
  // GET CURRENT DISASTER EVENTS
  //
  // IMPORTANT FIX:
  //
  // Mock mode does NOT call port 8083.
  // ==========================================================

  async getDisasterEvents(): Promise<DisasterEventsResponse> {
    // --------------------------------------------------------
    // MOCK MODE
    // --------------------------------------------------------

    if (!this.useRealBackend) {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              events: MOCK_DISASTER_EVENTS,
            }),
          100,
        ),
      );
    }

    // --------------------------------------------------------
    // REAL BACKEND MODE
    // --------------------------------------------------------

    const response = await fetch(
      `${API_BASE_URL}/processing/weather/disasters`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch disaster events: ${response.status}`);
    }

    const data = await response.json();

    return {
      events: (data.events || []).map((event: any) => ({
        location: event.location,

        latitude: event.latitude,

        longitude: event.longitude,

        disasterType: event.disasterType,

        probability: event.probability,

        riskLevel: event.riskLevel,

        overallRisk: event.overallRisk,

        status: event.status,

        detectedAt: event.detectedAt,

        evidence: {
          temperature: event.temperature,

          humidity: event.humidity,

          rainfall: event.rainfall,

          windSpeed: event.windSpeed,

          pressure: event.pressure,

          soilMoisture: event.soilMoisture,

          elevation: event.elevation,

          reflectivityMean: event.reflectivityMean,

          reflectivityMax: event.reflectivityMax,

          reflectivityMin: event.reflectivityMin,

          reflectivityStd: event.reflectivityStd,

          reflectivityMedian: event.reflectivityMedian,

          reflectivityGe20Pct: event.reflectivityGe20Pct,

          reflectivityGe30Pct: event.reflectivityGe30Pct,

          reflectivityGe40Pct: event.reflectivityGe40Pct,

          radarObservationCount: event.radarObservationCount,

          observedAt: event.observedAt,

          source: event.source,
        },
      })),
    };
  },

  // ==========================================================
  // VILLAGES
  // ==========================================================

  async getVillages(): Promise<VillageData[]> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/villages`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch villages: ${response.status}`);
      }

      return response.json();
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_VILLAGES), 100),
    );
  },

  // ==========================================================
  // WEATHER
  // ==========================================================

  async getWeather(): Promise<WeatherData> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(
        `${API_BASE_URL}/processing/weather/disasters`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status}`);
      }

      const data = await response.json();

      const events = data.events ?? [];

      // Use the first available disaster event because
      // both FLOOD and LANDSLIDE contain the same environmental data.
      const event = events[0];

      if (!event) {
        throw new Error("No disaster event data available");
      }

      const rainfall = Number(event.rainfall ?? 0);
      const soilMoisture = Number(event.soilMoisture ?? 0);
      const temperature = Number(event.temperature ?? 0);
      const humidity = Number(event.humidity ?? 0);
      const windSpeed = Number(event.windSpeed ?? 0);
      const terrainSlope = Number(event.slope ?? 0);

      let rainfallStatus: WeatherData["rainfallStatus"];

      if (rainfall >= 50) {
        rainfallStatus = "Very High";
      } else if (rainfall >= 20) {
        rainfallStatus = "Heavy";
      } else if (rainfall >= 5) {
        rainfallStatus = "Moderate";
      } else {
        rainfallStatus = "Light";
      }

      let soilMoistureStatus: WeatherData["soilMoistureStatus"];

      if (soilMoisture >= 0.8) {
        soilMoistureStatus = "Very High";
      } else if (soilMoisture >= 0.6) {
        soilMoistureStatus = "High";
      } else {
        soilMoistureStatus = "Normal";
      }

      return {
        rainfall24h: rainfall,
        rainfallStatus,

        // No river-level data is currently available
        // from the backend response.
        riverLevel: 0,
        riverStatus: "Normal",

        soilMoisture,
        soilMoistureStatus,

        temperature,
        humidity,
        windSpeed,

        terrainSlope,

        // No land-use-change data is currently available.
        landUseChange: 0,
      };
    }

    return MOCK_WEATHER;
  },

  // ==========================================================
  // ALERTS
  // ==========================================================

  async getAlerts(): Promise<AlertItem[]> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/alerts`, {
        method: "GET",

        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication required. Please sign in again.");
        }

        if (response.status === 403) {
          throw new Error("You do not have permission to view alerts.");
        }

        throw new Error(`Failed to fetch alerts: ${response.status}`);
      }

      const data = await response.json();

      return (data || []).map((raw: any) => {
        let status: AlertItem["status"] = "Active";
        if (raw.status === "PENDING" || raw.status === "Pending Approval") {
          status = "Pending Approval";
        } else if (raw.status === "ACTIVE" || raw.status === "Active") {
          status = "Active";
        } else if (raw.status === "RESOLVED" || raw.status === "Resolved") {
          status = "Resolved";
        }

        let severity: AlertItem["severity"] = "High";
        if (raw.severity) {
          const s = String(raw.severity).toUpperCase();
          if (s === "HIGH") severity = "High";
          else if (s === "MEDIUM") severity = "Medium";
          else if (s === "LOW") severity = "Low";
          else severity = (raw.severity.charAt(0).toUpperCase() + raw.severity.slice(1).toLowerCase()) as any;
        }

        return {
          id: raw.id,
          type: raw.alertType || raw.type || "Disaster Warning",
          area: raw.location || raw.area || "Unknown",
          severity: severity,
          source: raw.source || "AI Model",
          issuedAt: raw.createdAt || raw.issuedAt || null,
          status: status,
          affectedPopulation: raw.affectedPopulation || 0,
          recommendedAction: raw.message || raw.recommendedAction || "",
          validUntil: raw.validUntil || null,
        };
      });
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_ALERTS), 100),
    );
  },

  // ==========================================================
  // CREATE ALERT
  // ==========================================================

  async createAlert(alertData: Partial<AlertItem>): Promise<AlertItem> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/alerts`, {
        method: "POST",

        headers: this.getAuthHeaders(),

        body: JSON.stringify({
          type: alertData.type,

          area: alertData.area,

          severity: alertData.severity,

          source: alertData.source || "AI Model",

          affectedPopulation: alertData.affectedPopulation || 0,

          recommendedAction:
            alertData.recommendedAction || "Issued alert from dashboard.",
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication required. Please sign in again.");
        }

        if (response.status === 403) {
          throw new Error("You do not have permission to create alerts.");
        }

        const errorText = await response.text();

        throw new Error(
          errorText || `Failed to create alert: ${response.status}`,
        );
      }

      return response.json();
    }

    // --------------------------------------------------------
    // MOCK FALLBACK
    // --------------------------------------------------------

    const newAlert: AlertItem = {
      id: `a${Date.now()}`,

      type: alertData.type || "Heavy Rain Alert",

      area: alertData.area || "Houston",

      severity: alertData.severity || "High",

      source: alertData.source || "AI Model",

      issuedAt: null,

      status: "Pending Approval",

      affectedPopulation: alertData.affectedPopulation || 1500,

      recommendedAction:
        alertData.recommendedAction || "Issued alert from dashboard.",

      validUntil: null,
    };

    MOCK_ALERTS.unshift(newAlert);

    return newAlert;
  },

  // ==========================================================
  // UPDATE ALERT
  // ==========================================================

  async updateAlert(
    id: string,
    alertData: Partial<AlertItem>,
  ): Promise<AlertItem> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/alerts/${id}`, {
        method: "PUT",

        headers: this.getAuthHeaders(),

        body: JSON.stringify({
          type: alertData.type,

          area: alertData.area,

          severity: alertData.severity,

          source: alertData.source,

          affectedPopulation: alertData.affectedPopulation,

          recommendedAction: alertData.recommendedAction,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication required. Please sign in again.");
        }

        if (response.status === 403) {
          throw new Error("You do not have permission to edit this alert.");
        }

        const errorText = await response.text();

        throw new Error(
          errorText || `Failed to update alert: ${response.status}`,
        );
      }

      return response.json();
    }

    // --------------------------------------------------------
    // MOCK FALLBACK
    // --------------------------------------------------------

    const index = MOCK_ALERTS.findIndex((alert) => alert.id === id);

    if (index === -1) {
      throw new Error("Alert not found");
    }

    const existingAlert = MOCK_ALERTS[index];

    const updatedAlert: AlertItem = {
      ...existingAlert,

      ...alertData,

      id: existingAlert.id,

      status: existingAlert.status,

      issuedAt: existingAlert.issuedAt,

      validUntil: existingAlert.validUntil,
    };

    MOCK_ALERTS[index] = updatedAlert;

    return updatedAlert;
  },

  // ==========================================================
  // APPROVE & SEND ALERT
  // ==========================================================

  async approveAlert(id: string): Promise<AlertItem> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/alerts/${id}/approve`, {
        method: "PATCH",

        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication required. Please sign in again.");
        }

        if (response.status === 403) {
          throw new Error(
            "Only authorized disaster managers can approve alerts.",
          );
        }

        const errorText = await response.text();

        throw new Error(
          errorText || `Failed to approve alert: ${response.status}`,
        );
      }

      return response.json();
    }

    // --------------------------------------------------------
    // MOCK FALLBACK
    // --------------------------------------------------------

    const index = MOCK_ALERTS.findIndex((alert) => alert.id === id);

    if (index === -1) {
      throw new Error("Alert not found");
    }

    const now = new Date();

    const tomorrow = new Date(now);

    tomorrow.setDate(tomorrow.getDate() + 1);

    tomorrow.setHours(21, 0, 0, 0);

    const updatedAlert: AlertItem = {
      ...MOCK_ALERTS[index],

      status: "Active",

      issuedAt: now.toLocaleString("en-IN", {
        day: "2-digit",

        month: "short",

        year: "numeric",

        hour: "2-digit",

        minute: "2-digit",
      }),

      validUntil: tomorrow.toLocaleString("en-IN", {
        day: "2-digit",

        month: "short",

        year: "numeric",

        hour: "2-digit",

        minute: "2-digit",
      }),
    };

    MOCK_ALERTS[index] = updatedAlert;

    return updatedAlert;
  },

  // ==========================================================
  // RESOLVE ALERT
  // ==========================================================

  async resolveAlert(id: string): Promise<AlertItem> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/alerts/${id}/resolve`, {
        method: "PATCH",

        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication required. Please sign in again.");
        }

        if (response.status === 403) {
          throw new Error("You do not have permission to resolve this alert.");
        }

        throw new Error(`Failed to resolve alert: ${response.status}`);
      }

      return response.json();
    }

    // --------------------------------------------------------
    // MOCK FALLBACK
    // --------------------------------------------------------

    const index = MOCK_ALERTS.findIndex((alert) => alert.id === id);

    if (index === -1) {
      throw new Error("Alert not found");
    }

    const updatedAlert: AlertItem = {
      ...MOCK_ALERTS[index],

      status: "Resolved",
    };

    MOCK_ALERTS[index] = updatedAlert;

    return updatedAlert;
  },

  // ==========================================================
  // DELETE ALERT
  // ==========================================================

  async deleteAlert(id: string): Promise<void> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/alerts/${id}`, {
        method: "DELETE",

        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication required. Please sign in again.");
        }

        if (response.status === 403) {
          throw new Error("Only authorized users can delete alerts.");
        }

        if (response.status === 404) {
          throw new Error("Alert not found.");
        }

        const errorText = await response.text();

        throw new Error(
          errorText || `Failed to delete alert: ${response.status}`,
        );
      }

      return;
    }

    // --------------------------------------------------------
    // MOCK FALLBACK
    // --------------------------------------------------------

    const index = MOCK_ALERTS.findIndex((alert) => alert.id === id);

    if (index === -1) {
      throw new Error("Alert not found");
    }

    MOCK_ALERTS.splice(index, 1);
  },

  // ==========================================================
  // EVACUATION RECOMMENDATION
  // ==========================================================

  async getEvacuationRecommendation(payload: {
    location?: string;
    latitude?: number;
    longitude?: number;
    riskLevel?: string;
  }): Promise<EvacuationRecommendation> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/evacuation/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify({
          location: payload.location || "Houston",
          latitude: payload.latitude ?? 29.7604,
          longitude: payload.longitude ?? -95.3698,
          riskLevel: payload.riskLevel || "HIGH",
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Evacuation recommendation failed: ${response.status}`,
        );
      }

      return response.json();
    }

    return {
      location: payload.location || "Houston",
      latitude: payload.latitude ?? 29.7604,
      longitude: payload.longitude ?? -95.3698,
      riskLevel: payload.riskLevel || "HIGH",
      recommendation:
        "Evacuation recommended. Move affected population to the nearest available shelter.",
      nearestShelter: "Houston Emergency Shelter",
      availableShelterCapacity: 1500,
      generatedAt: new Date().toISOString(),
    };
  },

  // ==========================================================
  // SHELTERS
  // ==========================================================

  async getShelters(): Promise<ShelterData[]> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/shelters`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch shelters: ${response.status}`);
      }

      const data = await response.json();
      return (data || []).map((raw: any) => ({
        id: raw.id,
        name: raw.name || raw.location || "Emergency Shelter",
        district: raw.location || "Houston",
        distance: "N/A",
        estTime: "N/A",
        capacity: raw.capacity || 0,
        available: Math.max(
          0,
          (raw.capacity || 0) - (raw.currentOccupancy || 0),
        ),
        status: raw.status === "AVAILABLE" ? "Open" : "Standby",
        facilities: {
          water: true,
          power: true,
          medical: true,
          food: true,
          sanitation: true,
        },
        coordinates: [
          raw.latitude ?? 29.7604,
          raw.longitude ?? -95.3698,
        ] as [number, number],
      }));
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_SHELTERS), 100),
    );
  },

  // ==========================================================
  // RESOURCES
  // ==========================================================

  async getResources(): Promise<ResourceItem[]> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/resources`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch resources: ${response.status}`);
      }

      return response.json();
    }

    return [];
  },

  // ==========================================================
  // SYSTEM STATUS
  // ==========================================================

  async getSystemStatus(): Promise<SystemStatus> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/system-status`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch system status: ${response.status}`);
      }

      return response.json();
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_SYSTEM_STATUS), 100),
    );
  },

  // ==========================================================
  // HISTORICAL EVENTS
  // ==========================================================

  async getHistoricalEvents(): Promise<HistoricalEvent[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_HISTORICAL_EVENTS), 100),
    );
  },

  // ==========================================================
  // SYSTEM SETTINGS
  // ==========================================================

  async getSettings(): Promise<SystemSettingsData> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch system settings: ${response.status}`);
      }

      return response.json();
    }

    return {
      systemName: "AI Powered Disaster Management",
      defaultDistrict: "Harris County, Texas",
      timezone: "IST (UTC+5:30) Asia/Kolkata",
      dateFormat: "DD-MM-YYYY",
      timeFormat: "12 Hour",
      language: "English",
    };
  },

  async updateSettings(settings: SystemSettingsData): Promise<SystemSettingsData> {
    if (this.useRealBackend && API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error(`Failed to update system settings: ${response.status}`);
      }

      return response.json();
    }

    return settings;
  },
};
