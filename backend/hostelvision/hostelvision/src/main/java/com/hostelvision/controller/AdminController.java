package com.hostelvision.controller;

import com.hostelvision.dto.BookingResponse;
import com.hostelvision.dto.ComplaintResponse;
import com.hostelvision.dto.HostelResponse;
import com.hostelvision.dto.RoomResponse;
import com.hostelvision.dto.UserResponse;
import com.hostelvision.service.AdminService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // ==========================================
    // ADMIN VIEWS ALL USERS
    // ==========================================

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers(
            Authentication authentication) {

        String adminEmail = authentication.getName();

        return ResponseEntity.ok(
                adminService.getAllUsers(adminEmail)
        );
    }

    // ==========================================
    // ADMIN VIEWS ALL HOSTELS
    // ==========================================

    @GetMapping("/hostels")
    public ResponseEntity<List<HostelResponse>> getAllHostels(
            Authentication authentication) {

        String adminEmail = authentication.getName();

        return ResponseEntity.ok(
                adminService.getAllHostels(adminEmail)
        );
    }

    // ==========================================
    // ADMIN VIEWS ALL ROOMS
    // ==========================================

    @GetMapping("/rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms(
            Authentication authentication) {

        String adminEmail = authentication.getName();

        return ResponseEntity.ok(
                adminService.getAllRooms(adminEmail)
        );
    }

    // ==========================================
    // ADMIN VIEWS ALL BOOKINGS
    // ==========================================

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingResponse>> getAllBookings(
            Authentication authentication) {

        String adminEmail = authentication.getName();

        return ResponseEntity.ok(
                adminService.getAllBookings(adminEmail)
        );
    }

    // ==========================================
    // ADMIN VIEWS ALL COMPLAINTS
    // ==========================================

    @GetMapping("/complaints")
    public ResponseEntity<List<ComplaintResponse>> getAllComplaints(
            Authentication authentication) {

        String adminEmail = authentication.getName();

        return ResponseEntity.ok(
                adminService.getAllComplaints(adminEmail)
        );
    }
    // Admin activates or deactivates a user
@PutMapping("/users/{userId}/status")
public ResponseEntity<UserResponse> updateUserStatus(
        @PathVariable Long userId,
        @RequestParam Boolean active,
        Authentication authentication) {

    String adminEmail = authentication.getName();

    return ResponseEntity.ok(
            adminService.updateUserStatus(
                    adminEmail,
                    userId,
                    active
            )
    );
}
// Admin activates or deactivates a hostel
@PutMapping("/hostels/{hostelId}/status")
public ResponseEntity<HostelResponse> updateHostelStatus(
        @PathVariable Long hostelId,
        @RequestParam Boolean active,
        Authentication authentication) {

    String adminEmail = authentication.getName();

    return ResponseEntity.ok(
            adminService.updateHostelStatus(
                    adminEmail,
                    hostelId,
                    active
            )
    );
}
@PutMapping("/rooms/{roomId}/status")
public ResponseEntity<RoomResponse> updateRoomStatus(
        @PathVariable Long roomId,
        @RequestParam Boolean active,
        Authentication authentication) {

    String adminEmail = authentication.getName();

    return ResponseEntity.ok(
            adminService.updateRoomStatus(
                    adminEmail,
                    roomId,
                    active
            )
    );
}
@PutMapping("/bookings/{bookingId}/status")
public ResponseEntity<BookingResponse> updateBookingStatus(
        @PathVariable Long bookingId,
        @RequestParam String status,
        Authentication authentication) {

    String adminEmail = authentication.getName();

    return ResponseEntity.ok(
            adminService.updateBookingStatus(
                    adminEmail,
                    bookingId,
                    status
            )
    );
}
@PutMapping("/complaints/{complaintId}/status")
public ResponseEntity<ComplaintResponse> updateComplaintStatus(
        @PathVariable Long complaintId,
        @RequestParam String status,
        Authentication authentication) {

    String adminEmail = authentication.getName();

    return ResponseEntity.ok(
            adminService.updateComplaintStatus(
                    adminEmail,
                    complaintId,
                    status
            )
    );
}
}