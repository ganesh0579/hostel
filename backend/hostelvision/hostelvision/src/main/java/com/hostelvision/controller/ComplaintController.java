package com.hostelvision.controller;

import com.hostelvision.dto.ComplaintResponse;
import com.hostelvision.dto.CreateComplaintRequest;
import com.hostelvision.service.ComplaintService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(
            ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    // Customer creates a complaint
    @PostMapping
    public ResponseEntity<ComplaintResponse> createComplaint(
            @RequestBody CreateComplaintRequest request,
            Authentication authentication) {

        String customerEmail =
                authentication.getName();

        ComplaintResponse response =
                complaintService.createComplaint(
                        request,
                        customerEmail
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Customer views own complaints
    @GetMapping("/my")
    public ResponseEntity<List<ComplaintResponse>>
    getMyComplaints(
            Authentication authentication) {

        String customerEmail =
                authentication.getName();

        return ResponseEntity.ok(
                complaintService.getCustomerComplaints(
                        customerEmail
                )
        );
    }

    // Owner views complaints for own hostels
    @GetMapping("/owner")
    public ResponseEntity<List<ComplaintResponse>>
    getOwnerComplaints(
            Authentication authentication) {

        String ownerEmail =
                authentication.getName();

        return ResponseEntity.ok(
                complaintService.getOwnerComplaints(
                        ownerEmail
                )
        );
    }

    // Customer or owner views one complaint
    @GetMapping("/{complaintId}")
    public ResponseEntity<ComplaintResponse>
    getComplaintById(
            @PathVariable Long complaintId,
            Authentication authentication) {

        String userEmail =
                authentication.getName();

        return ResponseEntity.ok(
                complaintService.getComplaintById(
                        complaintId,
                        userEmail
                )
        );
    }

    // Owner updates complaint status
    @PutMapping("/{complaintId}/status")
    public ResponseEntity<ComplaintResponse>
    updateComplaintStatus(
            @PathVariable Long complaintId,
            @RequestParam String status,
            Authentication authentication) {

        String ownerEmail =
                authentication.getName();

        return ResponseEntity.ok(
                complaintService.updateComplaintStatus(
                        complaintId,
                        status,
                        ownerEmail
                )
        );
    }
}