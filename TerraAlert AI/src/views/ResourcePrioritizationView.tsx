import React, { useEffect, useState } from "react";
import { RefreshCw, Info, ShieldAlert } from "lucide-react";
import { useApp } from "../context/AppContext";
import { TerraAlertAPI } from "../api/service";
import type { ResourceItem } from "../api/service";

export const ResourcePrioritizationView: React.FC = () => {
  const { disasterEvents } = useApp();

  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Active scenario context from backend disaster events
  const activeEvent =
    disasterEvents.find((e) => e.location === "Houston" && e.disasterType === "FLOOD") ||
    disasterEvents[0] ||
    null;

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setIsLoading(true);
      const data = await TerraAlertAPI.getResources();
      setResources(data || []);
    } catch (error) {
      console.error("Failed to load backend resources:", error);
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
      {/* TOP FILTER & SCENARIO CONTEXT BAR */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div>
            <span
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                color: "#64748b",
                marginBottom: "4px",
              }}
            >
              Active Backend Scenario
            </span>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#0f172a",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ShieldAlert size={16} style={{ color: "#ef4444" }} />
              {activeEvent
                ? `${activeEvent.location} — ${activeEvent.disasterType} (${activeEvent.riskLevel} Risk)`
                : "Houston — FLOOD (HIGH Risk)"}
            </div>
          </div>
        </div>

        <button
          onClick={loadResources}
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
          <RefreshCw style={{ width: "14px", height: "14px" }} />
          <span>Refresh Resources</span>
        </button>
      </div>

      {/* REAL EMERGENCY RESOURCE INVENTORY TABLE */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            Real Emergency Resource Inventory
          </h3>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            Real-time inventory provided by the backend Evacuation Resource Service
          </p>
        </div>

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
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e2e8f0",
                color: "#64748b",
                fontWeight: 600,
              }}
            >
              <th style={{ padding: "14px 20px" }}>#</th>
              <th style={{ padding: "14px 20px" }}>Resource Name</th>
              <th style={{ padding: "14px 20px" }}>Type</th>
              <th style={{ padding: "14px 20px" }}>Location</th>
              <th style={{ padding: "14px 20px" }}>Total Quantity</th>
              <th style={{ padding: "14px 20px" }}>Available Quantity</th>
              <th style={{ padding: "14px 20px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  Loading resources from backend...
                </td>
              </tr>
            ) : resources.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "40px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "15px",
                      color: "#0f172a",
                      marginBottom: "8px",
                    }}
                  >
                    No emergency resources are currently registered.
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#64748b",
                      maxWidth: "600px",
                      margin: "0 auto",
                      lineHeight: 1.5,
                    }}
                  >
                    Resource inventory is provided by the Evacuation Resource Service. Village-level AI priority scoring and automated resource dispatch are currently not configured.
                  </div>
                </td>
              </tr>
            ) : (
              resources.map((item, idx) => (
                <tr key={item.id || idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontWeight: 700,
                      color: "#0f172a",
                    }}
                  >
                    {idx + 1}
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontWeight: 600,
                      color: "#0f172a",
                    }}
                  >
                    {item.name}
                  </td>
                  <td style={{ padding: "14px 20px", color: "#334155" }}>
                    {item.type}
                  </td>
                  <td style={{ padding: "14px 20px", color: "#334155" }}>
                    {item.location}
                  </td>
                  <td style={{ padding: "14px 20px", color: "#334155" }}>
                    {item.quantity.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontWeight: 700,
                      color: item.availableQuantity > 0 ? "#16a34a" : "#ef4444",
                    }}
                  >
                    {item.availableQuantity.toLocaleString()}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: 700,
                        backgroundColor:
                          item.status === "AVAILABLE" ? "#f0fdf4" : "#fffbeb",
                        color:
                          item.status === "AVAILABLE" ? "#16a34a" : "#d97706",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* BACKEND TRANSPARENCY NOTICE */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "20px 24px",
          border: "1px solid #e2e8f0",
          display: "flex",
          gap: "14px",
          alignItems: "flex-start",
        }}
      >
        <Info
          size={20}
          style={{
            color: "#1d61f2",
            marginTop: "2px",
            flexShrink: 0,
          }}
        />
        <div>
          <h4
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: "4px",
              margin: 0,
            }}
          >
            Backend Resource Management Information
          </h4>
          <p
            style={{
              fontSize: "13px",
              color: "#64748b",
              margin: "4px 0 0",
              lineHeight: 1.5,
            }}
          >
            Resource inventory is fetched directly from the backend Evacuation Resource Service (`GET /api/resources`). Automated village-level resource allocation and priority scoring models are currently not configured in the backend.
          </p>
        </div>
      </div>
    </div>
  );
};
