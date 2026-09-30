package com.hostelvision.dto;

import com.hostelvision.entity.Room;

import java.time.LocalDateTime;

public class RoomResponse {

    private Long id;
    private String roomNumber;
    private String roomType;
    private Integer capacity;
    private Integer occupiedBeds;
    private Integer availableBeds;
    private Double monthlyRent;
    private Double securityDeposit;
    private Boolean available;
    private String amenities;
    private String imageUrl;
    private Long hostelId;
    private String hostelName;
    private LocalDateTime createdAt;

    public RoomResponse() {
    }

    public RoomResponse(
            Long id,
            String roomNumber,
            String roomType,
            Integer capacity,
            Integer occupiedBeds,
            Integer availableBeds,
            Double monthlyRent,
            Double securityDeposit,
            Boolean available,
            String amenities,
            String imageUrl,
            Long hostelId,
            String hostelName,
            LocalDateTime createdAt) {

        this.id = id;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.capacity = capacity;
        this.occupiedBeds = occupiedBeds;
        this.availableBeds = availableBeds;
        this.monthlyRent = monthlyRent;
        this.securityDeposit = securityDeposit;
        this.available = available;
        this.amenities = amenities;
        this.imageUrl = imageUrl;
        this.hostelId = hostelId;
        this.hostelName = hostelName;
        this.createdAt = createdAt;
    }

    public static RoomResponse fromRoom(Room room) {

        int availableBeds =
                room.getCapacity() - room.getOccupiedBeds();

        return new RoomResponse(
                room.getId(),
                room.getRoomNumber(),
                room.getRoomType(),
                room.getCapacity(),
                room.getOccupiedBeds(),
                availableBeds,
                room.getMonthlyRent(),
                room.getSecurityDeposit(),
                room.getAvailable(),
                room.getAmenities(),
                room.getImageUrl(),
                room.getHostel().getId(),
                room.getHostel().getName(),
                room.getCreatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public String getRoomType() {
        return roomType;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public Integer getOccupiedBeds() {
        return occupiedBeds;
    }

    public Integer getAvailableBeds() {
        return availableBeds;
    }

    public Double getMonthlyRent() {
        return monthlyRent;
    }

    public Double getSecurityDeposit() {
        return securityDeposit;
    }

    public Boolean getAvailable() {
        return available;
    }

    public String getAmenities() {
        return amenities;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Long getHostelId() {
        return hostelId;
    }

    public String getHostelName() {
        return hostelName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}