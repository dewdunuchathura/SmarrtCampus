package com.fms.notifications;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {

    //List<Notification> findByUserId(String userId);
    List<Notification> findByUserEmail(String userEmail);
    long countByUserEmailAndReadFalse(String userEmail);
}