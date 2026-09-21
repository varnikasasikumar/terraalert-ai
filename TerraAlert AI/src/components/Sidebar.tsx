import React from "react";
import {
  LayoutDashboard,
  Mountain,
  Droplets,
  ShieldAlert,
  MapPin,
  Satellite,
  Bell,
  Sliders,
  Navigation,
  Home,
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";

import { useApp } from "../context/AppContext";

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    userRole,
  } = useApp();

  // =========================================================
  // NAVIGATION ITEMS
  // =========================================================

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      allowedRoles: ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER", "ANALYST"],
    },

    {
      name: "Flood Prediction",
      icon: Droplets,
      allowedRoles: ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER", "ANALYST"],
    },

    {
      name: "Landslide Prediction",
      icon: Mountain,
      allowedRoles: ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER", "ANALYST"],
    },

    {
      name: "Risk Monitoring App",
      icon: ShieldAlert,
      allowedRoles: ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER", "ANALYST"],
    },

    {
      name: "Village Analysis",
      icon: MapPin,
      allowedRoles: ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER", "ANALYST"],
    },

    {
      name: "Satellite Monitoring",
      icon: Satellite,
      allowedRoles: ["ADMIN", "DISASTER_MANAGER", "ANALYST"],
    },

    {
      name: "Alert Management",
      icon: Bell,
      allowedRoles: ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER"],
    },

    {
      name: "Resource Prioritization",
      icon: Sliders,
      allowedRoles: ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER"],
    },

    {
      name: "Evacuation Planning",
      icon: Navigation,
      allowedRoles: ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER"],
    },

    {
      name: "Shelter Management",
      icon: Home,
      allowedRoles: ["ADMIN", "DISASTER_MANAGER", "FIELD_OFFICER"],
    },

    {
      name: "Reports & Analysis",
      icon: BarChart3,
      allowedRoles: ["ADMIN", "DISASTER_MANAGER", "ANALYST"],
    },

    {
      name: "User Management",
      icon: Users,
      allowedRoles: ["ADMIN"],
    },

    {
      name: "Settings",
      icon: Settings,
      allowedRoles: ["ADMIN"],
    },
  ];

  // =========================================================
  // FILTER ITEMS BASED ON LOGGED-IN USER ROLE
  // =========================================================

  const visibleNavItems = navItems.filter((item) => {
    if (!userRole) {
      return false;
    }

    return item.allowedRoles.includes(userRole);
  });

  // =========================================================
  // NAVIGATION
  // =========================================================

  const handleNavigation = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <aside
      style={{
        width: sidebarCollapsed ? "80px" : "260px",
        backgroundColor: "#070a0e",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderRight: "1px solid #1e293b",
        boxShadow: "4px 0 24px rgba(0,0,0,0.3)",
        flexShrink: 0,
      }}
    >
      {/* =====================================================
          BRAND HEADER
          ===================================================== */}

      <div
        style={{
          padding: sidebarCollapsed ? "20px 10px" : "20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid #161e2e",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #166534 0%, #15803d 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(22, 101, 52, 0.4)",
            border: "1px solid #22c55e",
            flexShrink: 0,
          }}
        >
          <Shield
            style={{
              width: "24px",
              height: "24px",
              color: "#ffffff",
            }}
          />
        </div>

        {!sidebarCollapsed && (
          <div
            style={{
              overflow: "hidden",
            }}
          >
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
                color: "#ffffff",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              TerraAlert AI
            </h1>

            <p
              style={{
                fontSize: "10px",
                color: "#94a3b8",
                marginTop: "2px",
                fontWeight: 500,
                letterSpacing: "0.2px",
              }}
            >
              AI-Powered Disaster Management System
            </p>
          </div>
        )}
      </div>

      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <nav
        style={{
          flex: 1,
          padding: "16px 12px",
          overflowY: "auto",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            padding: 0,
            margin: 0,
          }}
        >
          {visibleNavItems.map((item) => {
            const Icon = item.icon;

            const isActive = activeTab === item.name;

            return (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigation(item.name)}
                  title={sidebarCollapsed ? item.name : undefined}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: sidebarCollapsed ? "12px 0" : "12px 14px",
                    justifyContent: sidebarCollapsed ? "center" : "flex-start",
                    borderRadius: "10px",
                    backgroundColor: isActive ? "#1d61f2" : "transparent",
                    color: isActive ? "#ffffff" : "#94a3b8",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: "13.5px",
                    transition: "all 0.15s ease",
                    boxShadow: isActive
                      ? "0 4px 14px rgba(29, 97, 242, 0.4)"
                      : "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "#161e2e";

                      e.currentTarget.style.color = "#ffffff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";

                      e.currentTarget.style.color = "#94a3b8";
                    }
                  }}
                >
                  <Icon
                    style={{
                      width: "20px",
                      height: "20px",
                      flexShrink: 0,
                    }}
                  />

                  {!sidebarCollapsed && (
                    <span
                      style={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* =====================================================
          COLLAPSE TOGGLE
          ===================================================== */}

      <div
        style={{
          padding: "16px 12px",
          borderTop: "1px solid #161e2e",
        }}
      >
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: sidebarCollapsed ? "center" : "flex-start",
            padding: "10px 14px",
            borderRadius: "8px",
            backgroundColor: "#0f172a",
            color: "#94a3b8",
            fontSize: "13px",
            fontWeight: 500,
            border: "1px solid #1e293b",
            cursor: "pointer",
          }}
        >
          {sidebarCollapsed ? (
            <ChevronRight
              style={{
                width: "18px",
                height: "18px",
              }}
            />
          ) : (
            <>
              <ChevronLeft
                style={{
                  width: "18px",
                  height: "18px",
                }}
              />

              <span>Collapse All</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
