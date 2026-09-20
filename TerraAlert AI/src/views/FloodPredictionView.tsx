import React from "react";
import {
  Droplets,
  RefreshCw,
  Radio,
  ShieldAlert,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const FloodPredictionView: React.FC = () => {
  const { disasterEvents, refreshData } = useApp();

  // Filter backend disaster events for flood predictions
  const floodEvents = disasterEvents.filter(
    (event) => event.disasterType === "FLOOD"
  );

  const getRiskColor = (level: string) => {
    switch (level?.toUpperCase()) {
      case "HIGH":
      case "CRITICAL":
        return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca", badgeBg: "#ef4444" };
      case "MEDIUM":
      case "MODERATE":
        return { bg: "#fffbeb", text: "#d97706", border: "#fde68a", badgeBg: "#f59e0b" };
      default:
        return { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0", badgeBg: "#22c55e" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "1280px", margin: "0 auto" }}>
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
              <Droplets style={{ width: "24px", height: "24px" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                Flood Risk Monitoring
              </h1>
              <span style={{ fontSize: "12px", color: "#0284c7", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                <Activity style={{ width: "14px", height: "14px" }} />
                Automated Backend Pipeline — Display Only
              </span>
            </div>
          </div>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "6px" }}>
            Real-time flood risk predictions automatically computed by the Data Ingestion and Processing microservices using historical weather observation and GridRad radar features.
          </p>
        </div>

        {/* REFRESH BUTTON */}
        <button
          onClick={refreshData}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            backgroundColor: "#0284c7",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)",
          }}
        >
          <RefreshCw style={{ width: "16px", height: "16px" }} />
          <span>Refresh Backend Data</span>
        </button>
      </div>

      {/* DISASTER EVENTS DISPLAY */}
      {floodEvents.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {floodEvents.map((event, index) => {
            const riskColor = getRiskColor(event.riskLevel);
            const probPct = (event.probability * 100).toFixed(1);
            const ev = event.evidence;

            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  padding: "24px",
                  border: `2px solid ${riskColor.badgeBg}`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* CARD HEADER */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                      {event.location}
                    </h2>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      Coordinates: {event.latitude.toFixed(4)}, {event.longitude.toFixed(4)}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ backgroundColor: riskColor.badgeBg, color: "#ffffff", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 700 }}>
                      {event.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                </div>

                {/* PROBABILITY DISPLAY & OVERALL RISK */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                  <div style={{ backgroundColor: riskColor.bg, borderRadius: "12px", padding: "20px", border: `1px solid ${riskColor.border}`, textAlign: "center" }}>
                    <span style={{ fontSize: "13px", color: riskColor.text, fontWeight: 600 }}>Backend Flood Probability</span>
                    <div style={{ fontSize: "40px", fontWeight: 800, color: riskColor.text, margin: "8px 0" }}>
                      {probPct}%
                    </div>
                    <div style={{ width: "100%", height: "8px", backgroundColor: "#e2e8f0", borderRadius: "4px", overflow: "hidden", marginTop: "8px" }}>
                      <div style={{ width: `${probPct}%`, height: "100%", backgroundColor: riskColor.badgeBg, borderRadius: "4px" }} />
                    </div>
                  </div>

                  <div style={{ backgroundColor: "#f8fafc", borderRadius: "12px", padding: "20px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px" }}>
                    <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Pipeline Assessment Summary</div>
                    <div style={{ fontSize: "14px", color: "#1e293b" }}>
                      <strong>Overall Risk:</strong> {event.overallRisk || event.riskLevel}
                    </div>
                    <div style={{ fontSize: "14px", color: "#1e293b" }}>
                      <strong>Status:</strong> {event.status}
                    </div>
                    <div style={{ fontSize: "14px", color: "#1e293b" }}>
                      <strong>Detected At:</strong> {event.detectedAt ? new Date(event.detectedAt).toLocaleString() : "N/A"}
                    </div>
                  </div>
                </div>

                {/* EVIDENCE / FEATURES GRID */}
                {ev && (
                  <div style={{ backgroundColor: "#f8fafc", padding: "18px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#334155", margin: "0 0 12px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Radio style={{ width: "16px", height: "16px", color: "#0284c7" }} />
                      Backend Ingested Weather & GridRad Radar Features
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", fontSize: "12px" }}>
                      <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                        <span style={{ color: "#64748b", display: "block" }}>Rainfall</span>
                        <strong style={{ color: "#0f172a" }}>{ev.rainfall != null ? `${ev.rainfall} mm` : "N/A"}</strong>
                      </div>
                      <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                        <span style={{ color: "#64748b", display: "block" }}>Soil Moisture</span>
                        <strong style={{ color: "#0f172a" }}>{ev.soilMoisture != null ? `${ev.soilMoisture}%` : "N/A"}</strong>
                      </div>
                      <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                        <span style={{ color: "#64748b", display: "block" }}>Temperature</span>
                        <strong style={{ color: "#0f172a" }}>{ev.temperature != null ? `${ev.temperature} °C` : "N/A"}</strong>
                      </div>
                      <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                        <span style={{ color: "#64748b", display: "block" }}>Reflectivity Mean</span>
                        <strong style={{ color: "#0f172a" }}>{ev.reflectivityMean != null ? `${ev.reflectivityMean} dBZ` : "N/A"}</strong>
                      </div>
                      <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                        <span style={{ color: "#64748b", display: "block" }}>Reflectivity Max</span>
                        <strong style={{ color: "#0f172a" }}>{ev.reflectivityMax != null ? `${ev.reflectivityMax} dBZ` : "N/A"}</strong>
                      </div>
                      <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                        <span style={{ color: "#64748b", display: "block" }}>Coverage ≥ 20 dBZ</span>
                        <strong style={{ color: "#0f172a" }}>{ev.reflectivityGe20Pct != null ? `${ev.reflectivityGe20Pct}%` : "N/A"}</strong>
                      </div>
                      <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                        <span style={{ color: "#64748b", display: "block" }}>Radar Obs Count</span>
                        <strong style={{ color: "#0f172a" }}>{ev.radarObservationCount != null ? ev.radarObservationCount : "N/A"}</strong>
                      </div>
                      <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                        <span style={{ color: "#64748b", display: "block" }}>Source</span>
                        <strong style={{ color: "#0f172a" }}>{ev.source || "Backend Pipeline"}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* DIRECTIVE */}
                <div style={{ backgroundColor: "#f1f5f9", padding: "14px", borderRadius: "10px", borderLeft: `4px solid ${riskColor.badgeBg}` }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "flex", alignItems: "center", gap: "6px" }}>
                    <ShieldAlert style={{ width: "16px", height: "16px", color: riskColor.badgeBg }} />
                    Recommended Directive
                  </span>
                  <p style={{ fontSize: "13px", color: "#475569", marginTop: "4px", margin: 0, lineHeight: 1.4 }}>
                    {event.riskLevel === "HIGH" || event.riskLevel === "CRITICAL" || event.riskLevel === "Critical"
                      ? "Immediate flood warning. Alert emergency rescue teams, open high-elevation shelters, and issue evacuation advisories."
                      : event.riskLevel === "MEDIUM" || event.riskLevel === "Moderate"
                      ? "Elevated flood risk. Monitor river sensors, inspect drainage channels, and keep field rescue units on standby."
                      : "Normal flood risk level. Continue standard automated meteorological and radar monitoring."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "48px 24px", border: "1px solid #e2e8f0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#f0f9ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
            <CheckCircle2 style={{ width: "32px", height: "32px", color: "#0284c7" }} />
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b", margin: 0 }}>No Flood Events Currently Reported</h3>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "8px", maxWidth: "420px" }}>
            The backend automated ingestion pipeline has not registered any active flood events. Click "Refresh Backend Data" above to query the latest disaster results.
          </p>
        </div>
      )}
    </div>
  );
};

