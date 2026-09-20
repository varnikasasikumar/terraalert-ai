import React, { useEffect, useState } from "react";

import { Menu, ChevronDown } from "lucide-react";

import { useApp } from "../context/AppContext";

// =========================================================
// TOP HEADER
// =========================================================

export const TopHeader: React.FC = () => {
  const {
    selectedDistrict,
    setSelectedDistrict,
    activeTab,

    // =======================================================
    // FIX:
    //
    // AppContext provides these three values directly.
    //
    // It does NOT provide currentUser.
    // =======================================================

    username,
    fullName,
    userRole,

    logout,
  } = useApp();

  // =========================================================
  // CURRENT DATE & TIME
  // =========================================================

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // =========================================================
  // USER INITIALS
  // =========================================================

  const getInitials = (name: string): string => {
    const cleanedName = name.trim();

    if (!cleanedName) {
      return "OF";
    }

    const parts = cleanedName.split(/\s+/);

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // =========================================================
  // ROLE DISPLAY
  // =========================================================

  const getRoleLabel = (role: string | null): string => {
    switch (role) {
      case "ADMIN":
        return "Administrator";

      case "DISASTER_MANAGER":
        return "Disaster Manager";

      case "FIELD_OFFICER":
        return "Field Officer";

      case "ANALYST":
        return "Data Analyst";

      default:
        return "Government Official";
    }
  };

  // =========================================================
  // CURRENT USER
  // =========================================================

  const displayName = fullName || username || "Government Official";

  const displayUsername = username || "";

  const displayRole = getRoleLabel(userRole);

  const initials = getInitials(displayName);

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formattedDateTime = currentDateTime.toLocaleString("en-IN", {
    day: "2-digit",

    month: "short",

    year: "numeric",

    hour: "2-digit",

    minute: "2-digit",

    hour12: true,
  });

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");

    if (!confirmed) {
      return;
    }

    logout();
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <header
      style={{
        height: "70px",

        backgroundColor: "#ffffff",

        borderBottom: "1px solid #e2e8f0",

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",

        padding: "0 28px",

        position: "sticky",

        top: 0,

        zIndex: 90,
      }}
    >
      {/* =====================================================
          LEFT SIDE
          ===================================================== */}

      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: "16px",

          minWidth: 0,
        }}
      >
        {/* ===================================================
            MENU
            =================================================== */}

        <button
          type="button"
          title="Navigation"
          aria-label="Navigation"
          style={{
            background: "none",

            color: "#64748b",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            border: "none",

            cursor: "pointer",

            padding: "4px",
          }}
        >
          <Menu
            style={{
              width: "22px",

              height: "22px",
            }}
          />
        </button>

        {/* ===================================================
            PAGE TITLE
            =================================================== */}

        <h2
          style={{
            fontSize: "20px",

            fontWeight: 700,

            color: "#0f172a",

            margin: 0,

            whiteSpace: "nowrap",

            overflow: "hidden",

            textOverflow: "ellipsis",
          }}
        >
          {activeTab}
        </h2>
      </div>

      {/* =====================================================
          RIGHT SIDE
          ===================================================== */}

      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: "18px",
        }}
      >
        {/* ===================================================
            DISTRICT SELECTOR
            =================================================== */}

        <div
          style={{
            position: "relative",
          }}
        >
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            aria-label="Select district"
            style={{
              padding: "8px 38px 8px 14px",

              borderRadius: "8px",

              border: "1px solid #cbd5e1",

              backgroundColor: "#ffffff",

              fontSize: "13px",

              fontWeight: 600,

              color: "#334155",

              cursor: "pointer",

              appearance: "none",

              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",

              outline: "none",
            }}
          >
            <option value="Harris County, Texas">Harris County, Texas</option>

            <option value="Fort Bend County, Texas">
              Fort Bend County, Texas
            </option>

            <option value="Montgomery County, Texas">
              Montgomery County, Texas
            </option>

            <option value="Brazoria County, Texas">
              Brazoria County, Texas
            </option>
          </select>

          <ChevronDown
            style={{
              position: "absolute",

              right: "10px",

              top: "50%",

              transform: "translateY(-50%)",

              width: "16px",

              height: "16px",

              color: "#64748b",

              pointerEvents: "none",
            }}
          />
        </div>

        {/* ===================================================
            DATE / TIME
            =================================================== */}

        <div
          style={{
            backgroundColor: "#f1f5f9",

            padding: "7px 14px",

            borderRadius: "8px",

            fontSize: "12px",

            fontWeight: 600,

            color: "#475569",

            whiteSpace: "nowrap",
          }}
        >
          {formattedDateTime}
        </div>

        {/* ===================================================
            USER PROFILE
            =================================================== */}

        <div
          style={{
            display: "flex",

            alignItems: "center",

            gap: "12px",

            paddingLeft: "16px",

            borderLeft: "1px solid #e2e8f0",
          }}
        >
          {/* =================================================
              AVATAR
              ================================================= */}

          <div
            title={displayName}
            style={{
              width: "38px",

              height: "38px",

              borderRadius: "50%",

              background: "linear-gradient(135deg, #0284c7, #0369a1)",

              color: "#ffffff",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontWeight: 700,

              fontSize: "14px",

              flexShrink: 0,

              boxShadow: "0 3px 8px rgba(2,132,199,0.25)",
            }}
          >
            {initials}
          </div>

          {/* =================================================
              USER DETAILS
              ================================================= */}

          <div
            style={{
              display: "flex",

              flexDirection: "column",

              minWidth: "150px",
            }}
          >
            {/* NAME */}

            <span
              style={{
                fontSize: "13px",

                fontWeight: 700,

                color: "#0f172a",

                whiteSpace: "nowrap",

                overflow: "hidden",

                textOverflow: "ellipsis",
              }}
            >
              {displayName}
            </span>

            {/* ROLE */}

            <span
              style={{
                fontSize: "11px",

                color: "#64748b",

                marginTop: "2px",

                whiteSpace: "nowrap",

                overflow: "hidden",

                textOverflow: "ellipsis",
              }}
            >
              {displayRole}
            </span>

            {/* USERNAME */}

            {displayUsername && (
              <span
                style={{
                  fontSize: "10px",

                  color: "#94a3b8",

                  marginTop: "1px",
                }}
              >
                @{displayUsername}
              </span>
            )}
          </div>

          {/* =================================================
              SIGN OUT
              ================================================= */}

          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            style={{
              marginLeft: "4px",

              backgroundColor: "#ffffff",

              border: "1px solid #cbd5e1",

              color: "#475569",

              fontSize: "11px",

              fontWeight: 600,

              padding: "7px 11px",

              borderRadius: "7px",

              cursor: "pointer",

              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f8fafc";

              e.currentTarget.style.borderColor = "#94a3b8";

              e.currentTarget.style.color = "#0f172a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";

              e.currentTarget.style.borderColor = "#cbd5e1";

              e.currentTarget.style.color = "#475569";
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};
