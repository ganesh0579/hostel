package com.hostelvision.service;

import com.hostelvision.dto.CreateHostelRequest;
import com.hostelvision.dto.HostelResponse;
import com.hostelvision.entity.Hostel;
import com.hostelvision.entity.User;
import com.hostelvision.repository.HostelRepository;
import com.hostelvision.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HostelService {

    private final HostelRepository hostelRepository;
    private final UserRepository userRepository;

    public HostelService(
            HostelRepository hostelRepository,
            UserRepository userRepository) {

        this.hostelRepository = hostelRepository;
        this.userRepository = userRepository;
    }

    // Create a hostel
    public HostelResponse createHostel(
            CreateHostelRequest request,
            String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() ->
                        new RuntimeException("Owner not found"));

        if (!"OWNER".equalsIgnoreCase(owner.getRole())) {
            throw new RuntimeException(
                    "Only owners can create hostels");
        }

        Hostel hostel = new Hostel();

        hostel.setName(request.getName());
        hostel.setDescription(request.getDescription());
        hostel.setAddress(request.getAddress());
        hostel.setCity(request.getCity());
        hostel.setState(request.getState());
        hostel.setPincode(request.getPincode());
        hostel.setGender(request.getGender());
        hostel.setAmenities(request.getAmenities());
        hostel.setImageUrl(request.getImageUrl());

        hostel.setOwner(owner);

        Hostel savedHostel =
                hostelRepository.save(hostel);

        return HostelResponse.fromHostel(savedHostel);
    }

    // Get all hostels
    public List<HostelResponse> getAllHostels() {

        return hostelRepository.findAll()
                .stream()
                .map(HostelResponse::fromHostel)
                .toList();
    }

    // Get hostel by ID
    public HostelResponse getHostelById(Long id) {

        Hostel hostel = hostelRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Hostel not found"));

        return HostelResponse.fromHostel(hostel);
    }

    // Get hostels by city
    public List<HostelResponse> getHostelsByCity(
            String city) {

        return hostelRepository.findByCity(city)
                .stream()
                .map(HostelResponse::fromHostel)
                .toList();
    }

    // Get hostels owned by a particular owner
    public List<HostelResponse> getHostelsByOwner(
            Long ownerId) {

        return hostelRepository.findByOwnerId(ownerId)
                .stream()
                .map(HostelResponse::fromHostel)
                .toList();
    }
    // Update hostel
public HostelResponse updateHostel(
        Long hostelId,
        CreateHostelRequest request,
        String ownerEmail) {

    Hostel hostel = hostelRepository.findById(hostelId)
            .orElseThrow(() ->
                    new RuntimeException("Hostel not found"));

    User owner = userRepository.findByEmail(ownerEmail)
            .orElseThrow(() ->
                    new RuntimeException("Owner not found"));

    if (!"OWNER".equalsIgnoreCase(owner.getRole())) {
        throw new RuntimeException(
                "Only owners can update hostels");
    }

    if (!hostel.getOwner().getId().equals(owner.getId())) {
        throw new RuntimeException(
                "You can only update your own hostel");
    }

    hostel.setName(request.getName());
    hostel.setDescription(request.getDescription());
    hostel.setAddress(request.getAddress());
    hostel.setCity(request.getCity());
    hostel.setState(request.getState());
    hostel.setPincode(request.getPincode());
    hostel.setGender(request.getGender());
    hostel.setAmenities(request.getAmenities());
    hostel.setImageUrl(request.getImageUrl());

    Hostel updatedHostel =
            hostelRepository.save(hostel);

    return HostelResponse.fromHostel(updatedHostel);
}
// Delete hostel
public void deleteHostel(
        Long hostelId,
        String ownerEmail) {

    Hostel hostel = hostelRepository.findById(hostelId)
            .orElseThrow(() ->
                    new RuntimeException("Hostel not found"));

    User owner = userRepository.findByEmail(ownerEmail)
            .orElseThrow(() ->
                    new RuntimeException("Owner not found"));

    if (!"OWNER".equalsIgnoreCase(owner.getRole())) {
        throw new RuntimeException(
                "Only owners can delete hostels");
    }

    if (!hostel.getOwner().getId().equals(owner.getId())) {
        throw new RuntimeException(
                "You can only delete your own hostel");
    }

    hostelRepository.delete(hostel);
}
}