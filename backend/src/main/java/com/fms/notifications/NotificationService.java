package com.fms.notifications;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fms.bookings.enums.BookingStatus;

@Service
public class NotificationService {

	private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

	public void notifyBookingDecision(String bookingId, String requestedBy, BookingStatus status, String reason) {
		if (status == BookingStatus.APPROVED) {
			log.info("Notification: booking {} approved for user {}", bookingId, requestedBy);
			return;
		}

		if (status == BookingStatus.REJECTED) {
			log.info("Notification: booking {} rejected for user {}. Reason: {}", bookingId, requestedBy, reason);
		}
	}
}
