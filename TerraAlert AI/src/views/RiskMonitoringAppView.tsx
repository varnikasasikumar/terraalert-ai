import React, { useState } from "react";
import { Layers, ZoomIn, ZoomOut, Target, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
export const RiskMonitoringAppView: React.FC = () => {
  const { setActiveTab, disasterEvents } = useApp();

  // Layer checkboxes toggle states matching Desktop - 8 screenshot
  const [layers, setLayers] = useState({
    riskHeatMap: true,
    floodRisk: true,
    landslideRisk: false,
    rainfall: false,
    river: false,
    roads: false,
    villages: true,
    shelters: true,
    hospitals: true,
    fireStations: true,
    policeStations: true,
    schools: true,
    satelliteView: true,
  });

  const activeDisasterEvents = disasterEvents || [];

  const criticalCount = activeDisasterEvents.filter(
    (event) => event.overallRisk === "CRITICAL",
  ).length;

  const highCount = activeDisasterEvents.filter(
    (event) => event.overallRisk === "HIGH",
  ).length;

  const moderateCount = activeDisasterEvents.filter(
    (event) => event.overallRisk === "MODERATE" || event.overallRisk === "MEDIUM",
  ).length;

  const lowCount = activeDisasterEvents.filter(
    (event) => event.overallRisk === "LOW",
  ).length;

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingBottom: "40px",
      }}
    >
      {/* Top Bar Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>
          Risk Monitoring Map
        </h3>
      </div>

      {/* Main Interactive Map View Container (Desktop - 8) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "520px",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #cbd5e1",
          backgroundColor: "#070a0e",
        }}
      >
        {/* REAL LEAFLET MAP */}
        <MapContainer
          center={[29.7604, -95.3698]}
          zoom={4}
          scrollWheelZoom={true}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {activeDisasterEvents.map((event, index) => {
            if (event.latitude == null || event.longitude == null) {
              return null;
            }


            return (
              <Marker
                key={`${event.location}-${event.disasterType}-${index}`}
                position={[event.latitude, event.longitude]}
              >
                <Popup>
                  <div style={{ minWidth: "180px" }}>
                    <strong>{event.location}</strong>
                    <br />
                    Disaster: {event.disasterType}
                    <br />
                    Probability: {event.probability == null ? "Prediction unavailable" : (event.probability === 0 ? "0%" : `${(event.probability * 100).toFixed(event.probability >= 0.995 ? 0 : 1)}%`)}
                    <br />
                    Risk: <strong>{event.riskLevel}</strong>
                    <br />
                    Overall Risk: <strong>{event.overallRisk}</strong>
                    <br />
                    Status: {event.status}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        {/* Dynamic Risk Heat Map Layer Overlay */}
        {layers.riskHeatMap && (
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "20%",
              width: "450px",
              height: "320px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(239, 68, 68, 0.85) 0%, rgba(249, 115, 22, 0.7) 40%, rgba(234, 179, 8, 0.45) 70%, transparent 100%)",
              filter: "blur(20px)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Map Control Buttons Top-Left (Zoom, Recenter, Layer Switch) */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            zIndex: 10,
          }}
        >
          <button
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f172a",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <ZoomIn style={{ width: "18px", height: "18px" }} />
          </button>
          <button
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f172a",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <ZoomOut style={{ width: "18px", height: "18px" }} />
          </button>
          <button
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f172a",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <Target style={{ width: "18px", height: "18px" }} />
          </button>
          <button
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f172a",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <Layers style={{ width: "18px", height: "18px" }} />
          </button>
        </div>

        {/* Map Layers Checkbox Control Panel Top-Right */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "200px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            padding: "14px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 10,
            border: "1px solid #e2e8f0",
          }}
        >
          <h4
            style={{
              fontSize: "13px",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Map Layers</span>
            <Layers
              style={{ width: "14px", height: "14px", color: "#64748b" }}
            />
          </h4>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              maxHeight: "340px",
              overflowY: "auto",
              fontSize: "12px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={layers.riskHeatMap}
                onChange={() => toggleLayer("riskHeatMap")}
              />
              <span style={{ fontWeight: 600 }}>Risk Heat Map</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={layers.floodRisk}
                onChange={() => toggleLayer("floodRisk")}
              />
              <span>Flood Risk</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={layers.landslideRisk}
                onChange={() => toggleLayer("landslideRisk")}
              />
              <span>Landslide Risk</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={layers.rainfall}
                onChange={() => toggleLayer("rainfall")}
              />
              <span>Rainfall</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={layers.river}
                onChange={() => toggleLayer("river")}
              />
              <span>River</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={layers.roads}
                onChange={() => toggleLayer("roads")}
              />
              <span>Roads</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={layers.villages}
                onChange={() => toggleLayer("villages")}
              />
              <span>Villages</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={layers.shelters}
                onChange={() => toggleLayer("shelters")}
              />
              <span>Shelters</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={layers.hospitals}
                onChange={() => toggleLayer("hospitals")}
              />
              <span>Hospitals</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={layers.fireStations}
                onChange={() => toggleLayer("fireStations")}
              />
              <span>Fire Stations</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={layers.policeStations}
                onChange={() => toggleLayer("policeStations")}
              />
              <span>Police Stations</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={layers.schools}
                onChange={() => toggleLayer("schools")}
              />
              <span>Schools</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#334155",
                marginTop: "4px",
                paddingTop: "4px",
                borderTop: "1px solid #e2e8f0",
              }}
            >
              <input
                type="checkbox"
                checked={layers.satelliteView}
                onChange={() => toggleLayer("satelliteView")}
              />
              <span style={{ fontWeight: 700 }}>Satellite View</span>
            </label>
          </div>
        </div>

        {/* Risk Level Floating Legend Panel Bottom-Left */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 10,
            border: "1px solid #e2e8f0",
            fontSize: "12px",
          }}
        >
          <h5
            style={{ fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}
          >
            Risk Level
          </h5>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#ef4444",
                }}
              />
              <span style={{ color: "#ef4444", fontWeight: 700 }}>
                Critical
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#f97316",
                }}
              />
              <span style={{ color: "#f97316", fontWeight: 700 }}>High</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#eab308",
                }}
              />
              <span style={{ color: "#d97706", fontWeight: 700 }}>
                Moderate
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                }}
              />
              <span style={{ color: "#16a34a", fontWeight: 700 }}>Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar with Risk Counts and Navigation Button */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "16px 24px",
          border: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "#fef2f2",
                color: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
              }}
            >
              !
            </div>
            <div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#ef4444",
                  display: "block",
                }}
              >
                Critical
              </span>
              <span style={{ fontSize: "11px", color: "#64748b" }}>
                {criticalCount} Events
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "#fff7ed",
                color: "#f97316",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
              }}
            >
              ▲
            </div>
            <div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#f97316",
                  display: "block",
                }}
              >
                High
              </span>
              <span style={{ fontSize: "11px", color: "#64748b" }}>
                {highCount} Events
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "#fffbeb",
                color: "#d97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
              }}
            >
              ●
            </div>
            <div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#d97706",
                  display: "block",
                }}
              >
                Moderate
              </span>
              <span style={{ fontSize: "11px", color: "#64748b" }}>
                {moderateCount} Events
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "#f0fdf4",
                color: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
              }}
            >
              ✓
            </div>
            <div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#16a34a",
                  display: "block",
                }}
              >
                Low
              </span>
              <span style={{ fontSize: "11px", color: "#64748b" }}>
                {lowCount} Events
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("Village Analysis")}
          style={{
            padding: "12px 24px",
            borderRadius: "10px",
            backgroundColor: "#1d61f2",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 14px rgba(29, 97, 242, 0.4)",
          }}
        >
          <span>Village Analysis</span>
          <ArrowRight style={{ width: "16px", height: "16px" }} />
        </button>
      </div>
    </div>
  );
};
