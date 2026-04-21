import React from "react";

const cardStyle = {
  background: "#ffffff",
  borderRadius: "20px",
  padding: "20px",
  border: "1px solid rgba(91, 75, 255, 0.12)",
  boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
};

const stats = [
  { label: "Active Users", value: "128", accent: "#4f46e5" },
  { label: "Pending Bookings", value: "14", accent: "#0f766e" },
  { label: "Open Tickets", value: "09", accent: "#d97706" },
  { label: "Alerts Today", value: "03", accent: "#dc2626" },
];

const activities = [
  "New campus user account verified through Google login.",
  "Lecture Hall A booking request is waiting for review.",
  "Maintenance ticket for Projector-07 marked as in progress.",
  "Notification batch sent to all facility coordinators.",
];

export default function AdminDashboard({ adminUser, onBackToLogin, onGoHome }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef2ff 0%, #f8fafc 45%, #e0f2fe 100%)",
        padding: "28px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        <section
          style={{
            ...cardStyle,
            padding: "26px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 12px",
                borderRadius: "999px",
                background: "rgba(79, 70, 229, 0.10)",
                color: "#4338ca",
                fontSize: "12px",
                fontWeight: "700",
                marginBottom: "14px",
              }}
            >
              ADMIN PORTAL
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "34px",
                color: "#0f172a",
              }}
            >
              Smart Campus Admin Dashboard
            </h1>
            <p
              style={{
                margin: "10px 0 0",
                color: "#475569",
                fontSize: "16px",
                lineHeight: 1.6,
                maxWidth: "680px",
              }}
            >
              Monitor campus activity, review requests, and manage operational
              updates from one place.
            </p>
          </div>

          <div
            style={{
              minWidth: "260px",
              padding: "18px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #4f46e5, #6366f1)",
              color: "#ffffff",
              boxShadow: "0 14px 30px rgba(79, 70, 229, 0.24)",
            }}
          >
            <div style={{ fontSize: "13px", opacity: 0.85 }}>Signed in as</div>
            <div style={{ fontSize: "20px", fontWeight: "800", marginTop: "6px" }}>
              {adminUser?.name || "Administrator"}
            </div>
            <div style={{ fontSize: "14px", marginTop: "4px", opacity: 0.9 }}>
              {adminUser?.email}
            </div>
            <div
              style={{
                display: "inline-flex",
                marginTop: "12px",
                padding: "5px 10px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.18)",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.05em",
              }}
            >
              {adminUser?.role || "ADMIN"}
            </div>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "16px",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} style={cardStyle}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "999px",
                  background: stat.accent,
                  marginBottom: "18px",
                }}
              />
              <div style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a" }}>
                {stat.value}
              </div>
              <div style={{ marginTop: "6px", color: "#64748b", fontSize: "14px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "18px",
          }}
        >
          <div style={cardStyle}>
            <h2 style={{ margin: 0, fontSize: "22px", color: "#0f172a" }}>
              Recent Admin Activity
            </h2>
            <div style={{ marginTop: "18px", display: "grid", gap: "12px" }}>
              {activities.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "14px 16px",
                    borderRadius: "16px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "999px",
                      background: "#4f46e5",
                      marginTop: "6px",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ color: "#334155", lineHeight: 1.6 }}>{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...cardStyle, display: "grid", gap: "12px", alignContent: "start" }}>
            <h2 style={{ margin: 0, fontSize: "22px", color: "#0f172a" }}>
              Quick Actions
            </h2>
            <button
              type="button"
              onClick={onGoHome}
              style={{
                padding: "14px 16px",
                border: "none",
                borderRadius: "14px",
                background: "#4f46e5",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Go to Home Page
            </button>
            <button
              type="button"
              onClick={onBackToLogin}
              style={{
                padding: "14px 16px",
                borderRadius: "14px",
                border: "1px solid #cbd5e1",
                background: "#fff",
                color: "#334155",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Back to Admin Login
            </button>
            <div
              style={{
                borderRadius: "16px",
                background: "#eff6ff",
                padding: "16px",
                color: "#1e3a8a",
                lineHeight: 1.6,
                fontSize: "14px",
              }}
            >
              This dashboard is rendered entirely from the auth module so the
              change stays inside `frontend/src/pages/auth` for easier merging.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
