package com.fms.notifications;

import com.fms.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public ApiResponse<Notification> createNotification(@RequestBody Notification notification) {
        Notification saved = notificationService.createNotification(notification);
        return new ApiResponse<>(true, "Notification created", saved);
    }

    @GetMapping("/user/{userEmail}")
    public ApiResponse<List<Notification>> getUserNotifications(@PathVariable String userEmail) {
        List<Notification> list = notificationService.getUserNotifications(userEmail);
        return new ApiResponse<>(true, "Notifications fetched", list);
    }

    @GetMapping("/user/{userEmail}/count-unread")
    public ApiResponse<Long> countUnread(@PathVariable String userEmail) {
        long count = notificationService.countUnread(userEmail);
        return new ApiResponse<>(true, "Unread count fetched", count);
    }
}