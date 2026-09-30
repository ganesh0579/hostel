package com.hostelvision.controller;

import com.hostelvision.dto.CreateHostelRequest;
import com.hostelvision.dto.HostelResponse;
import com.hostelvision.service.HostelService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hostels")
public class HostelController {

    private final HostelService hostelService;

    public HostelController(HostelService hostelService) {
        this.hostelService = hostelService;
    }

    // Create hostel
    @PostMapping
    public ResponseEntity<HostelResponse> createHostel(
            @RequestBody CreateHostelRequest request,
            Authentication authentication) {

        String ownerEmail = authentication.getName();

        HostelResponse response =
                hostelService.createHostel(
                        request,
                        ownerEmail
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Get all hostels
    @GetMapping
    public ResponseEntity<List<HostelResponse>> getAllHostels() {

        return ResponseEntity.ok(
                hostelService.getAllHostels()
        );
    }

    // Get hostel by ID
    @GetMapping("/{id}")
    public ResponseEntity<HostelResponse> getHostelById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                hostelService.getHostelById(id)
        );
    }

    // Search hostels by city
    @GetMapping("/search")
    public ResponseEntity<List<HostelResponse>> getHostelsByCity(
            @RequestParam String city) {

        return ResponseEntity.ok(
                hostelService.getHostelsByCity(city)
        );
    }

    // Get hostels by owner
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<HostelResponse>> getHostelsByOwner(
            @PathVariable Long ownerId) {

        return ResponseEntity.ok(
                hostelService.getHostelsByOwner(ownerId)
        );
    }
    // Update hostel
@PutMapping("/{id}")
public ResponseEntity<HostelResponse> updateHostel(
        @PathVariable Long id,
        @RequestBody CreateHostelRequest request,
        Authentication authentication) {

    String ownerEmail = authentication.getName();

    HostelResponse response =
            hostelService.updateHostel(
                    id,
                    request,
                    ownerEmail
            );

    return ResponseEntity.ok(response);
}
// Delete hostel
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteHostel(
        @PathVariable Long id,
        Authentication authentication) {

    String ownerEmail = authentication.getName();

    hostelService.deleteHostel(
            id,
            ownerEmail
    );

    return ResponseEntity.noContent().build();
}
}