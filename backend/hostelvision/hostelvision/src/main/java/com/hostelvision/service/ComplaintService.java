package com.hostelvision.service;

import com.hostelvision.dto.ComplaintResponse;
import com.hostelvision.dto.CreateComplaintRequest;
import com.hostelvision.entity.Complaint;
import com.hostelvision.entity.Hostel;
import com.hostelvision.entity.User;
import com.hostelvision.repository.ComplaintRepository;
import com.hostelvision.repository.HostelRepository;
import com.hostelvision.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final HostelRepository hostelRepository;

    public ComplaintService(
            ComplaintRepository complaintRepository,
            UserRepository userRepository,
            HostelRepository hostelRepository) {

        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.hostelRepository = hostelRepository;
    }

    // Customer creates complaint
    public ComplaintResponse createComplaint(
            CreateComplaintRequest request,
            String customerEmail) {

        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));

        if (!"CUSTOMER".equalsIgnoreCase(customer.getRole())) {
            throw new RuntimeException(
                    "Only customers can create complaints");
        }

        Hostel hostel = hostelRepository.findById(
                request.getHostelId()
        ).orElseThrow(() ->
                new RuntimeException("Hostel not found"));

        if (request.getSubject() == null ||
                request.getSubject().isBlank()) {

            throw new RuntimeException(
                    "Complaint subject is required");
        }

        if (request.getDescription() == null ||
                request.getDescription().isBlank()) {

            throw new RuntimeException(
                    "Complaint description is required");
        }

        Complaint complaint = new Complaint();

        complaint.setCustomer(customer);
        complaint.setHostel(hostel);
        complaint.setSubject(request.getSubject());
        complaint.setDescription(request.getDescription());
        complaint.setStatus("OPEN");

        Complaint savedComplaint =
                complaintRepository.save(complaint);

        return ComplaintResponse.fromComplaint(
                savedComplaint
        );
    }

    // Customer sees own complaints
    public List<ComplaintResponse> getCustomerComplaints(
            String customerEmail) {

        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));

        return complaintRepository
                .findByCustomerId(customer.getId())
                .stream()
                .map(ComplaintResponse::fromComplaint)
                .toList();
    }

    // Owner sees complaints for their hostels
    public List<ComplaintResponse> getOwnerComplaints(
            String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() ->
                        new RuntimeException("Owner not found"));

        if (!"OWNER".equalsIgnoreCase(owner.getRole())) {
            throw new RuntimeException(
                    "Only owners can view owner complaints");
        }

        return complaintRepository
                .findByHostelOwnerId(owner.getId())
                .stream()
                .map(ComplaintResponse::fromComplaint)
                .toList();
    }

    // Get one complaint
    public ComplaintResponse getComplaintById(
            Long complaintId,
            String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Complaint complaint =
                complaintRepository.findById(complaintId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Complaint not found"));

        boolean isCustomer =
                complaint.getCustomer()
                        .getId()
                        .equals(user.getId());

        boolean isOwner =
                complaint.getHostel()
                        .getOwner()
                        .getId()
                        .equals(user.getId());

        if (!isCustomer && !isOwner) {
            throw new RuntimeException(
                    "You are not allowed to view this complaint");
        }

        return ComplaintResponse.fromComplaint(
                complaint
        );
    }

    // Owner updates complaint status
    public ComplaintResponse updateComplaintStatus(
            Long complaintId,
            String status,
            String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() ->
                        new RuntimeException("Owner not found"));

        if (!"OWNER".equalsIgnoreCase(owner.getRole())) {
            throw new RuntimeException(
                    "Only owners can update complaint status");
        }

        Complaint complaint =
                complaintRepository.findById(complaintId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Complaint not found"));

        if (!complaint.getHostel()
                .getOwner()
                .getId()
                .equals(owner.getId())) {

            throw new RuntimeException(
                    "You can only update complaints "
                    + "for your own hostels");
        }

        if (status == null || status.isBlank()) {
            throw new RuntimeException(
                    "Status is required");
        }

        String normalizedStatus =
                status.toUpperCase();

        if (!normalizedStatus.equals("OPEN")
                && !normalizedStatus.equals("IN_PROGRESS")
                && !normalizedStatus.equals("RESOLVED")) {

            throw new RuntimeException(
                    "Invalid complaint status");
        }

        complaint.setStatus(normalizedStatus);

        Complaint updatedComplaint =
                complaintRepository.save(complaint);

        return ComplaintResponse.fromComplaint(
                updatedComplaint
        );
    }
}