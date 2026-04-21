import React from "react";
import "./AuthTheme.css";

const stats = [
  { label: "Active Users", value: "128", accent: "#2563eb" },
  { label: "Pending Bookings", value: "14", accent: "#7c3aed" },
  { label: "Open Tickets", value: "09", accent: "#d97706" },
  { label: "Alerts Today", value: "03", accent: "#db2777" },
];

const activities = [
  "New campus user account verified through Google login.",
  "Lecture Hall A booking request is waiting for review.",
  "Maintenance ticket for Projector-07 marked as in progress.",
  "Notification batch sent to all facility coordinators.",
];

export default function AdminDashboard({ adminUser, onBackToLogin, onGoHome }) {
  return (
    <div className="admin-shell">
      <div className="admin-container">
        <section className="admin-hero">
          <div>
            <div className="admin-badge">ADMIN PORTAL</div>
            <h1 className="auth-dashboard-title">Smart Campus Admin Dashboard</h1>
            <p className="admin-hero-text">
              Monitor campus activity, review requests, and manage operational
              updates from one place.
            </p>
          </div>

          <div className="admin-user-card">
            <div className="admin-user-label">Signed in as</div>
            <div className="admin-user-name">
              {adminUser?.name || "Administrator"}
            </div>
            <div className="admin-user-email">{adminUser?.email}</div>
            <div className="admin-user-role">{adminUser?.role || "ADMIN"}</div>
          </div>
        </section>

        <section className="admin-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="admin-stat-card">
              <div className="admin-stat-dot" style={{ background: stat.accent }} />
              <div className="auth-stat-value">{stat.value}</div>
              <div className="admin-stat-label">{stat.label}</div>
            </div>
          ))}
        </section>

        <section className="admin-content-grid">
          <div className="admin-panel-card">
            <h2 className="auth-section-title">Recent Admin Activity</h2>
            <div className="admin-activity-list">
              {activities.map((item) => (
                <div key={item} className="admin-activity-item">
                  <div className="admin-activity-dot" />
                  <div className="admin-activity-text">{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-panel-card admin-actions">
            <h2 className="auth-section-title">Quick Actions</h2>
            <button type="button" className="admin-primary-btn" onClick={onGoHome}>
              Go to Home Page
            </button>
            <button
              type="button"
              className="admin-secondary-btn"
              onClick={onBackToLogin}
            >
              Back to Admin Login
            </button>
            <div className="admin-note">
              This dashboard is rendered entirely from the auth module so the
              change stays inside `frontend/src/pages/auth` for easier merging.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
