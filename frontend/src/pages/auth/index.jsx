import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

export default function AuthPage() {
  const navigate = useNavigate();
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminUser, setAdminUser] = useState(null);
  const [adminError, setAdminError] = useState("");

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleAdminLogin = async () => {
    try {
      setAdminError("");

      const loginRes = await axios.post("http://localhost:8080/api/auth/login", {
        email: adminEmail,
        password: adminPassword,
      });

      if (!loginRes.data.success) {
        setAdminError("Invalid admin email or password.");
        return;
      }

      const userRes = await axios.get(
        `http://localhost:8080/api/auth/me?email=${adminEmail}`
      );

      if (!userRes.data.success) {
        setAdminError("Admin user not found.");
        return;
      }

      if (userRes.data.data.role !== "ADMIN") {
        setAdminError("This account does not have admin access.");
        return;
      }

      setAdminUser(userRes.data.data);
    } catch (error) {
      setAdminError("Admin login failed. Please try again.");
      console.error(error);
    }
  };

  const handleBackToLogin = () => {
    setAdminUser(null);
    setAdminPassword("");
    setAdminError("");
  };

  if (adminUser) {
    return (
      <AdminDashboard
        adminUser={adminUser}
        onBackToLogin={handleBackToLogin}
        onGoHome={() => navigate("/")}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #eef2ff 0%, #f8fafc 45%, #dbeafe 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          borderRadius: "28px",
          boxShadow: "0 18px 50px rgba(15, 23, 42, 0.12)",
          padding: "34px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "68px",
            height: "68px",
            margin: "0 auto 22px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #5b4bff, #4a3df0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 20px rgba(91,75,255,0.25)",
            fontSize: "30px",
          }}
        >
          🏛️
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "800",
            color: "#111827",
            fontFamily: "Georgia, serif",
          }}
        >
          Smart Campus
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: "28px",
            fontSize: "15px",
            fontWeight: "700",
            color: "#4f46e5",
          }}
        >
          Operations Hub
        </p>

        <p
          style={{
            margin: "0 auto 22px",
            maxWidth: "340px",
            fontSize: "16px",
            lineHeight: "1.7",
            color: "#475569",
            fontFamily: "Georgia, serif",
          }}
        >
          Sign in with your university Google account to access the campus
          management system
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "24px 0 22px",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
          <span
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1px",
              color: "#94a3b8",
            }}
          >
            CONTINUE WITH
          </span>
          <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
        </div>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "12px",
            padding: "14px 18px",
            background: "#4285F4",
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 12px 24px rgba(66,133,244,0.24)",
          }}
        >
          G Sign in with Google
        </button>

        <p
          style={{
            marginTop: "24px",
            marginBottom: "10px",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          <span
            onClick={() => setShowAdmin(!showAdmin)}
            style={{
              color: "#4f46e5",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {showAdmin ? "Hide Admin Login" : "System Administrator Login"}
          </span>
        </p>

        {showAdmin && (
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              Admin Access
            </h3>

            {adminError ? (
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: "#fef2f2",
                  color: "#b91c1c",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {adminError}
              </div>
            ) : null}

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "14px",
                  color: "#475569",
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Admin Email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 12px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#eff6ff",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "14px",
                  color: "#475569",
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 12px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#eff6ff",
                }}
              />
            </div>

            <button
              onClick={handleAdminLogin}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #5b4bff, #4a3df0)",
                color: "#fff",
                fontWeight: "700",
                fontSize: "17px",
                cursor: "pointer",
              }}
            >
              Sign In as Admin
            </button>
          </div>
        )}

        <p
          style={{
            marginTop: "28px",
            fontSize: "14px",
            color: "#94a3b8",
            lineHeight: "1.6",
            fontFamily: "Georgia, serif",
          }}
        >
          Secured with OAuth 2.0 & JWT - IT3030 PAF Assignment 2026
        </p>
      </div>
    </div>
  );
}
