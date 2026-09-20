import React, { useEffect, useState } from "react";
import {
  UserPlus,
  Edit2,
  Trash2,
  Shield,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";

// =========================================================
// TYPES
// =========================================================

type UserRole = "ADMIN" | "DISASTER_MANAGER" | "FIELD_OFFICER" | "ANALYST";

interface UserData {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

type SubTab = "Users" | "Roles & Permissions" | "Audit Logs";

// =========================================================
// API CONFIGURATION
// =========================================================

const API_BASE_URL = "http://localhost:8089";

// =========================================================
// HELPER - GET JWT TOKEN
// =========================================================

const getAuthToken = (): string | null => {
  const possibleKeys = [
    "token",
    "accessToken",
    "authToken",
    "terraalert_token",
    "jwtToken",
  ];

  for (const key of possibleKeys) {
    const value = localStorage.getItem(key);

    if (value) {
      return value;
    }
  }

  return null;
};

// =========================================================
// API REQUEST HELPER
// =========================================================

const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<any> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication token not found. Please login again.");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();

      if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (errorData?.error) {
        errorMessage = errorData.error;
      }
    } catch {
      // Ignore JSON parsing error
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// =========================================================
// ROLE DISPLAY
// =========================================================

const getRoleLabel = (role: UserRole): string => {
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
      return role;
  }
};

// =========================================================
// ROLE COLOR
// =========================================================

const getRoleColor = (role: UserRole): string => {
  switch (role) {
    case "ADMIN":
      return "#7c3aed";

    case "DISASTER_MANAGER":
      return "#dc2626";

    case "FIELD_OFFICER":
      return "#16a34a";

    case "ANALYST":
      return "#d97706";

    default:
      return "#64748b";
  }
};

// =========================================================
// DATE FORMATTER
// =========================================================

const formatDate = (dateString: string): string => {
  if (!dateString) {
    return "—";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// =========================================================
// MAIN COMPONENT
// =========================================================

export const UserManagementView: React.FC = () => {
  // =======================================================
  // TABS
  // =======================================================

  const [activeTabSub, setActiveTabSub] = useState<SubTab>("Users");

  // =======================================================
  // USERS
  // =======================================================

  const [users, setUsers] = useState<UserData[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =======================================================
  // ADD MODAL
  // =======================================================

  const [showAddModal, setShowAddModal] = useState(false);

  // =======================================================
  // EDIT MODAL
  // =======================================================

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // =======================================================
  // FORM STATES
  // =======================================================

  const [newUsername, setNewUsername] = useState("");

  const [newEmail, setNewEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [newName, setNewName] = useState("");

  const [newRole, setNewRole] = useState<UserRole>("FIELD_OFFICER");

  // =======================================================

  const [editUsername, setEditUsername] = useState("");

  const [editEmail, setEditEmail] = useState("");

  const [editName, setEditName] = useState("");

  const [editRole, setEditRole] = useState<UserRole>("FIELD_OFFICER");

  const [editEnabled, setEditEnabled] = useState(true);

  // =======================================================
  // ACTION STATE
  // =======================================================

  const [actionLoading, setActionLoading] = useState(false);

  // =========================================================
  // LOAD USERS
  // =========================================================

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest("/api/users");

      setUsers(data);
    } catch (err: any) {
      console.error("Failed to load users:", err);

      setError(err?.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD USERS WHEN COMPONENT OPENS
  // =========================================================

  useEffect(() => {
    if (activeTabSub === "Users") {
      loadUsers();
    }
  }, [activeTabSub]);

  // =========================================================
  // RESET ADD FORM
  // =========================================================

  const resetAddForm = () => {
    setNewUsername("");
    setNewEmail("");
    setNewPassword("");
    setNewName("");
    setNewRole("FIELD_OFFICER");
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);

    setEditUsername(user.username);
    setEditEmail(user.email);
    setEditName(user.fullName);
    setEditRole(user.role);
    setEditEnabled(user.enabled);

    setShowEditModal(true);
  };

  // =========================================================
  // ADD USER
  // =========================================================

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newUsername || !newEmail || !newPassword || !newName) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      await apiRequest("/api/auth/register", {
        method: "POST",

        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
          password: newPassword,
          fullName: newName,
          role: newRole,
        }),
      });

      // Close modal
      setShowAddModal(false);

      // Clear form
      resetAddForm();

      // Reload users from MongoDB
      await loadUsers();
    } catch (err: any) {
      console.error("Failed to create user:", err);

      setError(err?.message || "Unable to create user.");
    } finally {
      setActionLoading(false);
    }
  };

  // =========================================================
  // UPDATE USER
  // =========================================================

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      await apiRequest(`/api/users/${selectedUser.id}`, {
        method: "PUT",

        body: JSON.stringify({
          username: editUsername,
          email: editEmail,
          fullName: editName,
          role: editRole,
          enabled: editEnabled,
        }),
      });

      setShowEditModal(false);

      setSelectedUser(null);

      await loadUsers();
    } catch (err: any) {
      console.error("Failed to update user:", err);

      setError(err?.message || "Unable to update user.");
    } finally {
      setActionLoading(false);
    }
  };

  // =========================================================
  // ENABLE USER
  // =========================================================

  const handleEnableUser = async (id: string) => {
    try {
      setActionLoading(true);
      setError("");

      await apiRequest(`/api/users/${id}/enable`, {
        method: "PATCH",
      });

      await loadUsers();
    } catch (err: any) {
      console.error("Failed to enable user:", err);

      setError(err?.message || "Unable to enable user.");
    } finally {
      setActionLoading(false);
    }
  };

  // =========================================================
  // DISABLE USER
  // =========================================================

  const handleDisableUser = async (user: UserData) => {
    if (user.role === "ADMIN") {
      alert("Administrator accounts cannot be disabled from this screen.");

      return;
    }

    const confirmed = window.confirm(`Disable ${user.fullName}?`);

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      await apiRequest(`/api/users/${user.id}/disable`, {
        method: "PATCH",
      });

      await loadUsers();
    } catch (err: any) {
      console.error("Failed to disable user:", err);

      setError(err?.message || "Unable to disable user.");
    } finally {
      setActionLoading(false);
    }
  };

  // =========================================================
  // DELETE USER
  // =========================================================

  const handleDeleteUser = async (user: UserData) => {
    if (user.role === "ADMIN") {
      alert("Administrator accounts cannot be deleted from this screen.");

      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete ${user.fullName}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      await apiRequest(`/api/users/${user.id}`, {
        method: "DELETE",
      });

      await loadUsers();
    } catch (err: any) {
      console.error("Failed to delete user:", err);

      setError(err?.message || "Unable to delete user.");
    } finally {
      setActionLoading(false);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

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
          TOP HEADER
          ===================================================== */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "24px",
          }}
        >
          {(["Users", "Roles & Permissions", "Audit Logs"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTabSub(tab)}
                style={{
                  fontSize: "15px",
                  fontWeight: activeTabSub === tab ? 700 : 500,
                  color: activeTabSub === tab ? "#1d61f2" : "#64748b",
                  background: "none",
                  paddingBottom: "8px",
                  border: "none",
                  borderBottom:
                    activeTabSub === tab
                      ? "3px solid #1d61f2"
                      : "3px solid transparent",
                  cursor: "pointer",
                }}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        {activeTabSub === "Users" && (
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              onClick={loadUsers}
              disabled={loading}
              style={{
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                color: "#475569",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
              }}
              title="Refresh users"
            >
              <RefreshCw
                style={{
                  width: "15px",
                  height: "15px",
                }}
              />
              Refresh
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#1d61f2",
                color: "#ffffff",
                fontSize: "13.5px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(29, 97, 242, 0.4)",
              }}
            >
              <UserPlus
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />

              <span>+ Add User</span>
            </button>
          </div>
        )}
      </div>

      {/* =====================================================
          ERROR MESSAGE
          ===================================================== */}

      {error && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{error}</span>

          <button
            onClick={() => setError("")}
            style={{
              background: "none",
              border: "none",
              color: "#b91c1c",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* =====================================================
          USERS TAB
          ===================================================== */}

      {activeTabSub === "Users" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              <RefreshCw
                style={{
                  width: "28px",
                  height: "28px",
                  marginBottom: "10px",
                }}
              />

              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Loading users...
              </div>
            </div>
          ) : users.length === 0 ? (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              No users found.
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  fontSize: "13px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#f8fafc",
                      borderBottom: "1px solid #e2e8f0",
                      color: "#64748b",
                    }}
                  >
                    <th
                      style={{
                        padding: "16px 20px",
                      }}
                    >
                      Official
                    </th>

                    <th
                      style={{
                        padding: "16px 20px",
                      }}
                    >
                      Username
                    </th>

                    <th
                      style={{
                        padding: "16px 20px",
                      }}
                    >
                      Role
                    </th>

                    <th
                      style={{
                        padding: "16px 20px",
                      }}
                    >
                      Email
                    </th>

                    <th
                      style={{
                        padding: "16px 20px",
                      }}
                    >
                      Status
                    </th>

                    <th
                      style={{
                        padding: "16px 20px",
                      }}
                    >
                      Created
                    </th>

                    <th
                      style={{
                        padding: "16px 20px",
                        textAlign: "right",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                      }}
                    >
                      {/* OFFICIAL */}

                      <td
                        style={{
                          padding: "16px 20px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "38px",
                              height: "38px",
                              borderRadius: "50%",
                              backgroundColor: "#eff6ff",
                              color: "#1d61f2",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                            }}
                          >
                            {user.fullName.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <div
                              style={{
                                fontWeight: 700,
                                color: "#0f172a",
                              }}
                            >
                              {user.fullName}
                            </div>

                            <div
                              style={{
                                fontSize: "11px",
                                color: "#94a3b8",
                                marginTop: "2px",
                              }}
                            >
                              Official Account
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* USERNAME */}

                      <td
                        style={{
                          padding: "16px 20px",
                          color: "#334155",
                          fontWeight: 600,
                        }}
                      >
                        @{user.username}
                      </td>

                      {/* ROLE */}

                      <td
                        style={{
                          padding: "16px 20px",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding: "5px 9px",
                            borderRadius: "6px",
                            backgroundColor: `${getRoleColor(user.role)}15`,
                            color: getRoleColor(user.role),
                            fontSize: "11px",
                            fontWeight: 700,
                          }}
                        >
                          {getRoleLabel(user.role)}
                        </span>
                      </td>

                      {/* EMAIL */}

                      <td
                        style={{
                          padding: "16px 20px",
                          color: "#64748b",
                        }}
                      >
                        {user.email}
                      </td>

                      {/* STATUS */}

                      <td
                        style={{
                          padding: "16px 20px",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "11px",
                            fontWeight: 700,
                            color: user.enabled ? "#16a34a" : "#dc2626",
                          }}
                        >
                          {user.enabled ? (
                            <CheckCircle2
                              style={{
                                width: "14px",
                                height: "14px",
                              }}
                            />
                          ) : (
                            <XCircle
                              style={{
                                width: "14px",
                                height: "14px",
                              }}
                            />
                          )}

                          {user.enabled ? "Active" : "Disabled"}
                        </span>
                      </td>

                      {/* CREATED */}

                      <td
                        style={{
                          padding: "16px 20px",
                          color: "#64748b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatDate(user.createdAt)}
                      </td>

                      {/* ACTIONS */}

                      <td
                        style={{
                          padding: "16px 20px",
                          textAlign: "right",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            justifyContent: "flex-end",
                          }}
                        >
                          {/* EDIT */}

                          <button
                            onClick={() => handleEditUser(user)}
                            title="Edit user"
                            style={{
                              background: "#eff6ff",
                              color: "#1d61f2",
                              border: "none",
                              width: "34px",
                              height: "34px",
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <Edit2
                              style={{
                                width: "16px",
                                height: "16px",
                              }}
                            />
                          </button>

                          {/* ENABLE / DISABLE */}

                          {user.enabled ? (
                            <button
                              onClick={() => handleDisableUser(user)}
                              title="Disable user"
                              style={{
                                background: "#fff7ed",
                                color: "#d97706",
                                border: "none",
                                width: "34px",
                                height: "34px",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor:
                                  user.role === "ADMIN"
                                    ? "not-allowed"
                                    : "pointer",
                                opacity: user.role === "ADMIN" ? 0.5 : 1,
                              }}
                            >
                              <XCircle
                                style={{
                                  width: "16px",
                                  height: "16px",
                                }}
                              />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEnableUser(user.id)}
                              title="Enable user"
                              style={{
                                background: "#f0fdf4",
                                color: "#16a34a",
                                border: "none",
                                width: "34px",
                                height: "34px",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                            >
                              <CheckCircle2
                                style={{
                                  width: "16px",
                                  height: "16px",
                                }}
                              />
                            </button>
                          )}

                          {/* DELETE */}

                          <button
                            onClick={() => handleDeleteUser(user)}
                            title="Delete user"
                            style={{
                              background: "#fef2f2",
                              color: "#ef4444",
                              border: "none",
                              width: "34px",
                              height: "34px",
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor:
                                user.role === "ADMIN"
                                  ? "not-allowed"
                                  : "pointer",
                              opacity: user.role === "ADMIN" ? 0.5 : 1,
                            }}
                          >
                            <Trash2
                              style={{
                                width: "16px",
                                height: "16px",
                              }}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* =====================================================
          ROLES & PERMISSIONS
          ===================================================== */}

      {activeTabSub === "Roles & Permissions" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
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
            System Roles & Security Matrix
          </h4>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            {/* ADMIN */}

            <RoleCard
              title="Administrator"
              role="ADMIN"
              description="Full system administration access, user management, configuration, and disaster management oversight."
            />

            {/* DISASTER MANAGER */}

            <RoleCard
              title="Disaster Manager"
              role="DISASTER_MANAGER"
              description="Disaster response management, alert approval, resource prioritization, evacuation planning, and shelter coordination."
            />

            {/* FIELD OFFICER */}

            <RoleCard
              title="Field Officer"
              role="FIELD_OFFICER"
              description="Field-level monitoring, village analysis, alerts, resource coordination, evacuation planning, and shelter operations."
            />

            {/* ANALYST */}

            <RoleCard
              title="Data Analyst"
              role="ANALYST"
              description="Read-only analytical access, satellite monitoring, risk analysis, reports, and data interpretation."
            />
          </div>
        </div>
      )}

      {/* =====================================================
          AUDIT LOGS
          ===================================================== */}

      {activeTabSub === "Audit Logs" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
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
            System Security Audit Logs
          </h4>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              fontSize: "13px",
            }}
          >
            <div
              style={{
                padding: "14px 16px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                color: "#475569",
              }}
            >
              User activity audit logging will be connected to the backend audit
              service next.
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ADD USER MODAL
          ===================================================== */}

      {showAddModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.55)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "30px",
              width: "440px",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Add New Official User
              </h3>

              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  marginTop: "6px",
                }}
              >
                Create an authorized government official account.
              </p>
            </div>

            <form
              onSubmit={handleAddUser}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {/* FULL NAME */}

              <FormField label="Full Name">
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Ramesh"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={inputStyle}
                />
              </FormField>

              {/* USERNAME */}

              <FormField label="Username">
                <input
                  type="text"
                  required
                  placeholder="e.g. s.ramesh"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  style={inputStyle}
                />
              </FormField>

              {/* EMAIL */}

              <FormField label="Official Email">
                <input
                  type="email"
                  required
                  placeholder="official@terraalert.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  style={inputStyle}
                />
              </FormField>

              {/* PASSWORD */}

              <FormField label="Temporary Password">
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={inputStyle}
                />
              </FormField>

              {/* ROLE */}

              <FormField label="System Role">
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  style={inputStyle}
                >
                  <option value="FIELD_OFFICER">Field Officer</option>

                  <option value="DISASTER_MANAGER">Disaster Manager</option>

                  <option value="ANALYST">Data Analyst</option>

                  <option value="ADMIN">Administrator</option>
                </select>
              </FormField>

              {/* BUTTONS */}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                  marginTop: "8px",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetAddForm();
                  }}
                  style={secondaryButtonStyle}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={actionLoading}
                  style={primaryButtonStyle}
                >
                  {actionLoading ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          EDIT USER MODAL
          ===================================================== */}

      {showEditModal && selectedUser && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.55)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "30px",
              width: "440px",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Edit Official User
              </h3>

              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  marginTop: "6px",
                }}
              >
                Update account information and system role.
              </p>
            </div>

            <form
              onSubmit={handleUpdateUser}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <FormField label="Full Name">
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={inputStyle}
                />
              </FormField>

              <FormField label="Username">
                <input
                  type="text"
                  required
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  style={inputStyle}
                />
              </FormField>

              <FormField label="Official Email">
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  style={inputStyle}
                />
              </FormField>

              <FormField label="System Role">
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as UserRole)}
                  style={inputStyle}
                >
                  <option value="FIELD_OFFICER">Field Officer</option>

                  <option value="DISASTER_MANAGER">Disaster Manager</option>

                  <option value="ANALYST">Data Analyst</option>

                  <option value="ADMIN">Administrator</option>
                </select>
              </FormField>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#334155",
                  fontWeight: 600,
                }}
              >
                <input
                  type="checkbox"
                  checked={editEnabled}
                  onChange={(e) => setEditEnabled(e.target.checked)}
                />
                Account Enabled
              </label>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                  marginTop: "8px",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                  }}
                  style={secondaryButtonStyle}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={actionLoading}
                  style={primaryButtonStyle}
                >
                  {actionLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================
// ROLE CARD
// =========================================================

interface RoleCardProps {
  title: string;
  role: UserRole;
  description: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, role, description }) => {
  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #cbd5e1",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <Shield
          style={{
            width: "18px",
            height: "18px",
            color: getRoleColor(role),
          }}
        />

        <h5
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#0f172a",
            margin: 0,
          }}
        >
          {title}
        </h5>
      </div>

      <p
        style={{
          fontSize: "12px",
          color: "#64748b",
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  );
};

// =========================================================
// FORM FIELD
// =========================================================

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, children }) => {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "13px",
          fontWeight: 600,
          color: "#334155",
          marginBottom: "6px",
        }}
      >
        {label}
      </label>

      {children}
    </div>
  );
};

// =========================================================
// SHARED STYLES
// =========================================================

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "13px",
  color: "#0f172a",
  backgroundColor: "#ffffff",
  boxSizing: "border-box",
};

const primaryButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#1d61f2",
  color: "#ffffff",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#ffffff",
  color: "#64748b",
  cursor: "pointer",
};
