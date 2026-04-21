import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthPage() {
  const navigate = useNavigate();

  const [showAdmin, setShowAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleAdminLogin = async () => {
    try {
      const loginRes = await axios.post("http://localhost:8080/api/auth/login", {
        email: adminEmail,
        password: adminPassword,
      });

      if (!loginRes.data.success) {
        alert("Invalid admin email or password");
        return;
      }

      const userRes = await axios.get(
        `http://localhost:8080/api/auth/me?email=${adminEmail}`
      );

      if (!userRes.data.success) {
        alert("Admin user not found");
        return;
      }

      if (userRes.data.data.role !== "ADMIN") {
        alert("You are not an admin");
        return;
      }

      navigate("/admin-dashboard");
    } catch (error) {
      alert("Admin login failed");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(90deg, rgba(240,232,255,1) 0%, rgba(245,245,245,1) 45%, rgba(214,231,255,1) 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          borderRadius: "28px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
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
            color: "#5b4bff",
          }}
        >
          Operations Hub
        </p>

        <p
          style={{
            margin: "0 auto 22px",
            maxWidth: "340px",
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#6b7280",
          }}
        >
          Sign in with your university Google account to access the campus
          management system.
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
              color: "#9ca3af",
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
            boxShadow: "0 8px 18px rgba(66,133,244,0.28)",
            transition: "0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = "0.92";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = "1";
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
              color: "#5b4bff",
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
              padding: "14px",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
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

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "14px",
                  color: "#6b7280",
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
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "14px",
                  color: "#6b7280",
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
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              onClick={handleAdminLogin}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #5b4bff, #4a3df0)",
                color: "#fff",
                fontWeight: "700",
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
            color: "#9ca3af",
            lineHeight: "1.6",
          }}
        >
          🔒 Secured with OAuth 2.0 & JWT - IT3030 PAF Assignment 2026
        </p>
      </div>
    </div>
  );
}