import React, { createContext, useContext, useState, useEffect } from "react";

import { TerraAlertAPI } from "../api/service";

import type {
  VillageData,
  WeatherData,
  AlertItem,
  ShelterData,
  SystemStatus,
  FloodPrediction,
  LandslidePrediction,
  RiskAssessment,
  DisasterEvent,
} from "../api/service";

// =========================================================
// USER ROLE
// =========================================================

export type UserRole =
  | "ADMIN"
  | "DISASTER_MANAGER"
  | "FIELD_OFFICER"
  | "ANALYST";

// =========================================================
// APP CONTEXT TYPE
// =========================================================

interface AppContextType {
  // =======================================================
  // NAVIGATION
  // =======================================================

  activeTab: string;

  setActiveTab: (tab: string) => void;

  // =======================================================
  // LOCATION
  // =======================================================

  selectedDistrict: string;

  setSelectedDistrict: (district: string) => void;

  selectedVillage: string;

  setSelectedVillage: (village: string) => void;

  // =======================================================
  // AUTHENTICATION
  // =======================================================

  isLoggedIn: boolean;

  setIsLoggedIn: (status: boolean) => void;

  authToken: string | null;

  username: string | null;

  fullName: string | null;

  userRole: UserRole | null;

  login: (
    token: string,
    username: string,
    fullName: string,
    role: UserRole,
  ) => void;

  logout: () => void;

  // =======================================================
  // DASHBOARD DATA
  // =======================================================

  villages: VillageData[];

  weather: WeatherData | null;

  alerts: AlertItem[];

  shelters: ShelterData[];

  systemStatus: SystemStatus | null;

  // =======================================================
  // PREDICTION STATE
  // =======================================================

  floodPrediction: FloodPrediction | null;

  landslidePrediction: LandslidePrediction | null;

  riskAssessment: RiskAssessment | null;

  // =======================================================
  // DYNAMIC DISASTER EVENTS
  // =======================================================

  disasterEvents: DisasterEvent[];

  // =======================================================
  // DATA
  // =======================================================

  refreshData: () => void;

  // =======================================================
  // SINGLE LOCATION PREDICTION
  // =======================================================

  runPrediction: (data: {
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
  }) => Promise<void>;

  // =======================================================
  // MULTIPLE DISASTER PREDICTION
  // =======================================================

  runMultipleDisasterPrediction: (
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
  ) => Promise<void>;

  // =======================================================
  // ALERT
  // =======================================================

  createAlert: (alert: Partial<AlertItem>) => Promise<void>;

  // =======================================================
  // SIDEBAR
  // =======================================================

  sidebarCollapsed: boolean;

  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

// =========================================================
// CONTEXT
// =========================================================

const AppContext = createContext<AppContextType | undefined>(undefined);

// =========================================================
// PROVIDER
// =========================================================

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // =======================================================
  // NAVIGATION
  // =======================================================

  const [activeTab, setActiveTab] = useState<string>("Dashboard");

  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    "Harris County, Texas",
  );

  const [selectedVillage, setSelectedVillage] = useState<string>("Houston");

  // =======================================================
  // AUTHENTICATION
  // =======================================================

  /*
   * IMPORTANT:
   *
   * The application starts with isLoggedIn = false.
   *
   * Therefore the Login screen is shown when the
   * application starts.
   */

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  /*
   * Authentication information is still stored in
   * localStorage so the API service can use the token.
   */

  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("terraalert_token"),
  );

  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("terraalert_username"),
  );

  const [fullName, setFullName] = useState<string | null>(
    localStorage.getItem("terraalert_fullName"),
  );

  const [userRole, setUserRole] = useState<UserRole | null>(
    localStorage.getItem("terraalert_role") as UserRole | null,
  );

  // =======================================================
  // DASHBOARD DATA
  // =======================================================

  const [villages, setVillages] = useState<VillageData[]>([]);

  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const [shelters, setShelters] = useState<ShelterData[]>([]);

  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);

  // =======================================================
  // PREDICTION STATES
  // =======================================================

  const [floodPrediction, setFloodPrediction] =
    useState<FloodPrediction | null>(null);

  const [landslidePrediction, setLandslidePrediction] =
    useState<LandslidePrediction | null>(null);

  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(
    null,
  );

  // =======================================================
  // DYNAMIC DISASTER EVENTS
  // =======================================================

  const [disasterEvents, setDisasterEvents] = useState<DisasterEvent[]>([]);

  // =======================================================
  // SIDEBAR
  // =======================================================

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // =======================================================
  // LOGIN
  // =======================================================

  const login = (
    token: string,
    usernameValue: string,
    fullNameValue: string,
    role: UserRole,
  ) => {
    console.log("TerraAlert login:", usernameValue, role);

    // -----------------------------------------------------
    // STORE AUTHENTICATION INFORMATION
    // -----------------------------------------------------

    localStorage.setItem("terraalert_token", token);

    localStorage.setItem("terraalert_username", usernameValue);

    localStorage.setItem("terraalert_fullName", fullNameValue);

    localStorage.setItem("terraalert_role", role);

    // -----------------------------------------------------
    // UPDATE REACT STATE
    // -----------------------------------------------------

    setAuthToken(token);

    setUsername(usernameValue);

    setFullName(fullNameValue);

    setUserRole(role);

    setIsLoggedIn(true);

    // -----------------------------------------------------
    // ALWAYS START AT DASHBOARD
    // -----------------------------------------------------

    setActiveTab("Dashboard");
  };

  // =======================================================
  // LOGOUT
  // =======================================================

  const logout = () => {
    console.log("TerraAlert user logged out");

    // -----------------------------------------------------
    // REMOVE STORED AUTHENTICATION
    // -----------------------------------------------------

    localStorage.removeItem("terraalert_token");

    localStorage.removeItem("terraalert_username");

    localStorage.removeItem("terraalert_fullName");

    localStorage.removeItem("terraalert_role");

    // -----------------------------------------------------
    // CLEAR AUTHENTICATION STATE
    // -----------------------------------------------------

    setAuthToken(null);

    setUsername(null);

    setFullName(null);

    setUserRole(null);

    setIsLoggedIn(false);

    // -----------------------------------------------------
    // RESET TAB
    // -----------------------------------------------------

    setActiveTab("Dashboard");

    // -----------------------------------------------------
    // CLEAR DASHBOARD DATA
    // -----------------------------------------------------

    setVillages([]);

    setWeather(null);

    setAlerts([]);

    setShelters([]);

    setSystemStatus(null);

    setDisasterEvents([]);

    setFloodPrediction(null);

    setLandslidePrediction(null);

    setRiskAssessment(null);
  };

  // =========================================================
  // LOAD DASHBOARD DATA
  // =========================================================

  const refreshData = async () => {
    // -------------------------------------------------------
    // Don't load dashboard data before login.
    // -------------------------------------------------------

    if (!isLoggedIn) {
      console.log("Skipping dashboard data load - user not logged in.");

      return;
    }

    console.log("Loading TerraAlert dashboard data...");

    /*
     * IMPORTANT FIX
     *
     * The old version used Promise.all().
     *
     * If ONE API failed, Promise.all() rejected and
     * none of the dashboard data was stored.
     *
     * We now use Promise.allSettled().
     *
     * This means:
     *
     * villages       -> can load
     * weather        -> can load
     * alerts         -> can load
     * shelters       -> can load
     * system status  -> can load
     * disasters      -> can load
     *
     * independently.
     */

    try {
      const [
        villagesResult,
        weatherResult,
        alertsResult,
        sheltersResult,
        systemStatusResult,
        disasterEventsResult,
      ] = await Promise.allSettled([
        TerraAlertAPI.getVillages(),

        TerraAlertAPI.getWeather(),

        TerraAlertAPI.getAlerts(),

        TerraAlertAPI.getShelters(),

        TerraAlertAPI.getSystemStatus(),

        TerraAlertAPI.getDisasterEvents(),
      ]);

      // =====================================================
      // VILLAGES
      // =====================================================

      if (villagesResult.status === "fulfilled") {
        setVillages(villagesResult.value);

        console.log("Villages loaded:", villagesResult.value.length);
      } else {
        console.error("Failed to load villages:", villagesResult.reason);
      }

      // =====================================================
      // WEATHER
      // =====================================================

      if (weatherResult.status === "fulfilled") {
        setWeather(weatherResult.value);

        console.log("Weather data loaded:", weatherResult.value);
      } else {
        console.error("Failed to load weather:", weatherResult.reason);
      }

      // =====================================================
      // ALERTS
      // =====================================================

      if (alertsResult.status === "fulfilled") {
        setAlerts(alertsResult.value);

        console.log("Alerts loaded:", alertsResult.value.length);
      } else {
        console.error("Failed to load alerts:", alertsResult.reason);
      }

      // =====================================================
      // SHELTERS
      // =====================================================

      if (sheltersResult.status === "fulfilled") {
        setShelters(sheltersResult.value);

        console.log("Shelters loaded:", sheltersResult.value.length);
      } else {
        console.error("Failed to load shelters:", sheltersResult.reason);
      }

      // =====================================================
      // SYSTEM STATUS
      // =====================================================

      if (systemStatusResult.status === "fulfilled") {
        setSystemStatus(systemStatusResult.value);

        console.log("System status loaded:", systemStatusResult.value);
      } else {
        console.error(
          "Failed to load system status:",
          systemStatusResult.reason,
        );
      }

      // =====================================================
      // DISASTER EVENTS
      // =====================================================

      if (disasterEventsResult.status === "fulfilled") {
        setDisasterEvents(disasterEventsResult.value.events);

        console.log(
          "Disaster events loaded:",
          disasterEventsResult.value.events.length,
        );
      } else {
        console.error(
          "Failed to load disaster events:",
          disasterEventsResult.reason,
        );
      }

      console.log("TerraAlert dashboard data loaded successfully.");
    } catch (error) {
      /*
       * This is only a final safety net.
       *
       * Individual API errors are already handled
       * above using Promise.allSettled().
       */

      console.error("Unexpected dashboard loading error:", error);
    }
  };

  // =========================================================
  // RUN SINGLE LOCATION PREDICTION
  // =========================================================

  const runPrediction = async (data: {
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
  }) => {
    try {
      console.log("Starting TerraAlert AI prediction pipeline...");

      // ---------------------------------------------------
      // SEND CURRENT DATA TO BACKEND
      // ---------------------------------------------------

      const result = await TerraAlertAPI.processWeatherData(data);

      console.log("Prediction pipeline result:", result);

      // ===================================================
      // FLOOD PREDICTION
      // ===================================================

      setFloodPrediction({
        location: result.location,

        latitude: result.latitude,

        longitude: result.longitude,

        floodProbability: result.floodProbability,

        riskLevel: result.floodRisk,

        predictedAt: result.assessedAt,

        modelVersion: "flood-random-forest",
      });

      // ===================================================
      // LANDSLIDE PREDICTION
      // ===================================================

      setLandslidePrediction({
        location: result.location,

        latitude: result.latitude,

        longitude: result.longitude,

        landslideProbability: result.landslideProbability,

        riskLevel: result.landslideRisk,

        predictedAt: result.assessedAt,

        modelVersion: "seattle-landslide-baseline",
      });

      // ===================================================
      // OVERALL RISK
      // ===================================================

      setRiskAssessment({
        location: result.location,

        latitude: result.latitude,

        longitude: result.longitude,

        floodProbability: result.floodProbability,

        landslideProbability: result.landslideProbability,

        floodRisk: result.floodRisk,

        landslideRisk: result.landslideRisk,

        overallRisk: result.overallRisk,

        assessedAt: result.assessedAt,
      });

      console.log("Flood Risk:", result.floodRisk);

      console.log("Landslide Risk:", result.landslideRisk);

      console.log("Overall Risk:", result.overallRisk);
    } catch (error) {
      console.error("Prediction pipeline failed:", error);

      throw error;
    }
  };

  // =========================================================
  // RUN MULTIPLE DISASTER PREDICTIONS
  // =========================================================

  const runMultipleDisasterPrediction = async (
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
  ) => {
    try {
      console.log("Starting multi-disaster prediction...");

      // ---------------------------------------------------
      // SEND MULTIPLE LOCATIONS TO BACKEND
      // ---------------------------------------------------

      const result = await TerraAlertAPI.processMultipleDisasters(requests);

      console.log("Multi-disaster prediction result:", result);

      // ---------------------------------------------------
      // STORE DYNAMIC DISASTER EVENTS
      // ---------------------------------------------------

      setDisasterEvents(result.events);

      console.log("Active disaster events:", result.events);
    } catch (error) {
      console.error("Multi-disaster prediction failed:", error);

      throw error;
    }
  };

  // =========================================================
  // CREATE ALERT
  // =========================================================

  const handleCreateAlert = async (alertData: Partial<AlertItem>) => {
    await TerraAlertAPI.createAlert(alertData);

    await refreshData();
  };

  // =========================================================
  // LOAD DATA AFTER LOGIN
  // =========================================================

  /*
   * When login() sets isLoggedIn to true,
   * this effect automatically calls refreshData().
   */

  useEffect(() => {
    if (isLoggedIn) {
      refreshData();
    }
  }, [isLoggedIn]);

  // =========================================================
  // PROVIDER
  // =========================================================

  return (
    <AppContext.Provider
      value={{
        // ---------------------------------------------------
        // NAVIGATION
        // ---------------------------------------------------

        activeTab,

        setActiveTab,

        // ---------------------------------------------------
        // LOCATION
        // ---------------------------------------------------

        selectedDistrict,

        setSelectedDistrict,

        selectedVillage,

        setSelectedVillage,

        // ---------------------------------------------------
        // AUTHENTICATION
        // ---------------------------------------------------

        isLoggedIn,

        setIsLoggedIn,

        authToken,

        username,

        fullName,

        userRole,

        login,

        logout,

        // ---------------------------------------------------
        // DASHBOARD DATA
        // ---------------------------------------------------

        villages,

        weather,

        alerts,

        shelters,

        systemStatus,

        // ---------------------------------------------------
        // PREDICTIONS
        // ---------------------------------------------------

        floodPrediction,

        landslidePrediction,

        riskAssessment,

        // ---------------------------------------------------
        // DISASTER EVENTS
        // ---------------------------------------------------

        disasterEvents,

        // ---------------------------------------------------
        // API
        // ---------------------------------------------------

        refreshData,

        runPrediction,

        runMultipleDisasterPrediction,

        createAlert: handleCreateAlert,

        // ---------------------------------------------------
        // SIDEBAR
        // ---------------------------------------------------

        sidebarCollapsed,

        setSidebarCollapsed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// =========================================================
// CUSTOM HOOK
// =========================================================

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }

  return context;
};
