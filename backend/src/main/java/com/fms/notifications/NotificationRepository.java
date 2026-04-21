package com.fms.notifications;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {

    List<Notification> findAllByOrderByCreatedAtDesc();
    List<Notification> findByUserEmailOrderByCreatedAtDesc(String userEmail);
    long countByUserEmailAndReadFalse(String userEmail);
    long countByReadFalse();
}
