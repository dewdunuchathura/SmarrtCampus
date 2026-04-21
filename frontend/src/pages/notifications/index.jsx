import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import "./Notifications.css";

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const userEmail = user?.email || "krishan@gmail.com";

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
  }, [userEmail]);

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
        prev.map((item) => (item.id === id ? { ...item, read: true } : item))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="notifications-page">
      <div className="notifications-shell">
        <div className="notifications-hero">
          <h1>Notifications</h1>
          <p>Manage your latest updates and unread alerts.</p>
        </div>

        <div className="notifications-stats">
          <div className="notifications-stat-card">
            <div className="notifications-card-icon total">🔔</div>
            <div className="notifications-card-number">{notifications.length}</div>
            <div className="notifications-card-label">Total Notifications</div>
          </div>

          <div className="notifications-stat-card">
            <div className="notifications-card-icon unread">✉</div>
            <div className="notifications-card-number">{unreadCount}</div>
            <div className="notifications-card-label">Unread Notifications</div>
          </div>
        </div>

        <div className="notifications-filters">
          {["ALL", "UNREAD", "READ"].map((filter) => (
            <button
              className={`notifications-filter ${activeFilter === filter ? "active" : ""}`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "ALL"
                ? "All"
                : filter === "UNREAD"
                ? "Unread"
                : "Read"}
            </button>
          ))}
        </div>

        <div className="notifications-panel">
          {loading ? (
            <p className="notifications-loading">Loading notifications...</p>
          ) : filteredNotifications.length === 0 ? (
            <div className="notifications-empty">
              <div className="notifications-empty-icon">🔕</div>
              <h2 className="notifications-empty-title">No notifications found</h2>
              <p style={{ marginTop: "10px" }}>No items match this filter right now.</p>
            </div>
          ) : (
            <div className="notifications-list">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-card ${notification.read ? "read" : "unread"}`}
                >
                  <div>
                    <div className="notification-message">{notification.message}</div>
                    <span
                      className={`notification-status ${notification.read ? "read" : "unread"}`}
                    >
                      {notification.read ? "Read" : "Unread"}
                    </span>
                  </div>

                  {!notification.read && (
                    <button
                      className="notification-action"
                      onClick={() => handleMarkAsRead(notification.id)}
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
