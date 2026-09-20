import React, { useState } from "react";
import { RefreshCw, Droplets, Zap, Stethoscope, Utensils } from "lucide-react";
import { useApp } from "../context/AppContext";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

export const ShelterManagementView: React.FC = () => {
  const { shelters } = useApp();

  const [selectedShelter, setSelectedShelter] = useState(shelters[0] || null);

  /*
   * =========================================================
   * HOUSTON MAP
   * =========================================================
   *
   * These are prototype map coordinates for the UI.
   * The map itself is a real OpenStreetMap map.
   *
   * Replace these coordinates later with the actual
   * coordinates of your registered shelters.
   * =========================================================
   */

  const shelterLocations: [number, number][] = [
    [29.7604, -95.3698],
    [29.7752, -95.3584],
    [29.7355, -95.3758],
    [29.785, -95.395],
  ];

  const houstonCenter: [number, number] = [29.7604, -95.3698];

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
      ====================================================== */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#0f172a",
            margin: 0,
          }}
        >
          Shelters
        </h3>
      </div>

      {/* =====================================================
          MAIN GRID
      ====================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1.8fr",
          gap: "20px",
        }}
      >
        {/* ===================================================
            NEAREST SHELTERS
        ==================================================== */}

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
              }}
            >
              Nearest Shelters
            </h4>

            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#1d61f2",
                cursor: "pointer",
              }}
            >
              <RefreshCw
                style={{
                  width: "14px",
                  height: "14px",
                }}
              />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {shelters.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => setSelectedShelter(s)}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border:
                    selectedShelter?.id === s.id
                      ? "2px solid #1d61f2"
                      : "1px solid #e2e8f0",
                  backgroundColor:
                    selectedShelter?.id === s.id ? "#f0f7ff" : "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "#1d61f2",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {idx + 1}
                  </div>

                  <div>
                    <h5
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#0f172a",
                        margin: 0,
                        marginBottom: "4px",
                      }}
                    >
                      {s.name}
                    </h5>

                    <span
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                      }}
                    >
                      Capacity: {s.capacity} | Available: {s.available}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#64748b",
                      display: "block",
                      marginBottom: "5px",
                    }}
                  >
                    {s.distance}
                  </span>

                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "10px",
                      backgroundColor: "#dcfce7",
                      color: "#16a34a",
                    }}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================
            MAP + DETAILS
        ==================================================== */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* =================================================
              REAL INTERACTIVE MAP
          ================================================== */}

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #cbd5e1",
              }}
            >
              <MapContainer
                center={houstonCenter}
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

                {/* Houston center */}

                <CircleMarker
                  center={houstonCenter}
                  radius={9}
                  pathOptions={{
                    color: "#ffffff",
                    weight: 3,
                    fillColor: "#1d61f2",
                    fillOpacity: 1,
                  }}
                >
                  <Popup>
                    <strong>Houston Emergency Management</strong>
                    <br />
                    Houston, Texas
                  </Popup>
                </CircleMarker>

                {/* Shelter locations */}

                {shelters.map((s, index) => {
                  const position =
                    shelterLocations[index % shelterLocations.length];

                  return (
                    <CircleMarker
                      key={s.id}
                      center={position}
                      radius={selectedShelter?.id === s.id ? 11 : 8}
                      pathOptions={{
                        color: "#ffffff",
                        weight: 2,
                        fillColor:
                          selectedShelter?.id === s.id ? "#7c3aed" : "#16a34a",
                        fillOpacity: 1,
                      }}
                      eventHandlers={{
                        click: () => setSelectedShelter(s),
                      }}
                    >
                      <Popup>
                        <strong>{s.name}</strong>
                        <br />
                        Status: {s.status}
                        <br />
                        Capacity: {s.capacity}
                        <br />
                        Available: {s.available}
                        <br />
                        Distance: {s.distance}
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            </div>
          </div>

          {/* =================================================
              SELECTED SHELTER DETAILS
          ================================================== */}

          {selectedShelter && (
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#0f172a",
                      margin: 0,
                    }}
                  >
                    {selectedShelter.name}
                  </h4>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                    }}
                  >
                    Houston, Texas • Emergency Shelter
                  </span>
                </div>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "12px",
                    backgroundColor: "#dcfce7",
                    color: "#16a34a",
                  }}
                >
                  {selectedShelter.status}
                </span>
              </div>

              {/* =================================================
                  STATS
              ================================================== */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "10px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#64748b",
                      display: "block",
                    }}
                  >
                    Capacity
                  </span>

                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#0f172a",
                    }}
                  >
                    {selectedShelter.capacity}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "10px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#64748b",
                      display: "block",
                    }}
                  >
                    Available
                  </span>

                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#16a34a",
                    }}
                  >
                    {selectedShelter.available}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "10px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#64748b",
                      display: "block",
                    }}
                  >
                    Distance
                  </span>

                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#0f172a",
                    }}
                  >
                    {selectedShelter.distance}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "10px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#64748b",
                      display: "block",
                    }}
                  >
                    Est Time
                  </span>

                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#0f172a",
                    }}
                  >
                    {selectedShelter.estTime}
                  </span>
                </div>
              </div>

              {/* =================================================
                  FACILITIES
              ================================================== */}

              <div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#0f172a",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Facilities
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#334155",
                      backgroundColor: "#f1f5f9",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Droplets
                      style={{
                        width: "12px",
                        height: "12px",
                        color: "#1d61f2",
                      }}
                    />
                    Water
                  </span>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#334155",
                      backgroundColor: "#f1f5f9",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Zap
                      style={{
                        width: "12px",
                        height: "12px",
                        color: "#eab308",
                      }}
                    />
                    Power
                  </span>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#334155",
                      backgroundColor: "#f1f5f9",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Stethoscope
                      style={{
                        width: "12px",
                        height: "12px",
                        color: "#ef4444",
                      }}
                    />
                    Medical
                  </span>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#334155",
                      backgroundColor: "#f1f5f9",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Utensils
                      style={{
                        width: "12px",
                        height: "12px",
                        color: "#16a34a",
                      }}
                    />
                    Food
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
