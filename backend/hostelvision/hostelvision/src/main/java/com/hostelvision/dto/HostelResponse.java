package com.hostelvision.dto;

import com.hostelvision.entity.Hostel;

import java.time.LocalDateTime;

public class HostelResponse {

    private Long id;
    private String name;
    private String description;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String gender;
    private String amenities;
    private String imageUrl;
    private Long ownerId;
    private String ownerName;
    private LocalDateTime createdAt;

    public HostelResponse() {
    }

    public HostelResponse(
            Long id,
            String name,
            String description,
            String address,
            String city,
            String state,
            String pincode,
            String gender,
            String amenities,
            String imageUrl,
            Long ownerId,
            String ownerName,
            LocalDateTime createdAt) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.gender = gender;
        this.amenities = amenities;
        this.imageUrl = imageUrl;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.createdAt = createdAt;
    }

    public static HostelResponse fromHostel(Hostel hostel) {

        return new HostelResponse(
                hostel.getId(),
                hostel.getName(),
                hostel.getDescription(),
                hostel.getAddress(),
                hostel.getCity(),
                hostel.getState(),
                hostel.getPincode(),
                hostel.getGender(),
                hostel.getAmenities(),
                hostel.getImageUrl(),
                hostel.getOwner().getId(),
                hostel.getOwner().getFullName(),
                hostel.getCreatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getPincode() {
        return pincode;
    }

    public String getGender() {
        return gender;
    }

    public String getAmenities() {
        return amenities;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}