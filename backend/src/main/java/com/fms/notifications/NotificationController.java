package com.fms.notifications;

import com.fms.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public ResponseEntity<ApiResponse<Notification>> createNotification(@RequestBody NotificationRequest request) {
        if (!notificationService.isValidNotificationRequest(request)) {
            return ResponseEntity.badRequest().body(ApiResponse.error("User email, title, and message are required"));
        }

        Notification saved = notificationService.createNotification(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Notification created", saved));
    }

    @GetMapping("/user/{userEmail}")
    public ResponseEntity<ApiResponse<List<Notification>>> getUserNotifications(@PathVariable String userEmail) {
        List<Notification> list = notificationService.getUserNotifications(userEmail);
        return ResponseEntity.ok(ApiResponse.success("Notifications fetched", list));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Notification>>> getAllNotifications() {
        List<Notification> list = notificationService.getAllNotifications();
        return ResponseEntity.ok(ApiResponse.success("All notifications fetched", list));
    }

    @GetMapping("/user/{userEmail}/count-unread")
    public ResponseEntity<ApiResponse<Long>> countUnread(@PathVariable String userEmail) {
        long count = notificationService.countUnread(userEmail);
        return ResponseEntity.ok(ApiResponse.success("Unread count fetched", count));
    }

    @GetMapping("/count-unread")
    public ResponseEntity<ApiResponse<Long>> countAllUnread() {
        long count = notificationService.countAllUnread();
        return ResponseEntity.ok(ApiResponse.success("Global unread count fetched", count));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Notification>> markAsRead(@PathVariable String id) {
        Notification updated = notificationService.markAsRead(id);

        if (updated == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("Notification not found"));
        }

        return ResponseEntity.ok(ApiResponse.success("Notification marked as read", updated));
    }

    @PatchMapping("/user/{userEmail}/read-all")
    public ResponseEntity<ApiResponse<MarkAllReadResponse>> markAllAsRead(@PathVariable String userEmail) {
        long updatedCount = notificationService.markAllAsRead(userEmail);
        return ResponseEntity.ok(
            ApiResponse.success(
                "All user notifications marked as read",
                new MarkAllReadResponse(updatedCount)
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteNotification(@PathVariable String id) {
        boolean deleted = notificationService.deleteNotification(id);

        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("Notification not found"));
        }

        return ResponseEntity.ok(ApiResponse.success("Notification deleted"));
    }
}
