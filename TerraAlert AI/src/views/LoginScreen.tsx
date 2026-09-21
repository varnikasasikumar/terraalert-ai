import React, { useState } from "react";
import { Shield, Eye, EyeOff, Lock } from "lucide-react";
import { useApp } from "../context/AppContext";
import { API_BASE_URL } from "../api/service";

export const LoginScreen: React.FC = () => {
  const { login, setSelectedDistrict } = useApp();

  const [district, setDistrict] = useState("Harris County, Texas");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  // =========================================================
  // LOGIN
  // =========================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      // =====================================================
      // LOGIN FAILED
      // =====================================================

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid username or password.");
        }

        if (response.status === 403) {
          throw new Error("Access denied. This account is not authorized.");
        }

        throw new Error("Unable to sign in. Please try again.");
      }

      // =====================================================
      // LOGIN SUCCESS
      // =====================================================

      const data = await response.json();

      console.log("TerraAlert login successful:", data);

      // =====================================================
      // VALIDATE RESPONSE
      // =====================================================

      if (!data.token || !data.username || !data.fullName || !data.role) {
        throw new Error("Invalid login response from authentication server.");
      }

      // =====================================================
      // VALIDATE ROLE
      // =====================================================

      const validRoles = [
        "ADMIN",
        "DISASTER_MANAGER",
        "FIELD_OFFICER",
        "ANALYST",
      ];

      if (!validRoles.includes(data.role)) {
        throw new Error("Your account does not have a valid TerraAlert role.");
      }

      // =====================================================
      // SAVE DISTRICT
      // =====================================================

      setSelectedDistrict(district);

      // =====================================================
      // SAVE AUTHENTICATION
      // =====================================================

      login(data.token, data.username, data.fullName, data.role);
    } catch (err) {
      console.error("Login failed:", err);

      if (err instanceof TypeError) {
        setError("Unable to connect to TerraAlert authentication server.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#040b14",
      }}
    >
      {/* ===================================================
          BACKGROUND GRAPHIC
      =================================================== */}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(29, 97, 242, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(22, 163, 74, 0.2) 0%, transparent 40%)",
          zIndex: 1,
        }}
      />

      {/* ===================================================
          SATELLITE BACKGROUND
      =================================================== */}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.25,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop')",
          zIndex: 0,
        }}
      />

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1100px",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "40px",
          alignItems: "center",
          padding: "40px",
        }}
      >
        {/* =================================================
            LEFT SIDE BRANDING
        ================================================= */}

        <div
          style={{
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* LOGO + TITLE */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #15803d 0%, #166534 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #4ade80",
                boxShadow: "0 8px 24px rgba(34, 197, 94, 0.4)",
              }}
            >
              <Shield
                style={{
                  width: "36px",
                  height: "36px",
                  color: "#ffffff",
                }}
              />
            </div>

            <h1
              style={{
                fontSize: "42px",
                fontWeight: "800",
                letterSpacing: "-1px",
              }}
            >
              TerraAlert
            </h1>
          </div>

          {/* DESCRIPTION */}

          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              lineHeight: 1.2,
              color: "#f8fafc",
            }}
          >
            AI-Powered Disaster Management
            <br />
            Decision Support System
          </h2>

          {/* GOVERNMENT */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              🏛️
            </div>

            <div>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#e2e8f0",
                }}
              >
                Government of India
              </p>

              <p
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                }}
              >
                Ministry Of Home Affairs
              </p>
            </div>
          </div>

          <p
            style={{
              fontSize: "12px",
              color: "#64748b",
              marginTop: "40px",
            }}
          >
            @ 2026 TerraAlert. All rights reserved.
          </p>
        </div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            padding: "40px 36px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "4px",
            }}
          >
            Welcome Back!
          </h3>

          <p
            style={{
              fontSize: "13px",
              color: "#64748b",
              marginBottom: "28px",
            }}
          >
            Sign in to continue
          </p>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <div
              style={{
                marginBottom: "18px",
                padding: "12px 14px",
                borderRadius: "8px",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#b91c1c",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* =================================================
                DISTRICT
            ================================================= */}

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                District / Department
              </label>

              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                  color: "#0f172a",
                  backgroundColor: "#f8fafc",
                  outline: "none",
                }}
              >
                <option value="Harris County, Texas">
                  Harris County, Texas
                </option>

                <option value="Valparai District">Valparai District</option>

                <option value="Coimbatore District">Coimbatore District</option>

                <option value="Nilgiris District">Nilgiris District</option>
              </select>
            </div>

            {/* =================================================
                USERNAME
            ================================================= */}

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Username
              </label>

              <input
                type="text"
                required
                autoComplete="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                  color: "#0f172a",
                  backgroundColor: "#f8fafc",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Password
              </label>

              <div
                style={{
                  position: "relative",
                }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 42px 12px 14px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#0f172a",
                    backgroundColor: "#f8fafc",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff
                      style={{
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  ) : (
                    <Eye
                      style={{
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  )}
                </button>
              </div>

              {/* Forgot Password */}

              <div
                style={{
                  textAlign: "right",
                  marginTop: "6px",
                }}
              >
                <a
                  href="#forgot"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    fontSize: "12px",
                    color: "#1d61f2",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* =================================================
                SIGN IN BUTTON
            ================================================= */}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: isLoading ? "#94a3b8" : "#1d61f2",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 700,
                boxShadow: "0 4px 14px rgba(29, 97, 242, 0.4)",
                marginTop: "10px",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* =================================================
              SECURITY MESSAGE
          ================================================= */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              marginTop: "24px",
              color: "#64748b",
              fontSize: "12px",
            }}
          >
            <Lock
              style={{
                width: "14px",
                height: "14px",
              }}
            />

            <span>Secure login for authorized officials only</span>
          </div>
        </div>
      </div>
    </div>
  );
};
