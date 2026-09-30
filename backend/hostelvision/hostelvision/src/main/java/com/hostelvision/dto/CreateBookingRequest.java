package com.hostelvision.dto;

import java.time.LocalDate;

public class CreateBookingRequest {

    private Long roomId;
    private Integer bedsBooked;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    public CreateBookingRequest() {
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public Integer getBedsBooked() {
        return bedsBooked;
    }

    public void setBedsBooked(Integer bedsBooked) {
        this.bedsBooked = bedsBooked;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }
}