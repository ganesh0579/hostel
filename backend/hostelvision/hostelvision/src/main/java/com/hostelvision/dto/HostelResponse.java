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
    private Boolean active;

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
            LocalDateTime createdAt,
            Boolean active) {

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
        this.active = active;
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
                hostel.getCreatedAt(),
                hostel.getActive()
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
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

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}