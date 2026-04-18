package com.fms.bookings.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fms.bookings.dto.BookingCreateRequest;
import com.fms.bookings.dto.BookingResponse;
import com.fms.bookings.dto.BookingUpdateRequest;
import com.fms.bookings.service.BookingService;
import com.fms.common.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bookings")
@Validated
public class BookingController {

	private final BookingService bookingService;

	public BookingController(BookingService bookingService) {
		this.bookingService = bookingService;
	}

	@PostMapping
	public ResponseEntity<ApiResponse<BookingResponse>> createBooking(@Valid @RequestBody BookingCreateRequest request) {
		BookingResponse response = bookingService.createBooking(request);
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(ApiResponse.success("Booking created successfully.", response));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<BookingResponse>> getBookingById(@PathVariable String id) {
		return ResponseEntity.ok(ApiResponse.success("Booking fetched successfully.", bookingService.getBookingById(id)));
	}

	@GetMapping
	public ResponseEntity<ApiResponse<java.util.List<BookingResponse>>> getAllBookings() {
		return ResponseEntity.ok(ApiResponse.success("Bookings fetched successfully.", bookingService.getAllBookings()));
	}

	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<BookingResponse>> updateBooking(@PathVariable String id,
		@Valid @RequestBody BookingUpdateRequest request) {
		BookingResponse response = bookingService.updateBooking(id, request);
		return ResponseEntity.ok(ApiResponse.success("Booking updated successfully.", response));
	}
}
