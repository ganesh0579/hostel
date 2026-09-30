package com.hostelvision.controller;

import com.hostelvision.dto.BookingResponse;
import com.hostelvision.dto.CreateBookingRequest;
import com.hostelvision.service.BookingService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Create booking
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @RequestBody CreateBookingRequest request,
            Authentication authentication) {

        String customerEmail = authentication.getName();

        BookingResponse response =
                bookingService.createBooking(
                        request,
                        customerEmail
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Get customer's bookings
    @GetMapping("/my")
    public ResponseEntity<List<BookingResponse>> getMyBookings(
            Authentication authentication) {

        String customerEmail = authentication.getName();

        return ResponseEntity.ok(
                bookingService.getCustomerBookings(
                        customerEmail
                )
        );
    }

    // Get bookings for owner's hostels
    // IMPORTANT: this must be before /{bookingId}
    @GetMapping("/owner")
    public ResponseEntity<List<BookingResponse>> getOwnerBookings(
            Authentication authentication) {

        String ownerEmail = authentication.getName();

        return ResponseEntity.ok(
                bookingService.getOwnerBookings(
                        ownerEmail
                )
        );
    }

    // Get one booking
    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingResponse> getBookingById(
            @PathVariable Long bookingId,
            Authentication authentication) {

        String userEmail = authentication.getName();

        return ResponseEntity.ok(
                bookingService.getBookingById(
                        bookingId,
                        userEmail
                )
        );
    }

    // Cancel booking
    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(
            @PathVariable Long bookingId,
            Authentication authentication) {

        String customerEmail = authentication.getName();

        return ResponseEntity.ok(
                bookingService.cancelBooking(
                        bookingId,
                        customerEmail
                )
        );
    }
    // Confirm booking by owner
@PutMapping("/{bookingId}/confirm")
public ResponseEntity<BookingResponse> confirmBooking(
        @PathVariable Long bookingId,
        Authentication authentication) {

    String ownerEmail = authentication.getName();

    return ResponseEntity.ok(
            bookingService.confirmBooking(
                    bookingId,
                    ownerEmail
            )
    );
}
// Complete booking by owner
@PutMapping("/{bookingId}/complete")
public ResponseEntity<BookingResponse> completeBooking(
        @PathVariable Long bookingId,
        Authentication authentication) {

    String ownerEmail = authentication.getName();

    return ResponseEntity.ok(
            bookingService.completeBooking(
                    bookingId,
                    ownerEmail
            )
    );
}
}