package com.hostelvision.service;

import com.hostelvision.dto.CreateRoomRequest;
import com.hostelvision.dto.RoomResponse;
import com.hostelvision.entity.Hostel;
import com.hostelvision.entity.Room;
import com.hostelvision.entity.User;
import com.hostelvision.repository.HostelRepository;
import com.hostelvision.repository.RoomRepository;
import com.hostelvision.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final HostelRepository hostelRepository;
    private final UserRepository userRepository;

    public RoomService(
            RoomRepository roomRepository,
            HostelRepository hostelRepository,
            UserRepository userRepository) {

        this.roomRepository = roomRepository;
        this.hostelRepository = hostelRepository;
        this.userRepository = userRepository;
    }

    // Create room
    public RoomResponse createRoom(
            Long hostelId,
            CreateRoomRequest request,
            String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() ->
                        new RuntimeException("Owner not found"));

        if (!"OWNER".equalsIgnoreCase(owner.getRole())) {
            throw new RuntimeException(
                    "Only owners can create rooms");
        }

        Hostel hostel = hostelRepository.findById(hostelId)
                .orElseThrow(() ->
                        new RuntimeException("Hostel not found"));

        if (!hostel.getOwner().getId().equals(owner.getId())) {
            throw new RuntimeException(
                    "You can only add rooms to your own hostel");
        }

        if (roomRepository.existsByHostelIdAndRoomNumber(
                hostelId,
                request.getRoomNumber())) {

            throw new RuntimeException(
                    "Room number already exists in this hostel");
        }

        if (request.getCapacity() == null ||
                request.getCapacity() <= 0) {

            throw new RuntimeException(
                    "Room capacity must be greater than zero");
        }

        Room room = new Room();

        room.setRoomNumber(request.getRoomNumber());
        room.setRoomType(request.getRoomType());
        room.setCapacity(request.getCapacity());
        room.setOccupiedBeds(0);
        room.setMonthlyRent(request.getMonthlyRent());
        room.setSecurityDeposit(request.getSecurityDeposit());
        room.setAvailable(true);
        room.setAmenities(request.getAmenities());
        room.setImageUrl(request.getImageUrl());
        room.setHostel(hostel);

        Room savedRoom = roomRepository.save(room);

        return RoomResponse.fromRoom(savedRoom);
    }

    // Get all rooms of a hostel
    public List<RoomResponse> getRoomsByHostel(
            Long hostelId) {

        return roomRepository.findByHostelId(hostelId)
                .stream()
                .map(RoomResponse::fromRoom)
                .toList();
    }

    // Get one room
    public RoomResponse getRoomById(Long roomId) {

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() ->
                        new RuntimeException("Room not found"));

        return RoomResponse.fromRoom(room);
    }

    // Get all available rooms
    public List<RoomResponse> getAvailableRooms() {

        return roomRepository.findByAvailableTrue()
                .stream()
                .map(RoomResponse::fromRoom)
                .toList();
    }
    // Update room
public RoomResponse updateRoom(
        Long roomId,
        CreateRoomRequest request,
        String ownerEmail) {

    User owner = userRepository.findByEmail(ownerEmail)
            .orElseThrow(() ->
                    new RuntimeException("Owner not found"));

    if (!"OWNER".equalsIgnoreCase(owner.getRole())) {
        throw new RuntimeException(
                "Only owners can update rooms");
    }

    Room room = roomRepository.findById(roomId)
            .orElseThrow(() ->
                    new RuntimeException("Room not found"));

    if (!room.getHostel().getOwner().getId()
            .equals(owner.getId())) {

        throw new RuntimeException(
                "You can only update rooms in your own hostel");
    }

    if (request.getCapacity() == null ||
            request.getCapacity() <= 0) {

        throw new RuntimeException(
                "Room capacity must be greater than zero");
    }

    room.setRoomNumber(request.getRoomNumber());
    room.setRoomType(request.getRoomType());
    room.setCapacity(request.getCapacity());
    room.setMonthlyRent(request.getMonthlyRent());
    room.setSecurityDeposit(request.getSecurityDeposit());
    room.setAmenities(request.getAmenities());
    room.setImageUrl(request.getImageUrl());

    // Recalculate availability
    room.setAvailable(
            room.getOccupiedBeds() < room.getCapacity()
    );

    Room updatedRoom = roomRepository.save(room);

    return RoomResponse.fromRoom(updatedRoom);
}


// Delete room
public void deleteRoom(
        Long roomId,
        String ownerEmail) {

    User owner = userRepository.findByEmail(ownerEmail)
            .orElseThrow(() ->
                    new RuntimeException("Owner not found"));

    if (!"OWNER".equalsIgnoreCase(owner.getRole())) {
        throw new RuntimeException(
                "Only owners can delete rooms");
    }

    Room room = roomRepository.findById(roomId)
            .orElseThrow(() ->
                    new RuntimeException("Room not found"));

    if (!room.getHostel().getOwner().getId()
            .equals(owner.getId())) {

        throw new RuntimeException(
                "You can only delete rooms in your own hostel");
    }

    roomRepository.delete(room);
}
}