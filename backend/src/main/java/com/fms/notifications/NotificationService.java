package com.fms.notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import com.fms.bookings.enums.BookingStatus;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(NotificationRequest request) {
        Notification notification = new Notification();
        notification.setUserEmail(request.getUserEmail().trim());
        notification.setTitle(request.getTitle().trim());
        notification.setMessage(request.getMessage().trim());
        notification.setType(normalizeType(request.getType()));
        notification.setRead(false);
        notification.setCreatedAt(Instant.now());
        return notificationRepository.save(notification);
    }

    public List<Notification> getUserNotifications(String userEmail) {
        return notificationRepository.findByUserEmailOrderByCreatedAtDesc(userEmail);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAllByOrderByCreatedAtDesc();
    }

    public long countUnread(String userEmail) {
        return notificationRepository.countByUserEmailAndReadFalse(userEmail);
    }

    public long countAllUnread() {
        return notificationRepository.countByReadFalse();
    }

    public Notification markAsRead(String id) {
        Notification notification = notificationRepository.findById(id).orElse(null);

        if (notification != null && !notification.isRead()) {
            notification.setRead(true);
            return notificationRepository.save(notification);
        }

        return notification;
    }

    public long markAllAsRead(String userEmail) {
        List<Notification> notifications = notificationRepository.findByUserEmailOrderByCreatedAtDesc(userEmail);
        List<Notification> unreadNotifications = new ArrayList<>();

        for (Notification notification : notifications) {
            if (!notification.isRead()) {
                notification.setRead(true);
                unreadNotifications.add(notification);
            }
        }

        if (!unreadNotifications.isEmpty()) {
            notificationRepository.saveAll(unreadNotifications);
        }

        return unreadNotifications.size();
    }

    public boolean deleteNotification(String id) {
        if (!notificationRepository.existsById(id)) {
            return false;
        }

        notificationRepository.deleteById(id);
        return true;
    }

    public boolean isValidNotificationRequest(NotificationRequest request) {
        return request != null
            && hasText(request.getUserEmail())
            && hasText(request.getTitle())
            && hasText(request.getMessage());
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }

    private String normalizeType(String type) {
        if (!hasText(type)) {
            return "GENERAL";
        }

        return type.trim().toUpperCase(Locale.ROOT);
    }

    public void notifyBookingDecision(String bookingId, String userEmail, BookingStatus status, String reason) {
        String title = status == BookingStatus.APPROVED ? "Booking Approved" : "Booking Rejected";
        String message = String.format("Your booking %s has been %s.", bookingId, 
            status == BookingStatus.APPROVED ? "approved" : "rejected");
        
        if (hasText(reason)) {
            message += " Reason: " + reason;
        }

        NotificationRequest request = new NotificationRequest();
        request.setUserEmail(userEmail);
        request.setTitle(title);
        request.setMessage(message);
        request.setType("BOOKING");

        createNotification(request);
    }
}
