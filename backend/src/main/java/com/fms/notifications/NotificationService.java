package com.fms.notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public List<Notification> getUserNotifications(String userEmail) {
        return notificationRepository.findByUserEmail(userEmail);
    }

    public long countUnread(String userEmail) {
        return notificationRepository.countByUserEmailAndReadFalse(userEmail);
    }

    public Notification markAsRead(String id) {
    Notification notification = notificationRepository.findById(id).orElse(null);

    if (notification != null) {
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    return null;
}
}