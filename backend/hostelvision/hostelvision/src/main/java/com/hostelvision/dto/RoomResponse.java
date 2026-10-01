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
    private Boolean active;
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
            Boolean active,
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
        this.active = active;
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
                room.getActive(),
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

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getOccupiedBeds() {
        return occupiedBeds;
    }

    public void setOccupiedBeds(Integer occupiedBeds) {
        this.occupiedBeds = occupiedBeds;
    }

    public Integer getAvailableBeds() {
        return availableBeds;
    }

    public void setAvailableBeds(Integer availableBeds) {
        this.availableBeds = availableBeds;
    }

    public Double getMonthlyRent() {
        return monthlyRent;
    }

    public void setMonthlyRent(Double monthlyRent) {
        this.monthlyRent = monthlyRent;
    }

    public Double getSecurityDeposit() {
        return securityDeposit;
    }

    public void setSecurityDeposit(Double securityDeposit) {
        this.securityDeposit = securityDeposit;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getAmenities() {
        return amenities;
    }

    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getHostelId() {
        return hostelId;
    }

    public void setHostelId(Long hostelId) {
        this.hostelId = hostelId;
    }

    public String getHostelName() {
        return hostelName;
    }

    public void setHostelName(String hostelName) {
        this.hostelName = hostelName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}