import React from "react";
import {
  Mountain,
  RefreshCw,
  Info,
  ShieldAlert,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const LandslidePredictionView: React.FC = () => {
  const { disasterEvents, refreshData } = useApp();

  // Filter backend disaster events for landslide predictions
  const landslideEvents = disasterEvents.filter(
    (event) => event.disasterType === "LANDSLIDE"
  );

  const getRiskColor = (risk: string) => {
    switch (risk?.toUpperCase()) {
      case "HIGH":
      case "CRITICAL":
        return { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca", badgeBg: "#dc2626" };
      case "MEDIUM":
      case "MODERATE":
        return { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa", badgeBg: "#ea580c" };
      case "LOW":
        return { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0", badgeBg: "#16a34a" };
      default:
        return { bg: "#f8fafc", text: "#475569", border: "#cbd5e1", badgeBg: "#64748b" };
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "1280px",
        margin: "0 auto",
        paddingBottom: "40px",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            <Mountain size={20} color="#b45309" strokeWidth={2.2} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#b45309",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              ML Decision Support
            </span>
            <span style={{ fontSize: "12px", color: "#b45309", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", marginLeft: "12px" }}>
              <Activity style={{ width: "14px", height: "14px" }} />
              Automated Backend Pipeline — Display Only
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.7px",
            }}
          >
            Landslide Risk Monitoring
          </h1>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
              lineHeight: 1.5,
              maxWidth: "720px",
            }}
          >
            Landslide risk predictions automatically calculated by the Data Processing Service using historical multi-day cumulative rainfall accumulators (1d, 3d, 7d, 15d, 32d) and daily temperature bounds.
          </p>
        </div>

        {/* REFRESH BUTTON */}
        <button
          onClick={refreshData}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            backgroundColor: "#b45309",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 12px rgba(180, 83, 9, 0.3)",
          }}
        >
          <RefreshCw style={{ width: "16px", height: "16px" }} />
          <span>Refresh Backend Data</span>
        </button>
      </header>

      {/* Scientific Limitation Disclaimer Banner */}
      <div
        style={{
          backgroundColor: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "12px",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#1e40af",
          fontSize: "12.5px",
        }}
      >
        <Info size={20} style={{ flexShrink: 0, color: "#2563eb" }} />
        <div>
          <strong>Scientific Model Notice:</strong> Operates on the{" "}
          <strong>Landslide Baseline Model</strong> (Scikit-Learn Random
          Forest). Evaluates multi-day precipitation accumulators (1, 3, 7, 15,
          32 days) and temperature extremes computed from historical weather data.
        </div>
      </div>

      {/* DISASTER EVENTS DISPLAY */}
      {landslideEvents.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {landslideEvents.map((event, index) => {
            const riskStyle = getRiskColor(event.riskLevel);
            const probPct = (event.probability * 100).toFixed(1);
            const ev = event.evidence;

            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "24px",
                  border: `2px solid ${riskStyle.badgeBg}`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* CARD HEADER */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                      {event.location}
                    </h2>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      Coordinates: {event.latitude.toFixed(4)}, {event.longitude.toFixed(4)}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ backgroundColor: riskStyle.badgeBg, color: "#ffffff", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 800 }}>
                      {event.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                </div>

                {/* PROBABILITY DISPLAY & OVERALL RISK */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                  <div style={{ backgroundColor: riskStyle.bg, borderRadius: "12px", padding: "20px", border: `1px solid ${riskStyle.border}`, textAlign: "center" }}>
                    <span style={{ fontSize: "13px", color: riskStyle.text, fontWeight: 700 }}>Backend Landslide Probability</span>
                    <div style={{ fontSize: "40px", fontWeight: 900, color: riskStyle.text, margin: "8px 0" }}>
                      {probPct}%
                    </div>
                    <div style={{ width: "100%", height: "8px", backgroundColor: "#e2e8f0", borderRadius: "4px", overflow: "hidden", marginTop: "8px" }}>
                      <div style={{ width: `${probPct}%`, height: "100%", backgroundColor: riskStyle.badgeBg, borderRadius: "4px" }} />
                    </div>
                  </div>

                  <div style={{ backgroundColor: "#f8fafc", borderRadius: "12px", padding: "20px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px" }}>
                    <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 700 }}>Landslide Inference Metadata</div>
                    <div style={{ fontSize: "14px", color: "#1e293b" }}>
                      <strong>Landslide Risk Result:</strong> {event.probability >= 0.5 ? "YES (Landslide Risk)" : "NO (Low Risk)"}
                    </div>
                    <div style={{ fontSize: "14px", color: "#1e293b" }}>
                      <strong>Overall Risk Level:</strong> {event.overallRisk || event.riskLevel}
                    </div>
                    <div style={{ fontSize: "14px", color: "#1e293b" }}>
                      <strong>Detected Timestamp:</strong> {event.detectedAt ? new Date(event.detectedAt).toLocaleString() : "N/A"}
                    </div>
                  </div>
                </div>

                {/* EVIDENCE GRID */}
                {ev && (
                  <div style={{ backgroundColor: "#f8fafc", padding: "18px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#334155", margin: "0 0 12px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Mountain style={{ width: "16px", height: "16px", color: "#b45309" }} />
                      Weather & Environmental Features
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", fontSize: "12px" }}>
                      <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                        <span style={{ color: "#64748b", display: "block" }}>Daily Rainfall</span>
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
                        <span style={{ color: "#64748b", display: "block" }}>Elevation</span>
                        <strong style={{ color: "#0f172a" }}>{ev.elevation != null ? `${ev.elevation} m` : "N/A"}</strong>
                      </div>
                      <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                        <span style={{ color: "#64748b", display: "block" }}>Data Source</span>
                        <strong style={{ color: "#0f172a" }}>{ev.source || "Backend Pipeline"}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* ADVISORY DIRECTIVE */}
                <div style={{ backgroundColor: "#f1f5f9", padding: "14px", borderRadius: "10px", borderLeft: `4px solid ${riskStyle.badgeBg}` }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "flex", alignItems: "center", gap: "6px" }}>
                    <ShieldAlert style={{ width: "16px", height: "16px", color: riskStyle.badgeBg }} />
                    Recommended Directive
                  </span>
                  <p style={{ fontSize: "13px", color: "#475569", marginTop: "4px", margin: 0, lineHeight: 1.4 }}>
                    {event.riskLevel === "HIGH" || event.riskLevel === "CRITICAL" || event.riskLevel === "Critical"
                      ? "High landslide risk detected. Evacuate steep slope settlements, deploy geological monitoring sensors, and close high-risk mountain routes."
                      : event.riskLevel === "MEDIUM" || event.riskLevel === "Moderate"
                      ? "Moderate slope instability risk. Monitor soil saturation levels and restrict heavy vehicular movement near hillside cuts."
                      : "Low landslide risk. Continue routine slope and weather monitoring."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "48px 24px", border: "1px solid #e2e8f0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
            <CheckCircle2 style={{ width: "32px", height: "32px", color: "#b45309" }} />
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b", margin: 0 }}>No Landslide Events Currently Reported</h3>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "8px", maxWidth: "420px" }}>
            The backend automated ingestion pipeline has not registered any active landslide events. Click "Refresh Backend Data" above to query the latest disaster results.
          </p>
        </div>
      )}
    </div>
  );
};

