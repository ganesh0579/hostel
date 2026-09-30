package com.hostelvision.dto;

import com.hostelvision.entity.Booking;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingResponse {

    private Long id;

    private Long customerId;
    private String customerName;

    private Long roomId;
    private String roomNumber;
    private String roomType;

    private Long hostelId;
    private String hostelName;

    private Integer bedsBooked;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    private Double monthlyRent;

    private String status;

    private LocalDateTime createdAt;

    public BookingResponse() {
    }

    public BookingResponse(
            Long id,
            Long customerId,
            String customerName,
            Long roomId,
            String roomNumber,
            String roomType,
            Long hostelId,
            String hostelName,
            Integer bedsBooked,
            LocalDate checkInDate,
            LocalDate checkOutDate,
            Double monthlyRent,
            String status,
            LocalDateTime createdAt) {

        this.id = id;
        this.customerId = customerId;
        this.customerName = customerName;
        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.hostelId = hostelId;
        this.hostelName = hostelName;
        this.bedsBooked = bedsBooked;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.monthlyRent = monthlyRent;
        this.status = status;
        this.createdAt = createdAt;
    }

    public static BookingResponse fromBooking(Booking booking) {

        return new BookingResponse(
                booking.getId(),

                booking.getCustomer().getId(),
                booking.getCustomer().getFullName(),

                booking.getRoom().getId(),
                booking.getRoom().getRoomNumber(),
                booking.getRoom().getRoomType(),

                booking.getRoom().getHostel().getId(),
                booking.getRoom().getHostel().getName(),

                booking.getBedsBooked(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),

                booking.getMonthlyRent(),

                booking.getStatus(),

                booking.getCreatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public Long getRoomId() {
        return roomId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public String getRoomType() {
        return roomType;
    }

    public Long getHostelId() {
        return hostelId;
    }

    public String getHostelName() {
        return hostelName;
    }

    public Integer getBedsBooked() {
        return bedsBooked;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public Double getMonthlyRent() {
        return monthlyRent;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}