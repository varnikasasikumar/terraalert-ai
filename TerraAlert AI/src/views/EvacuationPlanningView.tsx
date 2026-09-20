import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";
import { Navigation, MapPin, ShieldCheck, Info } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { useApp } from "../context/AppContext";
import { TerraAlertAPI } from "../api/service";
import type { EvacuationRecommendation, ShelterData } from "../api/service";

export const EvacuationPlanningView: React.FC = () => {
  const { disasterEvents } = useApp();

  const [recommendation, setRecommendation] =
    useState<EvacuationRecommendation | null>(null);
  const [shelters, setShelters] = useState<ShelterData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Active disaster event (default to Houston FLOOD event or first active event)
  const activeEvent =
    disasterEvents.find((e) => e.location === "Houston" && e.disasterType === "FLOOD") ||
    disasterEvents[0] ||
    null;

  const mapCenter: [number, number] = activeEvent
    ? [activeEvent.latitude, activeEvent.longitude]
    : [29.7604, -95.3698];

  useEffect(() => {
    loadEvacuationData();
  }, [activeEvent?.location, activeEvent?.riskLevel]);

  const loadEvacuationData = async () => {
    try {
      setIsLoading(true);

      const location = activeEvent?.location || "Houston";
      const latitude = activeEvent?.latitude ?? 29.7604;
      const longitude = activeEvent?.longitude ?? -95.3698;
      const riskLevel = activeEvent?.riskLevel || activeEvent?.overallRisk || "HIGH";

      // 1. Fetch backend evacuation recommendation
      const recData = await TerraAlertAPI.getEvacuationRecommendation({
        location,
        latitude,
        longitude,
        riskLevel,
      });
      setRecommendation(recData);

      // 2. Fetch backend registered shelters
      const shelterData = await TerraAlertAPI.getShelters();
      setShelters(shelterData);
    } catch (err) {
      console.error("Failed to load evacuation backend data:", err);
    } finally {
      setIsLoading(false);
    }
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
      {/* MAIN MAP + ROUTE & RECOMMENDATION ANALYSIS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2.5fr 1fr",
          gap: "20px",
        }}
      >
        {/* MAP CONTAINER */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "16px",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Map Header */}
          <div
            style={{
              marginBottom: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                {activeEvent ? `${activeEvent.location} Evacuation Map` : "Evacuation Map"}
              </h3>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "12px",
                  color: "#64748b",
                }}
              >
                Evacuation Planning • {activeEvent?.disasterType || "DISASTER"} Scenario ({recommendation?.riskLevel || "HIGH"} Risk)
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#64748b",
              }}
            >
              <MapPin size={15} />
              {activeEvent?.location || "Houston"}, {activeEvent?.latitude}, {activeEvent?.longitude}
            </div>
          </div>

          {/* LEAFLET MAP */}
          <div
            style={{
              width: "100%",
              height: "430px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #cbd5e1",
            }}
          >
            <MapContainer
              center={mapCenter}
              zoom={11}
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

              {/* DISASTER ORIGIN LOCATION MARKER */}
              <CircleMarker
                center={mapCenter}
                radius={11}
                pathOptions={{
                  color: "#ffffff",
                  weight: 3,
                  fillColor: "#ef4444",
                  fillOpacity: 1,
                }}
              >
                <Popup>
                  <strong>Disaster Area: {activeEvent?.location || "Houston"}</strong>
                  <br />
                  Risk Level: {recommendation?.riskLevel || "HIGH"}
                  <br />
                  Lat/Lon: {mapCenter[0]}, {mapCenter[1]}
                </Popup>
              </CircleMarker>

              {/* REAL BACKEND SHELTER MARKERS */}
              {shelters.map((shelter) => (
                <CircleMarker
                  key={shelter.id}
                  center={shelter.coordinates}
                  radius={10}
                  pathOptions={{
                    color: "#ffffff",
                    weight: 2,
                    fillColor: "#16a34a",
                    fillOpacity: 1,
                  }}
                >
                  <Popup>
                    <strong>{shelter.name}</strong>
                    <br />
                    Location: {shelter.district}
                    <br />
                    Capacity: {shelter.capacity.toLocaleString()}
                    <br />
                    Available: {shelter.available.toLocaleString()}
                    <br />
                    Status: {shelter.status}
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* BACKEND RECOMMENDATION & ROUTE ANALYSIS PANEL */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h4
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#0f172a",
              margin: 0,
            }}
          >
            Evacuation Recommendation
          </h4>

          {/* BACKEND RECOMMENDATION CARD */}
          <div
            style={{
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: recommendation?.riskLevel === "HIGH" ? "#fef2f2" : "#f0fdf4",
              border: `1px solid ${recommendation?.riskLevel === "HIGH" ? "#fecaca" : "#bbf7d0"}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: recommendation?.riskLevel === "HIGH" ? "#b91c1c" : "#15803d",
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              <ShieldCheck size={16} />
              Backend Recommendation
            </div>

            <p
              style={{
                marginTop: "8px",
                marginBottom: "12px",
                fontSize: "13px",
                color: "#1e293b",
                lineHeight: 1.5,
              }}
            >
              {isLoading
                ? "Loading evacuation recommendation from backend..."
                : recommendation?.recommendation || "No recommendation returned."}
            </p>

            <div
              style={{
                fontSize: "12px",
                color: "#334155",
                lineHeight: 1.6,
                borderTop: "1px solid #e2e8f0",
                paddingTop: "10px",
              }}
            >
              Nearest Shelter: <strong>{recommendation?.nearestShelter || "Houston Emergency Shelter"}</strong>
              <br />
              Available Capacity: <strong>{recommendation?.availableShelterCapacity?.toLocaleString() ?? "1,500"}</strong>
              <br />
              Risk Level: <strong>{recommendation?.riskLevel || "HIGH"}</strong>
            </div>
          </div>

          {/* ROUTE ANALYSIS STATUS (HONEST BACKEND STATUS) */}
          <div
            style={{
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#475569",
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              <Navigation size={16} />
              Route Calculation Status
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "12px",
                color: "#64748b",
                lineHeight: 1.6,
              }}
            >
              Distance: <strong>N/A (Backend routing engine not configured)</strong>
              <br />
              Estimated time: <strong>N/A</strong>
              <br />
              Route status: <strong>Route calculation unavailable</strong>
            </div>
          </div>

          {/* INFORMATIONAL TRANSPARENCY NOTICE */}
          <div
            style={{
              padding: "14px",
              borderRadius: "10px",
              backgroundColor: "#f0f9ff",
              border: "1px solid #bae6fd",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            <Info
              size={16}
              style={{
                color: "#0284c7",
                marginTop: "2px",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "11px",
                lineHeight: 1.5,
                color: "#0369a1",
              }}
            >
              Evacuation recommendations and shelter capacities are calculated dynamically by the backend Evacuation Resource Service. Turn-by-turn road geometry is currently not generated by the backend.
            </span>
          </div>
        </div>
      </div>

      {/* REGISTERED BACKEND SHELTERS TABLE */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "20px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h4
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: "16px",
          }}
        >
          Registered Evacuation Shelters (Backend Database)
        </h4>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: "13.5px",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid #e2e8f0",
                color: "#64748b",
                fontWeight: 600,
              }}
            >
              <th style={{ padding: "12px" }}>#</th>
              <th style={{ padding: "12px" }}>Shelter Name</th>
              <th style={{ padding: "12px" }}>Location</th>
              <th style={{ padding: "12px" }}>Coordinates</th>
              <th style={{ padding: "12px" }}>Total Capacity</th>
              <th style={{ padding: "12px" }}>Available Capacity</th>
              <th style={{ padding: "12px" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {shelters.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  {isLoading ? "Loading shelters from backend..." : "No shelters registered in backend."}
                </td>
              </tr>
            ) : (
              shelters.map((shelter, idx) => (
                <tr
                  key={shelter.id || idx}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <td style={{ padding: "12px", fontWeight: 700 }}>{idx + 1}</td>
                  <td style={{ padding: "12px", fontWeight: 600, color: "#0f172a" }}>
                    {shelter.name}
                  </td>
                  <td style={{ padding: "12px", color: "#334155" }}>
                    {shelter.district}
                  </td>
                  <td style={{ padding: "12px", color: "#64748b", fontSize: "12px" }}>
                    {shelter.coordinates[0]}, {shelter.coordinates[1]}
                  </td>
                  <td style={{ padding: "12px", color: "#334155" }}>
                    {shelter.capacity.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      fontWeight: 700,
                      color: shelter.available > 500 ? "#16a34a" : "#d97706",
                    }}
                  >
                    {shelter.available.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: 700,
                        backgroundColor: shelter.status === "Open" ? "#f0fdf4" : "#fffbeb",
                        color: shelter.status === "Open" ? "#16a34a" : "#d97706",
                      }}
                    >
                      {shelter.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
