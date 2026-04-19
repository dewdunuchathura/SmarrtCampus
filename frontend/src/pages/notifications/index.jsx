import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get("/notifications/user/krishan@gmail.com")
      .then((res) => {
        console.log("API response:", res.data);
        setNotifications(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Notifications Module</h1>

      {notifications.length === 0 ? (
        <p>No notifications found</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              {notification.message} - {notification.read ? "Read" : "Unread"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}