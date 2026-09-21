import React, { useMemo, useState } from "react";

import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CheckCircle2,
  CloudRain,
  Droplets,
  FileText,
  Gauge,
  MapPin,
  Mountain,
  Navigation,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Users,
  Waves,
  Wind,
  X,
} from "lucide-react";

import { useApp } from "../context/AppContext";

import type { DisasterEvent } from "../api/service";

// =========================================================
// PROBABILITY FORMAT HELPER
// =========================================================

const formatProbability = (probability: number | null | undefined) => {
  if (probability == null) return "Prediction unavailable";
  if (probability === 0) return "0%";
  return `${(probability * 100).toFixed(probability >= 0.995 ? 0 : 1)}%`;
};

// =========================================================
// DASHBOARD VIEW
// =========================================================

export const DashboardView: React.FC = () => {
  const {
    weather,
    alerts,
    shelters,
    disasterEvents,
    setActiveTab,
  } = useApp();

  const [selectedEvent, setSelectedEvent] = useState<DisasterEvent | null>(
    null,
  );

  // =========================================================
  // WEATHER VARIABLES
  // =========================================================

  const rainfall = weather?.rainfall24h;

  const riverLevel = weather?.riverLevel;

  const soilMoisture = weather?.soilMoisture;

  const temperature = weather?.temperature;

  const windSpeed = weather?.windSpeed;

  // =========================================================
  // ACTIVE AI EVENTS
  // =========================================================

  const activeEvents = useMemo(
    () =>
      disasterEvents.filter(
        (event) => event.status?.toUpperCase() === "ACTIVE",
      ),
    [disasterEvents],
  );

  // =========================================================
  // AI FLOOD EVENTS
  // =========================================================

  const activeFloodEvents = useMemo(
    () => activeEvents.filter((event) => event.disasterType === "FLOOD"),
    [activeEvents],
  );

  // =========================================================
  // AI LANDSLIDE EVENTS
  // =========================================================

  const activeLandslideEvents = useMemo(
    () => activeEvents.filter((event) => event.disasterType === "LANDSLIDE"),
    [activeEvents],
  );

  // =========================================================
  // AI CRITICAL EVENTS
  // =========================================================

  const criticalEvents = useMemo(
    () =>
      activeEvents.filter(
        (event) => event.overallRisk?.toUpperCase() === "CRITICAL",
      ),
    [activeEvents],
  );

  // =========================================================
  // AI HIGH EVENTS
  // =========================================================

  const highEvents = useMemo(
    () =>
      activeEvents.filter((event) => event.overallRisk?.toUpperCase() === "HIGH"),
    [activeEvents],
  );

  // =========================================================
  // OTHER EVENTS
  // =========================================================

  const otherEvents = useMemo(
    () =>
      activeEvents.filter(
        (event) =>
          !["CRITICAL", "HIGH"].includes(event.overallRisk?.toUpperCase()),
      ),
    [activeEvents],
  );

  // =========================================================
  // HELPERS
  // =========================================================

  const getRiskColor = (risk: string) => {
    switch (risk?.toUpperCase()) {
      case "CRITICAL":
        return "#b91c1c";

      case "HIGH":
        return "#c2410c";

      case "MEDIUM":
        return "#a16207";

      case "LOW":
        return "#15803d";

      default:
        return "#475569";
    }
  };

  // =========================================================
  // RISK BACKGROUND
  // =========================================================

  const getRiskBackground = (risk: string) => {
    switch (risk?.toUpperCase()) {
      case "CRITICAL":
        return "#fef2f2";

      case "HIGH":
        return "#fff7ed";

      case "MEDIUM":
        return "#fffbeb";

      case "LOW":
        return "#f0fdf4";

      default:
        return "#f8fafc";
    }
  };

  // =========================================================
  // DISASTER ICON
  // =========================================================

  const getDisasterIcon = (type: DisasterEvent["disasterType"]) => {
    if (type === "FLOOD") {
      return <Waves size={20} />;
    }

    return <Mountain size={20} />;
  };

  // =========================================================
  // DISASTER COLOR
  // =========================================================

  const getDisasterColor = (type: DisasterEvent["disasterType"]) => {
    return type === "FLOOD" ? "#1d4ed8" : "#b45309";
  };

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDetectedAt = (detectedAt: string) => {
    const date = new Date(detectedAt);

    if (Number.isNaN(date.getTime())) {
      return detectedAt;
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingBottom: "40px",
      }}
    >
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "7px",
            }}
          >
            <Shield size={17} color="#1d4ed8" strokeWidth={2.2} />

            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#1d4ed8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Emergency Operations
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              lineHeight: 1.15,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.7px",
            }}
          >
            Disaster Intelligence Dashboard
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              maxWidth: "680px",
              color: "#64748b",
              fontSize: "13px",
              lineHeight: 1.5,
            }}
          >
            Centralized situational awareness for AI-detected disaster events,
            risk levels, and emergency response coordination.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            padding: "9px 13px",
            border: "1px solid #d1fae5",
            backgroundColor: "#f0fdf4",
            borderRadius: "8px",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#16a34a",
            }}
          />

          <span
            style={{
              fontSize: "11px",
              fontWeight: 750,
              color: "#166534",
            }}
          >
            Monitoring System Operational
          </span>
        </div>
      </header>

      {/* =====================================================
          CURRENT SITUATION
          ===================================================== */}

      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              Current Situation
            </h2>

            <p
              style={{
                margin: "3px 0 0",
                fontSize: "11px",
                color: "#64748b",
              }}
            >
              Active AI-detected incidents requiring operational attention.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "10px",
          }}
        >
          <SummaryMetric
            label="Active Incidents"
            value={activeEvents.length}
            icon={<ShieldAlert size={18} />}
            accent="#b91c1c"
            background="#fef2f2"
          />

          <SummaryMetric
            label="Critical"
            value={criticalEvents.length}
            icon={<AlertTriangle size={18} />}
            accent="#b91c1c"
            background="#fef2f2"
          />

          <SummaryMetric
            label="Flood Events"
            value={activeFloodEvents.length}
            icon={<Waves size={18} />}
            accent="#1d4ed8"
            background="#eff6ff"
          />

          <SummaryMetric
            label="Landslide Events"
            value={activeLandslideEvents.length}
            icon={<Mountain size={18} />}
            accent="#b45309"
            background="#fff7ed"
          />

          <SummaryMetric
            label="High Risk"
            value={highEvents.length}
            icon={<Gauge size={18} />}
            accent="#c2410c"
            background="#fff7ed"
          />
        </div>
      </section>

      {/* =====================================================
          ACTIVE INCIDENT REGISTER
          ===================================================== */}

      <section
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #dbe3ec",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 18px",
            borderBottom: "1px solid #e5eaf0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ShieldAlert size={17} color="#1d4ed8" />

              <h2
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "#0f172a",
                }}
              >
                Active Incident Register
              </h2>
            </div>

            <p
              style={{
                margin: "5px 0 0 25px",
                fontSize: "11px",
                color: "#64748b",
              }}
            >
              Incidents generated by the disaster prediction pipeline.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "10px",
              fontWeight: 800,
              color: activeEvents.length > 0 ? "#b91c1c" : "#15803d",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor:
                  activeEvents.length > 0 ? "#b91c1c" : "#15803d",
              }}
            />
            {activeEvents.length} Active
          </div>
        </div>

        {activeEvents.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "12px",
              padding: "14px",
            }}
          >
            {activeEvents.map((event) => {
              const riskColor = getRiskColor(event.overallRisk);

              const riskBackground = getRiskBackground(event.overallRisk);

              const disasterColor = getDisasterColor(event.disasterType);

              return (
                <button
                  key={`${event.location}-${event.disasterType}-${event.detectedAt}`}
                  type="button"
                  onClick={() => setSelectedEvent(event)}
                  style={{
                    textAlign: "left",
                    padding: 0,
                    border: `1px solid ${riskColor}30`,
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  {/* TOP BAND */}

                  <div
                    style={{
                      height: "4px",
                      backgroundColor: riskColor,
                    }}
                  />

                  {/* HEADER */}

                  <div
                    style={{
                      padding: "14px",
                      backgroundColor: riskBackground,
                      borderBottom: "1px solid #e5eaf0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "11px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "8px",
                            backgroundColor: "#ffffff",
                            border: `1px solid ${disasterColor}35`,
                            color: disasterColor,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {getDisasterIcon(event.disasterType)}
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize: "15px",
                              fontWeight: 800,
                              color: "#0f172a",
                            }}
                          >
                            {event.location}
                          </div>

                          <div
                            style={{
                              marginTop: "3px",
                              fontSize: "10px",
                              fontWeight: 800,
                              color: disasterColor,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                            }}
                          >
                            {event.disasterType === "FLOOD"
                              ? "Flood Detection"
                              : "Landslide Detection"}
                          </div>
                        </div>
                      </div>

                      <span
                        style={{
                          padding: "5px 8px",
                          borderRadius: "5px",
                          backgroundColor: riskColor,
                          color: "#ffffff",
                          fontSize: "9px",
                          fontWeight: 850,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {event.overallRisk}
                      </span>
                    </div>
                  </div>

                  {/* METRICS */}

                  <div
                    style={{
                      padding: "14px",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                      }}
                    >
                      <IncidentMetric
                        label="AI Probability"
                        value={formatProbability(event.probability)}
                        emphasis
                      />

                      <IncidentMetric label="Status" value={event.status} />

                      <IncidentMetric
                        label="Latitude"
                        value={event.latitude.toFixed(4)}
                      />

                      <IncidentMetric
                        label="Longitude"
                        value={event.longitude.toFixed(4)}
                      />
                    </div>

                    <div
                      style={{
                        marginTop: "13px",
                        paddingTop: "11px",
                        borderTop: "1px solid #eef2f6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "#64748b",
                          fontSize: "10px",
                        }}
                      >
                        <Bell size={12} />
                        Detected {formatDetectedAt(event.detectedAt)}
                      </div>

                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "#1d4ed8",
                          fontSize: "10px",
                          fontWeight: 750,
                        }}
                      >
                        View details
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* =====================================================
          SELECTED INCIDENT
          ===================================================== */}

      {selectedEvent && (
        <IncidentProfile
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* =====================================================
          ENVIRONMENT + INCIDENT DISTRIBUTION
          ===================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.15fr) minmax(320px, 0.85fr)",
          gap: "16px",
        }}
      >
        {/* ===================================================
            ENVIRONMENTAL CONTEXT
            =================================================== */}

        <section style={panelStyle}>
          <PanelHeader
            title="Environmental Context"
            subtitle="Latest environmental indicators available to the dashboard."
            icon={<CloudRain size={17} />}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "9px",
              marginTop: "15px",
            }}
          >
            <ContextMetric
              icon={<CloudRain size={15} />}
              label="Rainfall · 24h"
              value={rainfall !== undefined ? `${rainfall} mm` : "—"}
              status={weather?.rainfallStatus}
              color="#1d4ed8"
            />

            <ContextMetric
              icon={<Waves size={15} />}
              label="River Level"
              value={riverLevel !== undefined ? `${riverLevel} m` : "—"}
              status={weather?.riverStatus}
              color="#0369a1"
            />

            <ContextMetric
              icon={<Droplets size={15} />}
              label="Soil Moisture"
              value={soilMoisture !== undefined ? `${soilMoisture}%` : "—"}
              status={weather?.soilMoistureStatus}
              color="#15803d"
            />

            <ContextMetric
              icon={<Gauge size={15} />}
              label="Temperature"
              value={temperature !== undefined ? `${temperature}°C` : "—"}
              color="#c2410c"
            />

            <ContextMetric
              icon={<Wind size={15} />}
              label="Wind Speed"
              value={windSpeed !== undefined ? `${windSpeed} km/h` : "—"}
              color="#475569"
            />

            <ContextMetric
              icon={<Mountain size={15} />}
              label="Terrain Slope"
              value={
                weather?.terrainSlope !== undefined
                  ? `${weather.terrainSlope}°`
                  : "—"
              }
              color="#6d28d9"
            />
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("Village Analysis")}
            style={{
              ...textButtonStyle,
              marginTop: "14px",
            }}
          >
            Open environmental analysis
            <ArrowRight size={13} />
          </button>
        </section>

        {/* ===================================================
            INCIDENT DISTRIBUTION
            =================================================== */}

        <section style={panelStyle}>
          <PanelHeader
            title="Incident Distribution"
            subtitle="Distribution of currently active AI detections."
            icon={<Gauge size={17} />}
          />

          <div
            style={{
              marginTop: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "17px",
            }}
          >
            <DistributionRow
              label="Flood"
              count={activeFloodEvents.length}
              total={activeEvents.length}
              color="#1d4ed8"
            />

            <DistributionRow
              label="Landslide"
              count={activeLandslideEvents.length}
              total={activeEvents.length}
              color="#b45309"
            />

            <div
              style={{
                paddingTop: "14px",
                borderTop: "1px solid #eef2f6",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
              }}
            >
              <RiskCount
                label="Critical"
                count={criticalEvents.length}
                color="#b91c1c"
              />

              <RiskCount
                label="High"
                count={highEvents.length}
                color="#c2410c"
              />

              <RiskCount
                label="Other"
                count={otherEvents.length}
                color="#475569"
              />
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
          ALERTS + SYSTEM STATUS
          ===================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.15fr) minmax(320px, 0.85fr)",
          gap: "16px",
        }}
      >
        {/* ===================================================
            RECENT ALERTS
            =================================================== */}

        <section style={panelStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <PanelHeader
              title="Recent Alerts"
              subtitle="Notifications currently available to authorities."
              icon={<Bell size={17} />}
            />

            <button
              type="button"
              onClick={() => setActiveTab("Alert Management")}
              style={{
                ...textButtonStyle,
                flexShrink: 0,
              }}
            >
              View all
              <ArrowRight size={12} />
            </button>
          </div>

          {alerts.length === 0 ? (
            <SimpleEmpty text="No alerts available." />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "15px",
              }}
            >
              {alerts.slice(0, 4).map((alert) => {
                const isHigh = alert.severity?.toUpperCase() === "HIGH";

                return (
                  <div
                    key={alert.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      padding: "10px 11px",
                      border: "1px solid #e2e8f0",
                      borderLeft: `3px solid ${isHigh ? "#b91c1c" : "#d97706"}`,
                      borderRadius: "7px",
                      backgroundColor: "#f8fafc",
                    }}
                  >
                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 750,
                          color: "#0f172a",
                        }}
                      >
                        {alert.type}
                      </div>

                      <div
                        style={{
                          marginTop: "3px",
                          fontSize: "9px",
                          color: "#64748b",
                        }}
                      >
                        {alert.area} · {alert.source}
                      </div>
                    </div>

                    <span
                      style={{
                        flexShrink: 0,
                        padding: "4px 7px",
                        borderRadius: "5px",
                        fontSize: "9px",
                        fontWeight: 800,
                        color: isHigh ? "#b91c1c" : "#92400e",
                        backgroundColor: isHigh ? "#fee2e2" : "#fef3c7",
                      }}
                    >
                      {alert.severity}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>


      </div>

      {/* =====================================================
          EMERGENCY RESPONSE READINESS
          ===================================================== */}

      <section style={panelStyle}>
        <PanelHeader
          title="Emergency Response Readiness"
          subtitle="Current shelter availability and operational navigation."
          icon={<Users size={17} />}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: "9px",
            marginTop: "15px",
          }}
        >
          <ResponseMetric
            label="Shelters"
            value={shelters.length}
            icon={<ShieldCheck size={16} />}
          />

          <ResponseMetric
            label="Open Shelters"
            value={
              shelters.filter((shelter) => shelter.status === "Open").length
            }
            icon={<CheckCircle2 size={16} />}
          />

          <ResponseMetric
            label="Available Capacity"
            value={shelters.reduce(
              (total, shelter) => total + shelter.available,
              0,
            )}
            icon={<Users size={16} />}
          />

          <ResponseMetric
            label="Standby Shelters"
            value={
              shelters.filter((shelter) => shelter.status === "Standby").length
            }
            icon={<ShieldAlert size={16} />}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            marginTop: "14px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("Village Analysis")}
            style={secondaryButtonStyle}
          >
            <MapPin size={13} />
            Risk Map
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("Evacuation Planning")}
            style={secondaryButtonStyle}
          >
            <Navigation size={13} />
            Evacuation Planning
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("Reports & Analysis")}
            style={secondaryButtonStyle}
          >
            <FileText size={13} />
            Reports
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("Alert Management")}
            style={primaryButtonStyle}
          >
            <Bell size={13} />
            Alert Management
          </button>
        </div>
      </section>
    </div>
  );
};

// =========================================================
// INCIDENT PROFILE
// =========================================================

const IncidentProfile: React.FC<{
  event: DisasterEvent;
  onClose: () => void;
}> = ({ event, onClose }) => {
  const riskColor =
    event.overallRisk?.toUpperCase() === "CRITICAL"
      ? "#fca5a5"
      : event.overallRisk?.toUpperCase() === "HIGH"
        ? "#c2410c"
        : "#475569";

  const disasterColor = event.disasterType === "FLOOD" ? "#1d4ed8" : "#b45309";

  const disasterTitle =
    event.disasterType === "FLOOD" ? "Flood Detection" : "Landslide Detection";

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #cbd5e1",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "3px",
          backgroundColor: riskColor,
        }}
      />

      <div
        style={{
          padding: "15px 18px",
          borderBottom: "1px solid #e5eaf0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                color: disasterColor,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Incident Profile
            </span>

            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "#94a3b8",
              }}
            />

            <span
              style={{
                fontSize: "10px",
                color: "#64748b",
              }}
            >
              {disasterTitle}
            </span>
          </div>

          <h2
            style={{
              margin: "5px 0 0",
              fontSize: "18px",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            {event.location}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "7px",
            border: "1px solid #dbe3ec",
            backgroundColor: "#ffffff",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          aria-label="Close incident profile"
        >
          <X size={15} />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          backgroundColor: "#e5eaf0",
        }}
      >
        <ProfileMetric
          label="Probability"
          value={formatProbability(event.probability)}
        />

        <ProfileMetric
          label="Risk Level"
          value={event.overallRisk}
          valueColor={riskColor}
        />

        <ProfileMetric
          label="Status"
          value={event.status}
          valueColor="#15803d"
        />

        <ProfileMetric
          label="Event Type"
          value={event.disasterType}
          valueColor={disasterColor}
        />
      </div>

      <div
        style={{
          padding: "16px 18px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <ProfileData
            icon={<MapPin size={14} />}
            label="Latitude"
            value={event.latitude.toFixed(6)}
          />

          <ProfileData
            icon={<MapPin size={14} />}
            label="Longitude"
            value={event.longitude.toFixed(6)}
          />

          <ProfileData
            icon={<Bell size={14} />}
            label="Detected At"
            value={formatProfileDate(event.detectedAt)}
          />

          <ProfileData
            icon={<Shield size={14} />}
            label="Monitoring State"
            value="Active"
          />
        </div>

        <IncidentEvidence event={event} />
      </div>
    </section>
  );
};

// =========================================================
// INCIDENT EVIDENCE
// =========================================================

const IncidentEvidence: React.FC<{
  event: DisasterEvent;
}> = ({ event }) => {
  const evidence = event.evidence;

  if (!evidence) {
    return (
      <div
        style={{
          marginTop: "14px",
          padding: "11px 12px",
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "7px",
          fontSize: "10px",
          color: "#64748b",
        }}
      >
        Prediction evidence is not available for this incident.
      </div>
    );
  }

  const isFlood = event.disasterType === "FLOOD";

  return (
    <div
      style={{
        marginTop: "16px",
        paddingTop: "15px",
        borderTop: "1px solid #e5eaf0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Detection Evidence
          </h3>

          <p
            style={{
              margin: "3px 0 0",
              fontSize: "9px",
              color: "#64748b",
            }}
          >
            Input variables supplied to the disaster prediction pipeline.
          </p>
        </div>

        <span
          style={{
            padding: "4px 7px",
            borderRadius: "5px",
            backgroundColor: "#eff6ff",
            color: "#1d4ed8",
            fontSize: "8px",
            fontWeight: 800,
          }}
        >
          {evidence.source || "Model Input"}
        </span>
      </div>

      {/* =====================================================
          CORE ENVIRONMENTAL VARIABLES
          ===================================================== */}

      <div
        style={{
          marginTop: "12px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "8px",
        }}
      >
        <EvidenceMetric label="Rainfall" value={`${evidence.rainfall} mm`} />

        <EvidenceMetric
          label="Soil Moisture"
          value={`${evidence.soilMoisture}%`}
        />

        <EvidenceMetric
          label="Temperature"
          value={`${evidence.temperature}°C`}
        />

        <EvidenceMetric label="Humidity" value={`${evidence.humidity}%`} />

        <EvidenceMetric
          label="Wind Speed"
          value={`${evidence.windSpeed} km/h`}
        />

        <EvidenceMetric label="Pressure" value={`${evidence.pressure} hPa`} />

        <EvidenceMetric label="Elevation" value={`${evidence.elevation} m`} />
      </div>

      {/* =====================================================
          RADAR
          ===================================================== */}

      <div
        style={{
          marginTop: "14px",
        }}
      >
        <div
          style={{
            fontSize: "9px",
            fontWeight: 800,
            color: "#334155",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "8px",
          }}
        >
          Radar Characteristics
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "8px",
          }}
        >
          <EvidenceMetric
            label="Mean Reflectivity"
            value={`${evidence.reflectivityMean} dBZ`}
          />

          <EvidenceMetric
            label="Maximum Reflectivity"
            value={`${evidence.reflectivityMax} dBZ`}
          />

          <EvidenceMetric
            label="Minimum Reflectivity"
            value={`${evidence.reflectivityMin} dBZ`}
          />

          <EvidenceMetric
            label="Reflectivity Std. Dev."
            value={`${evidence.reflectivityStd}`}
          />

          <EvidenceMetric
            label="Median Reflectivity"
            value={`${evidence.reflectivityMedian} dBZ`}
          />

          <EvidenceMetric
            label="Radar Observations"
            value={`${evidence.radarObservationCount}`}
          />
        </div>
      </div>

      {/* =====================================================
          REFLECTIVITY THRESHOLDS
          ===================================================== */}

      <div
        style={{
          marginTop: "14px",
        }}
      >
        <div
          style={{
            fontSize: "9px",
            fontWeight: 800,
            color: "#334155",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "8px",
          }}
        >
          Reflectivity Threshold Coverage
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
          }}
        >
          <ThresholdMetric
            threshold="≥ 20 dBZ"
            value={evidence.reflectivityGe20Pct}
          />

          <ThresholdMetric
            threshold="≥ 30 dBZ"
            value={evidence.reflectivityGe30Pct}
          />

          <ThresholdMetric
            threshold="≥ 40 dBZ"
            value={evidence.reflectivityGe40Pct}
          />
        </div>
      </div>

      {/* =====================================================
          INTERPRETATION
          ===================================================== */}

      <div
        style={{
          marginTop: "14px",
          padding: "11px 12px",
          border: "1px solid #dbe3ec",
          borderRadius: "7px",
          backgroundColor: "#f8fafc",
        }}
      >
        <div
          style={{
            fontSize: "9px",
            fontWeight: 800,
            color: "#334155",
          }}
        >
          Detection Context
        </div>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: "9px",
            lineHeight: 1.55,
            color: "#64748b",
          }}
        >
          {isFlood
            ? "The flood prediction is based on the environmental and radar variables supplied to the flood prediction model. The values above represent the observation used during this assessment."
            : "The landslide prediction is based on the environmental and radar variables supplied to the landslide prediction model. The values above represent the observation used during this assessment."}
        </p>

        <div
          style={{
            marginTop: "7px",
            fontSize: "8px",
            color: "#94a3b8",
          }}
        >
          Observation time: {formatProfileDate(evidence.observedAt)}
        </div>
      </div>
    </div>
  );
};

// =========================================================
// SUMMARY METRIC
// =========================================================

const SummaryMetric: React.FC<{
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
  background: string;
}> = ({ label, value, icon, accent, background }) => {
  return (
    <div
      style={{
        minHeight: "82px",
        padding: "13px 14px",
        backgroundColor: "#ffffff",
        border: "1px solid #dbe3ec",
        borderRadius: "9px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "#64748b",
          }}
        >
          {label}
        </div>

        <div
          style={{
            marginTop: "4px",
            fontSize: "23px",
            fontWeight: 850,
            color: "#0f172a",
          }}
        >
          {value}
        </div>
      </div>

      <div
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "8px",
          backgroundColor: background,
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
    </div>
  );
};

// =========================================================
// PANEL HEADER
// =========================================================

const PanelHeader: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}> = ({ title, subtitle, icon }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "9px",
      }}
    >
      <div
        style={{
          width: "31px",
          height: "31px",
          borderRadius: "7px",
          backgroundColor: "#eff6ff",
          color: "#1d4ed8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: 800,
            color: "#0f172a",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: "3px 0 0",
            fontSize: "10px",
            color: "#64748b",
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

// =========================================================
// INCIDENT METRIC
// =========================================================

const IncidentMetric: React.FC<{
  label: string;
  value: string;
  emphasis?: boolean;
}> = ({ label, value, emphasis }) => {
  return (
    <div>
      <div
        style={{
          fontSize: "8px",
          fontWeight: 750,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: "3px",
          fontSize: emphasis ? "15px" : "11px",
          fontWeight: 800,
          color: "#334155",
        }}
      >
        {value}
      </div>
    </div>
  );
};

// =========================================================
// CONTEXT METRIC
// =========================================================

const ContextMetric: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  status?: string;
  color: string;
}> = ({ icon, label, value, status, color }) => {
  return (
    <div
      style={{
        padding: "11px",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "9px",
          fontWeight: 700,
          color: "#64748b",
        }}
      >
        <span
          style={{
            color,
          }}
        >
          {icon}
        </span>

        {label}
      </div>

      <div
        style={{
          marginTop: "7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "7px",
        }}
      >
        <span
          style={{
            fontSize: "15px",
            fontWeight: 800,
            color: "#0f172a",
          }}
        >
          {value}
        </span>

        {status && (
          <span
            style={{
              padding: "3px 5px",
              borderRadius: "4px",
              backgroundColor: "#ffffff",
              color,
              fontSize: "8px",
              fontWeight: 750,
            }}
          >
            {status}
          </span>
        )}
      </div>
    </div>
  );
};

// =========================================================
// DISTRIBUTION ROW
// =========================================================

const DistributionRow: React.FC<{
  label: string;
  count: number;
  total: number;
  color: string;
}> = ({ label, count, total, color }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 750,
            color: "#334155",
          }}
        >
          {label}
        </span>

        <span
          style={{
            fontSize: "10px",
            fontWeight: 800,
            color,
          }}
        >
          {count}
        </span>
      </div>

      <div
        style={{
          height: "5px",
          borderRadius: "10px",
          backgroundColor: "#e9eef4",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(Math.max(percentage, 0), 100)}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: "10px",
            transition: "width 0.25s ease",
          }}
        />
      </div>
    </div>
  );
};

// =========================================================
// RISK COUNT
// =========================================================

const RiskCount: React.FC<{
  label: string;
  count: number;
  color: string;
}> = ({ label, count, color }) => {
  return (
    <div
      style={{
        padding: "9px",
        textAlign: "center",
        backgroundColor: "#f8fafc",
        borderRadius: "7px",
      }}
    >
      <div
        style={{
          fontSize: "18px",
          fontWeight: 850,
          color,
        }}
      >
        {count}
      </div>

      <div
        style={{
          marginTop: "2px",
          fontSize: "8px",
          fontWeight: 700,
          color: "#64748b",
        }}
      >
        {label}
      </div>
    </div>
  );
};

// =========================================================
// RESPONSE METRIC
// =========================================================

const ResponseMetric: React.FC<{
  label: string;
  value: number;
  icon: React.ReactNode;
}> = ({ label, value, icon }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "9px",
        padding: "11px",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "31px",
          height: "31px",
          borderRadius: "7px",
          backgroundColor: "#eff6ff",
          color: "#1d4ed8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: "17px",
            fontWeight: 850,
            color: "#0f172a",
          }}
        >
          {value}
        </div>

        <div
          style={{
            marginTop: "1px",
            fontSize: "8px",
            fontWeight: 700,
            color: "#64748b",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

// =========================================================
// PROFILE METRIC
// =========================================================

const ProfileMetric: React.FC<{
  label: string;
  value: string;
  valueColor?: string;
}> = ({ label, value, valueColor }) => {
  return (
    <div
      style={{
        padding: "11px 13px",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          fontSize: "8px",
          color: "#94a3b8",
          fontWeight: 750,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: "4px",
          fontSize: "12px",
          fontWeight: 800,
          color: valueColor || "#334155",
        }}
      >
        {value}
      </div>
    </div>
  );
};

// =========================================================
// PROFILE DATA
// =========================================================

const ProfileData: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "9px",
        padding: "9px",
        border: "1px solid #e2e8f0",
        borderRadius: "7px",
        backgroundColor: "#f8fafc",
      }}
    >
      <span
        style={{
          color: "#64748b",
          display: "flex",
        }}
      >
        {icon}
      </span>

      <div>
        <div
          style={{
            fontSize: "8px",
            fontWeight: 700,
            color: "#94a3b8",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>

        <div
          style={{
            marginTop: "2px",
            fontSize: "10px",
            fontWeight: 750,
            color: "#334155",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

// =========================================================
// EMPTY INCIDENT STATE
// =========================================================

const EmptyState: React.FC = () => {
  return (
    <div
      style={{
        padding: "45px 20px",
        textAlign: "center",
      }}
    >
      <ShieldCheck size={28} color="#15803d" />

      <div
        style={{
          marginTop: "9px",
          fontSize: "13px",
          fontWeight: 750,
          color: "#334155",
        }}
      >
        No active incidents
      </div>

      <div
        style={{
          marginTop: "3px",
          fontSize: "10px",
          color: "#94a3b8",
        }}
      >
        No high or critical disaster events are currently reported by the
        prediction pipeline.
      </div>
    </div>
  );
};

// =========================================================
// SIMPLE EMPTY
// =========================================================

const SimpleEmpty: React.FC<{
  text: string;
}> = ({ text }) => {
  return (
    <div
      style={{
        marginTop: "15px",
        padding: "20px",
        backgroundColor: "#f8fafc",
        borderRadius: "8px",
        textAlign: "center",
        color: "#64748b",
        fontSize: "10px",
      }}
    >
      {text}
    </div>
  );
};

// =========================================================
// EVIDENCE METRIC
// =========================================================

const EvidenceMetric: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  return (
    <div
      style={{
        padding: "10px 11px",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "7px",
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontSize: "8px",
          fontWeight: 700,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "11px",
          fontWeight: 750,
          color: "#334155",
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
};

// =========================================================
// THRESHOLD METRIC
// =========================================================

const ThresholdMetric: React.FC<{
  threshold: string;
  value: number;
}> = ({ threshold, value }) => {
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100);

  return (
    <div
      style={{
        padding: "11px 12px",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "7px",
      }}
    >
      <div
        style={{
          fontSize: "9px",
          fontWeight: 700,
          color: "#64748b",
          marginBottom: "7px",
        }}
      >
        {threshold}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "3px",
        }}
      >
        <span
          style={{
            fontSize: "17px",
            fontWeight: 800,
            color: "#0f172a",
          }}
        >
          {safeValue}
        </span>

        <span
          style={{
            fontSize: "9px",
            fontWeight: 600,
            color: "#94a3b8",
          }}
        >
          %
        </span>
      </div>

      <div
        style={{
          marginTop: "7px",
          height: "4px",
          backgroundColor: "#e2e8f0",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${safeValue}%`,
            height: "100%",
            backgroundColor: "#1d61f2",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
};

// =========================================================
// PROFILE DATE
// =========================================================

const formatProfileDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// =========================================================
// SHARED STYLES
// =========================================================

const panelStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",

  border: "1px solid #dbe3ec",

  borderRadius: "12px",

  padding: "17px",
};

// =========================================================
// TEXT BUTTON
// =========================================================

const textButtonStyle: React.CSSProperties = {
  display: "inline-flex",

  alignItems: "center",

  gap: "4px",

  border: "none",

  background: "none",

  padding: 0,

  color: "#1d4ed8",

  fontSize: "10px",

  fontWeight: 750,

  cursor: "pointer",
};

// =========================================================
// SECONDARY BUTTON
// =========================================================

const secondaryButtonStyle: React.CSSProperties = {
  display: "inline-flex",

  alignItems: "center",

  gap: "6px",

  padding: "8px 11px",

  borderRadius: "7px",

  border: "1px solid #cbd5e1",

  backgroundColor: "#ffffff",

  color: "#334155",

  fontSize: "10px",

  fontWeight: 750,

  cursor: "pointer",
};

// =========================================================
// PRIMARY BUTTON
// =========================================================

const primaryButtonStyle: React.CSSProperties = {
  display: "inline-flex",

  alignItems: "center",

  gap: "6px",

  padding: "8px 11px",

  borderRadius: "7px",

  border: "1px solid #1d4ed8",

  backgroundColor: "#1d4ed8",

  color: "#ffffff",

  fontSize: "10px",

  fontWeight: 750,

  cursor: "pointer",
};
