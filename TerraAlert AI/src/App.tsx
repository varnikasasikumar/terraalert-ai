import React, { useEffect } from "react";

import { useApp } from "./context/AppContext";

import { Sidebar } from "./components/Sidebar";
import { TopHeader } from "./components/TopHeader";

import { LoginScreen } from "./views/LoginScreen";
import { DashboardView } from "./views/DashboardView";
import { FloodPredictionView } from "./views/FloodPredictionView";
import { LandslidePredictionView } from "./views/LandslidePredictionView";
import { RiskMonitoringAppView } from "./views/RiskMonitoringAppView";
import { VillageAnalysisView } from "./views/VillageAnalysisView";
import { SatelliteMonitoringView } from "./views/SatelliteMonitoringView";
import { AlertManagementView } from "./views/AlertManagementView";
import { ResourcePrioritizationView } from "./views/ResourcePrioritizationView";
import { EvacuationPlanningView } from "./views/EvacuationPlanningView";
import { ShelterManagementView } from "./views/ShelterManagementView";
import { ReportsAnalysisView } from "./views/ReportsAnalysisView";
import { SettingsView } from "./views/SettingsView";
import { UserManagementView } from "./views/UserManagementView";

type UserRole = "ADMIN" | "DISASTER_MANAGER" | "FIELD_OFFICER" | "ANALYST";

const PAGE_ACCESS: Record<string, UserRole[]> = {
  Dashboard: ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER", "ANALYST"],

  "Flood Prediction": [
    "ADMIN",
    "DISASTER_MANAGER",
    "FIELD_OFFICER",
    "ANALYST",
  ],

  "Landslide Prediction": [
    "ADMIN",
    "DISASTER_MANAGER",
    "FIELD_OFFICER",
    "ANALYST",
  ],

  "Risk Monitoring App": [
    "ADMIN",
    "DISASTER_MANAGER",
    "FIELD_OFFICER",
    "ANALYST",
  ],

  "Village Analysis": ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER", "ANALYST"],

  "Satellite Monitoring": ["ADMIN", "DISASTER_MANAGER", "ANALYST"],

  "Alert Management": ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER"],

  "Resource Prioritization": ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER"],

  "Evacuation Planning": ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER"],

  "Shelter Management": ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER"],

  "Reports & Analysis": ["ADMIN", "DISASTER_MANAGER", "ANALYST"],

  "User Management": ["ADMIN"],

  Settings: ["ADMIN"],
};

const MainLayout: React.FC = () => {
  const { isLoggedIn, activeTab, setActiveTab, userRole } = useApp();

  // =======================================================
  // ROLE-BASED PAGE PROTECTION
  // =======================================================

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const role = userRole as UserRole | null;

    const allowedRoles = PAGE_ACCESS[activeTab];

    const hasAccess = role && allowedRoles && allowedRoles.includes(role);

    if (!hasAccess) {
      setActiveTab("Dashboard");
    }
  }, [isLoggedIn, activeTab, userRole, setActiveTab]);

  // =======================================================
  // LOGIN SCREEN
  // =======================================================

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  // =======================================================
  // ACTIVE VIEW
  // =======================================================

  const renderActiveView = () => {
    const role = userRole as UserRole | null;

    const allowedRoles = PAGE_ACCESS[activeTab];

    const hasAccess = role && allowedRoles && allowedRoles.includes(role);

    // Extra protection:
    // Never render an unauthorized page.

    if (!hasAccess) {
      return <DashboardView />;
    }

    switch (activeTab) {
      case "Dashboard":
        return <DashboardView />;

      case "Flood Prediction":
        return <FloodPredictionView />;

      case "Landslide Prediction":
        return <LandslidePredictionView />;

      case "Risk Monitoring App":
        return <RiskMonitoringAppView />;

      case "Village Analysis":
        return <VillageAnalysisView />;

      case "Satellite Monitoring":
        return <SatelliteMonitoringView />;

      case "Alert Management":
        return <AlertManagementView />;

      case "Resource Prioritization":
        return <ResourcePrioritizationView />;

      case "Evacuation Planning":
        return <EvacuationPlanningView />;

      case "Shelter Management":
        return <ShelterManagementView />;

      case "Reports & Analysis":
        return <ReportsAnalysisView />;

      case "User Management":
        return <UserManagementView />;

      case "Settings":
        return <SettingsView />;

      default:
        return <DashboardView />;
    }
  };

  // =======================================================
  // MAIN APPLICATION LAYOUT
  // =======================================================

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <TopHeader />

        <main
          style={{
            flex: 1,
            padding: "28px",
            overflowY: "auto",
          }}
        >
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
