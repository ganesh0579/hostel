package com.hostelvision.controller;

import com.hostelvision.dto.CreateRoomRequest;
import com.hostelvision.dto.RoomResponse;
import com.hostelvision.service.RoomService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    // Create room inside a hostel
    @PostMapping("/hostel/{hostelId}")
    public ResponseEntity<RoomResponse> createRoom(
            @PathVariable Long hostelId,
            @RequestBody CreateRoomRequest request,
            Authentication authentication) {

        String ownerEmail = authentication.getName();

        RoomResponse response =
                roomService.createRoom(
                        hostelId,
                        request,
                        ownerEmail
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Get all rooms of a hostel
    @GetMapping("/hostel/{hostelId}")
    public ResponseEntity<List<RoomResponse>> getRoomsByHostel(
            @PathVariable Long hostelId) {

        return ResponseEntity.ok(
                roomService.getRoomsByHostel(hostelId)
        );
    }

    // Get all available rooms
    @GetMapping("/available")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms() {

        return ResponseEntity.ok(
                roomService.getAvailableRooms()
        );
    }

    // Get one room
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomResponse> getRoomById(
            @PathVariable Long roomId) {

        return ResponseEntity.ok(
                roomService.getRoomById(roomId)
        );
    }
    // Update room
@PutMapping("/{roomId}")
public ResponseEntity<RoomResponse> updateRoom(
        @PathVariable Long roomId,
        @RequestBody CreateRoomRequest request,
        Authentication authentication) {

    String ownerEmail = authentication.getName();

    RoomResponse response =
            roomService.updateRoom(
                    roomId,
                    request,
                    ownerEmail
            );

    return ResponseEntity.ok(response);
}


// Delete room
@DeleteMapping("/{roomId}")
public ResponseEntity<Void> deleteRoom(
        @PathVariable Long roomId,
        Authentication authentication) {

    String ownerEmail = authentication.getName();

    roomService.deleteRoom(
            roomId,
            ownerEmail
    );

    return ResponseEntity.noContent().build();
}
}