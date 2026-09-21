import React, { useEffect, useRef, useState } from "react";
import { Calendar, RefreshCw } from "lucide-react";
import { useApp } from "../context/AppContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const SatelliteMonitoringView: React.FC = () => {
  const { selectedDistrict, setSelectedDistrict } = useApp();

  const [currentDate, setCurrentDate] = useState("07 May 2026");
  const [compareDate, setCompareDate] = useState("06 May 2026");

  const currentMapRef = useRef<HTMLDivElement | null>(null);
  const previousMapRef = useRef<HTMLDivElement | null>(null);
  const changeMapRef = useRef<HTMLDivElement | null>(null);

  const currentMapInstance = useRef<L.Map | null>(null);
  const previousMapInstance = useRef<L.Map | null>(null);
  const changeMapInstance = useRef<L.Map | null>(null);

  // Houston coordinates
  const latitude = 29.7604;
  const longitude = -95.3698;

  useEffect(() => {
    const satelliteLayer = () =>
      L.tileLayer(
        "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles © Esri, Maxar, Earthstar Geographics, and the GIS User Community",
          maxZoom: 19,
        },
      );

    const createMap = (
      container: HTMLDivElement,
      mapRef: React.MutableRefObject<L.Map | null>,
    ) => {
      if (mapRef.current) {
        mapRef.current.remove();
      }

      const map = L.map(container, {
        center: [latitude, longitude],
        zoom: 10,
        zoomControl: true,
      });

      satelliteLayer().addTo(map);

      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`<strong>Houston</strong><br/>Satellite Monitoring Area`);

      mapRef.current = map;

      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    };

    if (currentMapRef.current) {
      createMap(currentMapRef.current, currentMapInstance);
    }

    if (previousMapRef.current) {
      createMap(previousMapRef.current, previousMapInstance);
    }

    if (changeMapRef.current) {
      createMap(changeMapRef.current, changeMapInstance);
    }

    return () => {
      currentMapInstance.current?.remove();
      previousMapInstance.current?.remove();
      changeMapInstance.current?.remove();

      currentMapInstance.current = null;
      previousMapInstance.current = null;
      changeMapInstance.current = null;
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingBottom: "40px",
      }}
    >
      {/* Filters & Comparison Top Header */}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Area */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                color: "#64748b",
                marginBottom: "4px",
              }}
            >
              Area
            </label>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              <option value="Houston">Houston</option>
              <option value="Seattle">Seattle</option>
              <option value="Valparai District">Valparai District</option>
              <option value="Coimbatore District">Coimbatore District</option>
            </select>
          </div>

          {/* Current Date */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                color: "#64748b",
                marginBottom: "4px",
              }}
            >
              Date
            </label>

            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                style={{
                  padding: "8px 14px 8px 34px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              />

              <Calendar
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  color: "#64748b",
                }}
              />
            </div>
          </div>

          {/* Compare Date */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                color: "#64748b",
                marginBottom: "4px",
              }}
            >
              Compare With
            </label>

            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={compareDate}
                onChange={(e) => setCompareDate(e.target.value)}
                style={{
                  padding: "8px 14px 8px 34px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              />

              <Calendar
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  color: "#64748b",
                }}
              />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <button
          onClick={() => {
            currentMapInstance.current?.invalidateSize();
            previousMapInstance.current?.invalidateSize();
            changeMapInstance.current?.invalidateSize();
          }}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#1d61f2",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          <RefreshCw
            style={{
              width: "14px",
              height: "14px",
            }}
          />

          <span>Update</span>
        </button>
      </div>

      {/* Satellite Comparison Panels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Current Image */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: "14px",
            }}
          >
            Current Image ({currentDate})
          </h4>

          <div
            ref={currentMapRef}
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #cbd5e1",
              zIndex: 1,
            }}
          />
        </div>

        {/* Previous Image */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: "14px",
            }}
          >
            Previous Image ({compareDate})
          </h4>

          <div
            ref={previousMapRef}
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #cbd5e1",
              zIndex: 1,
            }}
          />
        </div>

        {/* Change Detection */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: "14px",
            }}
          >
            Change Detection (AI)
          </h4>

          <div
            ref={changeMapRef}
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #cbd5e1",
              zIndex: 1,
            }}
          />
        </div>
      </div>

      {/* Satellite Legend */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "14px 24px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          display: "flex",
          justifyContent: "center",
          gap: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#334155",
          }}
        >
          <span
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#1d61f2",
              borderRadius: "3px",
            }}
          />
          Increased Water
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#334155",
          }}
        >
          <span
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#38bdf8",
              borderRadius: "3px",
            }}
          />
          Reduced Water
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#334155",
          }}
        >
          <span
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#ef4444",
              borderRadius: "3px",
            }}
          />
          Vegetation Loss
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#334155",
          }}
        >
          <span
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#cbd5e1",
              borderRadius: "3px",
            }}
          />
          No Change
        </div>
      </div>

      {/* Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            textAlign: "center",
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
            Water Spread
          </span>

          <span
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#16a34a",
            }}
          >
            +6.7 sq km
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            textAlign: "center",
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
            Vegetation Loss
          </span>

          <span
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#ef4444",
            }}
          >
            -15%
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            textAlign: "center",
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
            Cloud Cover
          </span>

          <span
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            12%
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            textAlign: "center",
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
            AI Confidence
          </span>

          <span
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            89%
          </span>
        </div>
      </div>
    </div>
  );
};
