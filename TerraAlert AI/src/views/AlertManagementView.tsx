import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, X } from "lucide-react";

import { TerraAlertAPI } from "../api/service";
import type { AlertItem } from "../api/service";

export const AlertManagementView: React.FC = () => {
  // =========================================================
  // ALERT STATE
  // =========================================================

  const [localAlerts, setLocalAlerts] = useState<AlertItem[]>([]);

  const activeAlerts = localAlerts.filter(
    (alert) => alert.status === "Active" || alert.status === "Pending Approval",
  );

  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // =========================================================
  // MODALS
  // =========================================================

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // =========================================================
  // CREATE ALERT FORM
  // =========================================================

  const [newType, setNewType] = useState<
    | "Flood Warning"
    | "Landslide Warning"
    | "Heavy Rain Alert"
    | "Dam Overflow Alert"
  >("Flood Warning");

  const [newArea, setNewArea] = useState("Houston");

  const [newSeverity, setNewSeverity] = useState<"High" | "Medium" | "Low">(
    "High",
  );

  // =========================================================
  // EDIT ALERT FORM
  // =========================================================

  const [editType, setEditType] = useState<
    | "Flood Warning"
    | "Landslide Warning"
    | "Heavy Rain Alert"
    | "Dam Overflow Alert"
  >("Flood Warning");

  const [editArea, setEditArea] = useState("");

  const [editSeverity, setEditSeverity] = useState<"High" | "Medium" | "Low">(
    "High",
  );

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadAlerts();
  }, []);

  // =========================================================
  // LOAD ALERTS FROM BACKEND
  // =========================================================

  const loadAlerts = async () => {
    try {
      setIsLoading(true);

      // -------------------------------------------------------
      // Get real alerts from backend
      // -------------------------------------------------------

      const data = await TerraAlertAPI.getAlerts();

      // -------------------------------------------------------
      // Store alerts in frontend state
      // -------------------------------------------------------

      setLocalAlerts(data);

      // -------------------------------------------------------
      // Keep current selection if possible
      // -------------------------------------------------------

      setSelectedAlert((current) => {
        if (current) {
          const stillExists = data.find(
            (alert) => alert.id === current.id,
          );

          if (stillExists) {
            return stillExists;
          }
        }

        // Otherwise select first alert
        return data[0] || null;
      });
    } catch (error) {
      console.error("Failed to load alerts:", error);

      window.alert(
        error instanceof Error ? error.message : "Failed to load alerts.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================
  // CREATE ALERT
  // =========================================================

  const handleCreateAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const createdAlert = await TerraAlertAPI.createAlert({
        type: newType,
        area: newArea,
        severity: newSeverity,
        source: "AI Model",
        affectedPopulation: 2500,
        recommendedAction:
          "Issued high severity warning from management portal.",
      });

      // Add newly created alert to beginning
      setLocalAlerts((current) => [createdAlert, ...current]);

      // Select newly created alert
      setSelectedAlert(createdAlert);

      // Close modal
      setShowCreateModal(false);

      window.alert("Alert created successfully.\n\nStatus: Pending Approval");

      // Reset form
      setNewType("Flood Warning");
      setNewArea("Houston");
      setNewSeverity("High");
    } catch (error) {
      console.error("Create alert failed:", error);

      window.alert(
        error instanceof Error ? error.message : "Failed to create alert.",
      );
    }
  };

  // =========================================================
  // APPROVE & SEND ALERT
  // =========================================================

  const handleApproveAndSend = async () => {
    if (!selectedAlert) {
      window.alert("Please select an alert first.");
      return;
    }

    if (selectedAlert.status !== "Pending Approval") {
      window.alert("Only alerts pending approval can be approved.");
      return;
    }

    try {
      const approvedAlert = await TerraAlertAPI.approveAlert(selectedAlert.id);

      // Replace old alert with approved alert
      setLocalAlerts((currentAlerts) =>
        currentAlerts.map((alert) =>
          alert.id === approvedAlert.id ? approvedAlert : alert,
        ),
      );

      // Update selected alert
      setSelectedAlert(approvedAlert);

      window.alert("Alert approved and sent successfully.");
    } catch (error) {
      console.error("Approve alert failed:", error);

      window.alert(
        error instanceof Error ? error.message : "Failed to approve alert.",
      );
    }
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const handleOpenEdit = (alertItem: AlertItem) => {
    setSelectedAlert(alertItem);

    setEditType(alertItem.type);

    setEditArea(alertItem.area);

    setEditSeverity(alertItem.severity);

    setShowEditModal(true);
  };

  // =========================================================
  // SAVE EDITED ALERT
  // =========================================================

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAlert) {
      return;
    }

    try {
      const updatedAlert = await TerraAlertAPI.updateAlert(selectedAlert.id, {
        type: editType,
        area: editArea,
        severity: editSeverity,
      });

      // Update local state
      setLocalAlerts((currentAlerts) =>
        currentAlerts.map((alert) =>
          alert.id === updatedAlert.id ? updatedAlert : alert,
        ),
      );

      // Update selected alert
      setSelectedAlert(updatedAlert);

      // Close modal
      setShowEditModal(false);

      window.alert("Alert updated successfully.");
    } catch (error) {
      console.error("Update alert failed:", error);

      window.alert(
        error instanceof Error ? error.message : "Failed to update alert.",
      );
    }
  };

  // =========================================================
  // OPEN DELETE MODAL
  // =========================================================

  const handleOpenDelete = (alertItem: AlertItem) => {
    setSelectedAlert(alertItem);

    setShowDeleteModal(true);
  };

  // =========================================================
  // DELETE ALERT
  // =========================================================

  const handleDeleteAlert = async () => {
    if (!selectedAlert) {
      return;
    }

    try {
      await TerraAlertAPI.deleteAlert(selectedAlert.id);

      // Remove deleted alert
      const remainingAlerts = localAlerts.filter(
        (alert) => alert.id !== selectedAlert.id,
      );

      setLocalAlerts(remainingAlerts);

      // Select another alert if available
      setSelectedAlert(remainingAlerts.length > 0 ? remainingAlerts[0] : null);

      // Close modal
      setShowDeleteModal(false);

      window.alert("Alert deleted successfully.");
    } catch (error) {
      console.error("Delete alert failed:", error);

      window.alert(
        error instanceof Error ? error.message : "Failed to delete alert.",
      );
    }
  };

  // =========================================================
  // SEVERITY BACKGROUND
  // =========================================================

  const getSeverityBackground = (severity: string) => {
    if (severity === "High") {
      return "#fef2f2";
    }

    if (severity === "Medium") {
      return "#fffbeb";
    }

    return "#f0fdf4";
  };

  // =========================================================
  // SEVERITY COLOR
  // =========================================================

  const getSeverityColor = (severity: string) => {
    if (severity === "High") {
      return "#ef4444";
    }

    if (severity === "Medium") {
      return "#d97706";
    }

    return "#16a34a";
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
          HEADER
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
            fontSize: "14px",
            fontWeight: 700,
            color: "#1d61f2",
            paddingBottom: "8px",
            borderBottom: "2px solid #1d61f2",
          }}
        >
          Active Alerts
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            backgroundColor: "#1d61f2",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Plus
            style={{
              width: "16px",
              height: "16px",
            }}
          />

          <span>Create Alert</span>
        </button>
      </div>

      {/* =====================================================
          ALERT TABLE
          ===================================================== */}

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
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
                fontWeight: 600,
              }}
            >
              <th
                style={{
                  padding: "14px 20px",
                }}
              >
                Alert Type
              </th>

              <th
                style={{
                  padding: "14px 20px",
                }}
              >
                Area
              </th>

              <th
                style={{
                  padding: "14px 20px",
                }}
              >
                Severity
              </th>

              <th
                style={{
                  padding: "14px 20px",
                }}
              >
                Source
              </th>

              <th
                style={{
                  padding: "14px 20px",
                }}
              >
                Issued At
              </th>

              <th
                style={{
                  padding: "14px 20px",
                }}
              >
                Status
              </th>

              <th
                style={{
                  padding: "14px 20px",
                  textAlign: "right",
                }}
              >
                Actions
              </th>
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
                  Loading alerts...
                </td>
              </tr>
            ) : (
              <>
                {activeAlerts.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedAlert(item)}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      cursor: "pointer",
                      backgroundColor:
                        selectedAlert?.id === item.id
                          ? "#f0f7ff"
                          : "transparent",
                    }}
                  >
                    {/* ALERT TYPE */}

                    <td
                      style={{
                        padding: "14px 20px",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {item.type}
                    </td>

                    {/* AREA */}

                    <td
                      style={{
                        padding: "14px 20px",
                        color: "#334155",
                      }}
                    >
                      {item.area}
                    </td>

                    {/* SEVERITY */}

                    <td
                      style={{
                        padding: "14px 20px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: "12px",
                          backgroundColor: getSeverityBackground(item.severity),
                          color: getSeverityColor(item.severity),
                        }}
                      >
                        {item.severity}
                      </span>
                    </td>

                    {/* SOURCE */}

                    <td
                      style={{
                        padding: "14px 20px",
                        color: "#64748b",
                      }}
                    >
                      {item.source}
                    </td>

                    {/* ISSUED AT */}

                    <td
                      style={{
                        padding: "14px 20px",
                        color: "#64748b",
                      }}
                    >
                      {item.issuedAt || "Not issued"}
                    </td>

                    {/* STATUS */}

                    <td
                      style={{
                        padding: "14px 20px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color:
                            item.status === "Active"
                              ? "#16a34a"
                              : item.status === "Pending Approval"
                                ? "#d97706"
                                : "#64748b",
                        }}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td
                      style={{
                        padding: "14px 20px",
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
                          onClick={(e) => {
                            e.stopPropagation();

                            handleOpenEdit(item);
                          }}
                          title="Edit Alert"
                          style={{
                            background: "none",
                            border: "none",
                            color: "#1d61f2",
                            cursor: "pointer",
                            padding: "4px",
                          }}
                        >
                          <Edit2
                            style={{
                              width: "16px",
                              height: "16px",
                            }}
                          />
                        </button>

                        {/* DELETE */}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            handleOpenDelete(item);
                          }}
                          title="Delete Alert"
                          style={{
                            background: "none",
                            border: "none",
                            color: "#ef4444",
                            cursor: "pointer",
                            padding: "4px",
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

                {activeAlerts.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        padding: "40px",
                        textAlign: "center",
                        color: "#64748b",
                      }}
                    >
                      No active alerts.
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          ALERT DETAIL
          ===================================================== */}

      {selectedAlert && (
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
            Alert Detail
          </h4>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: "20px",
            }}
          >
            {/* ALERT INFORMATION */}

            <div>
              <h5
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "6px",
                }}
              >
                {selectedAlert.type}
                {" - "}
                {selectedAlert.area}
              </h5>

              <p
                style={{
                  fontSize: "13px",
                  color: "#475569",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {selectedAlert.recommendedAction}
              </p>
            </div>

            {/* AFFECTED POPULATION */}

            <div>
              <span
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Affected Population
              </span>

              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#0f172a",
                }}
              >
                {selectedAlert.affectedPopulation?.toLocaleString() || "0"}
              </span>
            </div>

            {/* VALID UNTIL */}

            <div>
              <span
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Valid Until
              </span>

              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                {selectedAlert.validUntil || "Not issued"}
              </span>
            </div>
          </div>

          {/* =================================================
              ACTION BUTTONS
              ================================================= */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "10px",
            }}
          >
            {/* APPROVE & SEND */}

            {selectedAlert.status === "Pending Approval" && (
              <button
                onClick={handleApproveAndSend}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  backgroundColor: "#16a34a",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <CheckCircle2
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />

                <span>Approve & Send</span>
              </button>
            )}

            {/* EDIT */}

            <button
              onClick={() => handleOpenEdit(selectedAlert)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                border: "1px solid #cbd5e1",
                color: "#334155",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Edit Alert
            </button>

            {/* DELETE */}

            <button
              onClick={() => handleOpenDelete(selectedAlert)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                border: "1px solid #fee2e2",
                color: "#ef4444",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Delete Alert
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          CREATE ALERT MODAL
          ===================================================== */}

      {showCreateModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              width: "450px",
              maxWidth: "90%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Create Emergency Alert
              </h3>

              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                <X
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </button>
            </div>

            <form
              onSubmit={handleCreateAlertSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* ALERT TYPE */}

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
                  Alert Type
                </label>

                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as typeof newType)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13px",
                  }}
                >
                  <option value="Flood Warning">Flood Warning</option>

                  <option value="Landslide Warning">Landslide Warning</option>

                  <option value="Heavy Rain Alert">Heavy Rain Alert</option>

                  <option value="Dam Overflow Alert">Dam Overflow Alert</option>
                </select>
              </div>

              {/* TARGET AREA */}

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
                  Target Area
                </label>

                <input
                  type="text"
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* SEVERITY */}

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
                  Severity
                </label>

                <select
                  value={newSeverity}
                  onChange={(e) =>
                    setNewSeverity(e.target.value as typeof newSeverity)
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13px",
                  }}
                >
                  <option value="High">High</option>

                  <option value="Medium">Medium</option>

                  <option value="Low">Low</option>
                </select>
              </div>

              {/* BUTTONS */}

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#ffffff",
                    color: "#64748b",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#1d61f2",
                    color: "#ffffff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Publish Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          EDIT ALERT MODAL
          ===================================================== */}

      {showEditModal && selectedAlert && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              width: "450px",
              maxWidth: "90%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
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
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Edit Alert
              </h3>

              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                <X
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </button>
            </div>

            <form
              onSubmit={handleSaveEdit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* TYPE */}

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
                  Alert Type
                </label>

                <select
                  value={editType}
                  onChange={(e) =>
                    setEditType(e.target.value as typeof editType)
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13px",
                  }}
                >
                  <option value="Flood Warning">Flood Warning</option>

                  <option value="Landslide Warning">Landslide Warning</option>

                  <option value="Heavy Rain Alert">Heavy Rain Alert</option>

                  <option value="Dam Overflow Alert">Dam Overflow Alert</option>
                </select>
              </div>

              {/* AREA */}

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
                  Target Area
                </label>

                <input
                  type="text"
                  value={editArea}
                  onChange={(e) => setEditArea(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* SEVERITY */}

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
                  Severity
                </label>

                <select
                  value={editSeverity}
                  onChange={(e) =>
                    setEditSeverity(e.target.value as typeof editSeverity)
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13px",
                  }}
                >
                  <option value="High">High</option>

                  <option value="Medium">Medium</option>

                  <option value="Low">Low</option>
                </select>
              </div>

              {/* BUTTONS */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#ffffff",
                    color: "#64748b",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#1d61f2",
                    color: "#ffffff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE CONFIRMATION
          ===================================================== */}

      {showDeleteModal && selectedAlert && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1001,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              width: "420px",
              maxWidth: "90%",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "#fef2f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <Trash2
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#ef4444",
                }}
              />
            </div>

            <h3
              style={{
                fontSize: "19px",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "8px",
              }}
            >
              Delete Alert?
            </h3>

            <p
              style={{
                fontSize: "13px",
                color: "#64748b",
                lineHeight: 1.6,
                marginBottom: "22px",
              }}
            >
              Are you sure you want to delete{" "}
              <strong>{selectedAlert.type}</strong> for{" "}
              <strong>{selectedAlert.area}</strong>? This action cannot be
              undone.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#64748b",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAlert}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#ef4444",
                  color: "#ffffff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Delete Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
