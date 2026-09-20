import React, { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RISK_TREND_DATA = [
  { date: "08 Aug", risk: 58 },
  { date: "09 Aug", risk: 64 },
  { date: "10 Aug", risk: 71 },
  { date: "11 Aug", risk: 68 },
  { date: "12 Aug", risk: 79 },
  { date: "13 Aug", risk: 86 },
  { date: "14 Aug", risk: 92 },
];

const RAINFALL_DATA = [
  { date: "08 Aug", mm: 85 },
  { date: "09 Aug", mm: 120 },
  { date: "10 Aug", mm: 165 },
  { date: "11 Aug", mm: 110 },
  { date: "12 Aug", mm: 190 },
  { date: "13 Aug", mm: 220 },
  { date: "14 Aug", mm: 180 },
];

export const ReportsAnalysisView: React.FC = () => {
  const [dateRange, setDateRange] = useState("08 Aug 2026 - 14 Aug 2026");

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
          REPORT HEADER
      ====================================================== */}

      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
        }}
      >
        {/* Location + Overview */}

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            <MapPin
              style={{
                width: "18px",
                height: "18px",
                color: "#1d61f2",
              }}
            />

            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#64748b",
              }}
            >
              Houston, Texas
            </span>
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Reports & Analysis
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              fontSize: "13px",
              color: "#64748b",
            }}
          >
            Disaster risk and environmental analysis overview
          </p>
        </div>

        {/* Date + Export */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            <Calendar
              style={{
                position: "absolute",
                left: "11px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: "#64748b",
                pointerEvents: "none",
              }}
            />

            <input
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                width: "205px",
                padding: "10px 12px 10px 34px",
                borderRadius: "9px",
                border: "1px solid #cbd5e1",
                fontSize: "12px",
                fontWeight: 600,
                color: "#0f172a",
                outline: "none",
                backgroundColor: "#ffffff",
              }}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          OVERVIEW ONLY
      ====================================================== */}

      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#1d61f2",
            borderBottom: "2px solid #1d61f2",
            paddingBottom: "8px",
          }}
        >
          Overview
        </span>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {/* Average Risk */}

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "22px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "#64748b",
              fontWeight: 600,
            }}
          >
            Average Risk Index
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              marginTop: "10px",
            }}
          >
            <span
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: "#ef4444",
              }}
            >
              78%
            </span>

            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#ef4444",
                backgroundColor: "#fef2f2",
                padding: "4px 8px",
                borderRadius: "10px",
              }}
            >
              HIGH
            </span>
          </div>

          <span
            style={{
              display: "block",
              marginTop: "8px",
              fontSize: "11px",
              color: "#94a3b8",
            }}
          >
            Current disaster risk level
          </span>
        </div>

        {/* Total Alerts */}

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "22px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "#64748b",
              fontWeight: 600,
            }}
          >
            Total Alerts
          </span>

          <span
            style={{
              display: "block",
              marginTop: "10px",
              fontSize: "32px",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            28
          </span>

          <span
            style={{
              display: "block",
              marginTop: "8px",
              fontSize: "11px",
              color: "#94a3b8",
            }}
          >
            Alerts generated this period
          </span>
        </div>

        {/* Villages */}

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "22px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "#64748b",
              fontWeight: 600,
            }}
          >
            Villages Affected
          </span>

          <span
            style={{
              display: "block",
              marginTop: "10px",
              fontSize: "32px",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            15
          </span>

          <span
            style={{
              display: "block",
              marginTop: "8px",
              fontSize: "11px",
              color: "#94a3b8",
            }}
          >
            Areas requiring attention
          </span>
        </div>

        {/* Resources */}

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "22px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "#64748b",
              fontWeight: 600,
            }}
          >
            Resources Deployed
          </span>

          <span
            style={{
              display: "block",
              marginTop: "10px",
              fontSize: "32px",
              fontWeight: 800,
              color: "#16a34a",
            }}
          >
            85%
          </span>

          <span
            style={{
              display: "block",
              marginTop: "8px",
              fontSize: "11px",
              color: "#94a3b8",
            }}
          >
            Current deployment utilization
          </span>
        </div>
      </div>

      {/* =====================================================
          ANALYTICS
      ====================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* ===================================================
            RISK TREND
        ==================================================== */}

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
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
                Risk Index Trend
              </h4>

              <span
                style={{
                  display: "block",
                  marginTop: "5px",
                  fontSize: "11px",
                  color: "#94a3b8",
                }}
              >
                Houston disaster risk over the selected period
              </span>
            </div>

            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#ef4444",
              }}
            >
              92% Current
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: "260px",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RISK_TREND_DATA}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />

                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />

                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  domain={[0, 100]}
                  unit="%"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="#1d61f2"
                  strokeWidth={3}
                  fillOpacity={0.15}
                  fill="#1d61f2"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ===================================================
            RAINFALL
        ==================================================== */}

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
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
                Rainfall Analysis
              </h4>

              <span
                style={{
                  display: "block",
                  marginTop: "5px",
                  fontSize: "11px",
                  color: "#94a3b8",
                }}
              >
                Daily rainfall recorded in Houston
              </span>
            </div>

            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#1d61f2",
              }}
            >
              mm / day
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: "260px",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RAINFALL_DATA}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />

                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />

                <YAxis stroke="#94a3b8" fontSize={11} />

                <Tooltip />

                <Bar dataKey="mm" fill="#1d61f2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
