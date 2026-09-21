import React from "react";
import { Share2, ArrowLeft, Maximize2 } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useApp } from "../context/AppContext";

export const VillageAnalysisView: React.FC = () => {
  const {
    selectedVillage,
    setSelectedVillage,
    villages,
    weather,
    setActiveTab,
    disasterEvents,
  } = useApp();

  const villageEvents = disasterEvents.filter((e) => e.location === selectedVillage);
  const floodEvent = villageEvents.find((e) => e.disasterType === "FLOOD");
  const landslideEvent = villageEvents.find((e) => e.disasterType === "LANDSLIDE");
  
  const overallRisk = villageEvents.length > 0 ? villageEvents[0].overallRisk : "UNKNOWN";
  const evidence = villageEvents.length > 0 ? villageEvents[0].evidence : null;

  const formatProbability = (probability: number | null | undefined) => {
    if (probability == null) return "Prediction unavailable";
    if (probability === 0) return "0%";
    return `${(probability * 100).toFixed(probability >= 0.995 ? 0 : 1)}%`;
  };

  const mapLatitude = 29.7604;
  const mapLongitude = -95.3698;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingBottom: "40px",
      }}
    >
      {/* Top Bar Navigation Breadcrumb & Village Switcher */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setActiveTab("Dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#1d61f2",
              background: "none",
              fontWeight: 600,
              fontSize: "13px",
            }}
          >
            <ArrowLeft style={{ width: "16px", height: "16px" }} />
            <span>Village Analysis</span>
          </button>

          <span style={{ color: "#94a3b8" }}>/</span>

          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            {selectedVillage}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "13px",
              fontWeight: 600,
              color: "#334155",
              backgroundColor: "#ffffff",
            }}
          >
            {villages.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              fontSize: "13px",
              fontWeight: 600,
              color: "#334155",
            }}
          >
            <span>Share Report</span>
            <Share2 style={{ width: "14px", height: "14px" }} />
          </button>
        </div>
      </div>

      {/* Main Row: Risk Summary + Environment Indicators + Location Map */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr 1.3fr",
          gap: "20px",
        }}
      >
        {/* Risk Summary Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "20px",
            }}
          >
            Risk Summary
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Flood Risk
              </span>

              <span
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "#ef4444",
                  display: "block",
                  lineHeight: 1,
                }}
              >
                {formatProbability(floodEvent?.probability)}
              </span>

              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#ef4444",
                }}
              >
                {floodEvent?.riskLevel || "UNKNOWN"}
              </span>
            </div>

            <div>
              <span
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Landslide Risk
              </span>

              <span
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "#f97316",
                  display: "block",
                  lineHeight: 1,
                }}
              >
                {formatProbability(landslideEvent?.probability)}
              </span>

              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#f97316",
                }}
              >
                {landslideEvent?.riskLevel || "UNKNOWN"}
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: "16px",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#64748b",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Overall Risk
            </span>

            <span
              style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#ef4444",
                display: "block",
              }}
            >
              {overallRisk}
            </span>

            <div style={{ marginTop: "16px" }}>
              <span
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  display: "block",
                }}
              >
                AI Confidence
              </span>

              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "#16a34a",
                }}
              >
                91%
              </span>
            </div>
          </div>
        </div>

        {/* Environment Indicators */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "20px",
            }}
          >
            Environment Indicators
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              flex: 1,
            }}
          >
            {/* Rainfall */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: "10px",
              }}
            >
              <span style={{ fontSize: "13px", color: "#475569" }}>
                Rainfall (24h)
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  {evidence?.rainfall ?? weather?.rainfall24h ?? "N/A"} mm
                </span>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#ef4444",
                  }}
                >
                  Very High
                </span>
              </div>
            </div>

            {/* River Level */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: "10px",
              }}
            >
              <span style={{ fontSize: "13px", color: "#475569" }}>
                River Level
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  {weather?.riverLevel ?? "N/A"} m
                </span>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#ef4444",
                  }}
                >
                  Danger
                </span>
              </div>
            </div>

            {/* Soil Moisture */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: "10px",
              }}
            >
              <span style={{ fontSize: "13px", color: "#475569" }}>
                Soil Moisture
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  {evidence?.soilMoisture !== undefined ? evidence.soilMoisture * 100 : weather?.soilMoisture ?? "N/A"}%
                </span>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#ef4444",
                  }}
                >
                  Very High
                </span>
              </div>
            </div>

            {/* Terrain Slope */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: "10px",
              }}
            >
              <span style={{ fontSize: "13px", color: "#475569" }}>
                Terrain Slope
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  {weather?.terrainSlope ?? "N/A"}°
                </span>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#ef4444",
                  }}
                >
                  High
                </span>
              </div>
            </div>

            {/* Land Use Change */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "13px", color: "#475569" }}>
                Land Use Change
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  {weather?.landUseChange ?? "N/A"}%
                </span>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#f97316",
                  }}
                >
                  Moderate
                </span>
              </div>
            </div>
          </div>

          <button
            style={{
              color: "#1d61f2",
              fontWeight: 600,
              fontSize: "13px",
              background: "none",
              alignSelf: "flex-start",
              marginTop: "16px",
            }}
          >
            View Trend
          </button>
        </div>

        {/* Location Map Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "20px",
            }}
          >
            Location Map
          </h3>

          <div
            style={{
              position: "relative",
              width: "100%",
              flex: 1,
              minHeight: "220px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #cbd5e1",
            }}
          >
            <MapContainer
              center={[mapLatitude, mapLongitude]}
              zoom={11}
              style={{
                width: "100%",
                height: "100%",
                minHeight: "220px",
              }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <CircleMarker
                center={[mapLatitude, mapLongitude]}
                radius={10}
                pathOptions={{
                  color: "#ffffff",
                  fillColor: "#ef4444",
                  fillOpacity: 0.9,
                  weight: 3,
                }}
              >
                <Popup>
                  <strong>{selectedVillage}</strong>
                  <br />
                  Current Risk Location
                  <br />
                  Flood Risk: {formatProbability(floodEvent?.probability)}
                  <br />
                  Landslide Risk: {formatProbability(landslideEvent?.probability)}
                </Popup>
              </CircleMarker>
            </MapContainer>
          </div>

          <button
            onClick={() => setActiveTab("Risk Monitoring")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#1d61f2",
              fontWeight: 600,
              fontSize: "13px",
              background: "none",
              alignSelf: "flex-end",
              marginTop: "16px",
            }}
          >
            <span>View in Risk Monitoring</span>
            <Maximize2 style={{ width: "14px", height: "14px" }} />
          </button>
        </div>
      </div>

      {/* Bottom Row: Historical Events + AI Insight */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "20px",
        }}
      >
        {/* Historical Events */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "20px",
            }}
          >
            Historical Events
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "#f8fafc",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#475569",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Frost Event (5 Years)
              </span>

              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "#0f172a",
                }}
              >
                4 Times
              </span>
            </div>

            <div
              style={{
                backgroundColor: "#f8fafc",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#475569",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Torrential Event (5 Years)
              </span>

              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "#0f172a",
                }}
              >
                3 Years
              </span>
            </div>

            <div
              style={{
                backgroundColor: "#f8fafc",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#475569",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Last Flood
              </span>

              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "#ef4444",
                }}
              >
                Aug 2018
              </span>
            </div>

            <div
              style={{
                backgroundColor: "#f8fafc",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#475569",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Last Landslide
              </span>

              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "#f97316",
                }}
              >
                Jul 2020
              </span>
            </div>
          </div>
        </div>

        {/* AI Insight Card with Action Buttons */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "16px",
            }}
          >
            AI Insight
          </h3>

          <p
            style={{
              fontSize: "13px",
              color: "#334155",
              lineHeight: 1.6,
              marginBottom: "24px",
              backgroundColor: "#f0f9ff",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #bae6fd",
            }}
          >
            High rainfall and high river level with saturated soil conditions
            indicate very high probability of flooding in low-lying areas within
            next 6 hours.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
              marginTop: "auto",
            }}
          >
            <button
              onClick={() => setActiveTab("Dashboard")}
              style={{
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#1d61f2",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Open in Risk Map
            </button>

            <button
              onClick={() => setActiveTab("Shelter Management")}
              style={{
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#1d61f2",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Nearby Shelters
            </button>

            <button
              onClick={() => setActiveTab("Evacuation Planning")}
              style={{
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#1d61f2",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Plan Evacuation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
