package com.hostelvision.dto;

import com.hostelvision.entity.Complaint;

import java.time.LocalDateTime;

public class ComplaintResponse {

    private Long id;

    private Long customerId;
    private String customerName;

    private Long hostelId;
    private String hostelName;

    private String subject;
    private String description;
    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ComplaintResponse() {
    }

    public static ComplaintResponse fromComplaint(
            Complaint complaint) {

        ComplaintResponse response =
                new ComplaintResponse();

        response.setId(complaint.getId());

        response.setCustomerId(
                complaint.getCustomer().getId()
        );

        response.setCustomerName(
                complaint.getCustomer().getFullName()
        );

        response.setHostelId(
                complaint.getHostel().getId()
        );

        response.setHostelName(
                complaint.getHostel().getName()
        );

        response.setSubject(
                complaint.getSubject()
        );

        response.setDescription(
                complaint.getDescription()
        );

        response.setStatus(
                complaint.getStatus()
        );

        response.setCreatedAt(
                complaint.getCreatedAt()
        );

        response.setUpdatedAt(
                complaint.getUpdatedAt()
        );

        return response;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
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

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}