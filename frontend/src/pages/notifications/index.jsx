import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const userEmail = "krishan@gmail.com";

  const fetchNotifications = () => {
    setLoading(true);
    api
      .get(`/notifications/user/${userEmail}`)
      .then((res) => {
        setNotifications(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "ALL") return notifications;
    if (activeFilter === "UNREAD") {
      return notifications.filter((item) => !item.read);
    }
    if (activeFilter === "READ") {
      return notifications.filter((item) => item.read);
    }
    return notifications;
  }, [notifications, activeFilter]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, read: true } : item
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "32px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #5b4bff, #4a3df0)",
            color: "white",
            borderRadius: "24px",
            padding: "28px 32px",
            boxShadow: "0 10px 25px rgba(91, 75, 255, 0.18)",
            marginBottom: "28px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "40px",
              fontWeight: "700",
            }}
          >
            Notifications
          </h1>
          <p
            style={{
              marginTop: "10px",
              marginBottom: 0,
              fontSize: "18px",
              opacity: 0.92,
            }}
          >
            Manage your latest updates and unread alerts.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "34px", marginBottom: "10px" }}>🔔</div>
            <div style={{ fontSize: "34px", fontWeight: "700", color: "#1f2937" }}>
              {notifications.length}
            </div>
            <div style={{ color: "#6b7280", marginTop: "6px" }}>
              Total Notifications
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "34px", marginBottom: "10px" }}>📩</div>
            <div style={{ fontSize: "34px", fontWeight: "700", color: "#1f2937" }}>
              {unreadCount}
            </div>
            <div style={{ color: "#6b7280", marginTop: "6px" }}>
              Unread Notifications
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          {["ALL", "UNREAD", "READ"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                border: "none",
                borderRadius: "999px",
                padding: "12px 20px",
                cursor: "pointer",
                fontWeight: "600",
                background: activeFilter === filter ? "#5b4bff" : "white",
                color: activeFilter === filter ? "white" : "#374151",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              }}
            >
              {filter === "ALL"
                ? "All"
                : filter === "UNREAD"
                ? "Unread"
                : "Read"}
            </button>
          ))}
        </div>

        <div
          style={{
            background: "white",
            
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          {loading ? (
            <p style={{ color: "#6b7280", fontSize: "18px" }}>Loading notifications...</p>
          ) : filteredNotifications.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
                color: "#6b7280",
              }}
            >
              <div style={{ fontSize: "54px", marginBottom: "12px" }}>🔕</div>
              <h2 style={{ margin: 0, color: "#1f2937" }}>No notifications found</h2>
              <p style={{ marginTop: "10px" }}>No items match this filter right now.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "18px",
                    padding: "18px 20px",
                    background: notification.read ? "#f9fafb" : "#eef2ff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "8px",
                      }}
                    >
                      {notification.message}
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "700",
                        background: notification.read ? "#dcfce7" : "#fef3c7",
                        color: notification.read ? "#166534" : "#92400e",
                      }}
                    >
                      {notification.read ? "Read" : "Unread"}
                    </span>
                  </div>

                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      style={{
                        border: "none",
                        borderRadius: "12px",
                        padding: "10px 16px",
                        background: "#5b4bff",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}