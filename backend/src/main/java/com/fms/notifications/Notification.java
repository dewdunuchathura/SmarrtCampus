package com.fms.notifications;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    private String userEmail;
    private String message;
    private boolean read;

    public Notification() {}

    public Notification(String userEmail, String message, boolean read) {
        this.userEmail = userEmail;
        this.message = message;
        this.read = read;
    }

    public String getId() { return id; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean isRead() { return read; }
    public void setRead(boolean read) { this.read = read; }
}