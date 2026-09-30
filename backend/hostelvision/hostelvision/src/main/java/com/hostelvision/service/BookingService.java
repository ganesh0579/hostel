package com.hostelvision.service;

import com.hostelvision.dto.BookingResponse;
import com.hostelvision.dto.CreateBookingRequest;
import com.hostelvision.entity.Booking;
import com.hostelvision.entity.Room;
import com.hostelvision.entity.User;
import com.hostelvision.repository.BookingRepository;
import com.hostelvision.repository.RoomRepository;
import com.hostelvision.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public BookingService(
            BookingRepository bookingRepository,
            RoomRepository roomRepository,
            UserRepository userRepository) {

        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

 // Create booking
public BookingResponse createBooking(
        CreateBookingRequest request,
        String customerEmail) {

    // Find customer
    User customer = userRepository.findByEmail(customerEmail)
            .orElseThrow(() ->
                    new RuntimeException("Customer not found"));

    // Only customers can create bookings
    if (!"CUSTOMER".equalsIgnoreCase(customer.getRole())) {
        throw new RuntimeException(
                "Only customers can create bookings");
    }

    // Find room
    Room room = roomRepository.findById(request.getRoomId())
            .orElseThrow(() ->
                    new RuntimeException("Room not found"));

    // Validate beds
    if (request.getBedsBooked() == null ||
            request.getBedsBooked() <= 0) {

        throw new RuntimeException(
                "Beds booked must be greater than zero");
    }

    /*
     * Calculate beds already reserved by
     * PENDING and CONFIRMED bookings.
     */
    Integer reservedBeds =
            bookingRepository.getReservedBeds(room.getId());

    if (reservedBeds == null) {
        reservedBeds = 0;
    }

    int availableBeds =
            room.getCapacity() - reservedBeds;

    // Prevent overbooking
    if (request.getBedsBooked() > availableBeds) {

        throw new RuntimeException(
                "Not enough beds available");
    }

    // Validate check-in date
    if (request.getCheckInDate() == null) {

        throw new RuntimeException(
                "Check-in date is required");
    }

    if (request.getCheckInDate()
            .isBefore(LocalDate.now())) {

        throw new RuntimeException(
                "Check-in date cannot be in the past");
    }

    // Validate check-out date
    if (request.getCheckOutDate() != null &&
            !request.getCheckOutDate()
                    .isAfter(request.getCheckInDate())) {

        throw new RuntimeException(
                "Check-out date must be after check-in date");
    }

    // Create booking
    Booking booking = new Booking();

    booking.setCustomer(customer);
    booking.setRoom(room);
    booking.setBedsBooked(request.getBedsBooked());
    booking.setCheckInDate(request.getCheckInDate());
    booking.setCheckOutDate(request.getCheckOutDate());

    // Take current rent from room
    booking.setMonthlyRent(room.getMonthlyRent());

    booking.setStatus("PENDING");

    Booking savedBooking =
            bookingRepository.save(booking);

    return BookingResponse.fromBooking(savedBooking);
}

    // Get customer's bookings
    public List<BookingResponse> getCustomerBookings(
            String customerEmail) {

        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));

        return bookingRepository
                .findByCustomerId(customer.getId())
                .stream()
                .map(BookingResponse::fromBooking)
                .toList();
    }

    // Get one booking
    public BookingResponse getBookingById(
            Long bookingId,
            String userEmail) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        boolean isCustomer =
                booking.getCustomer().getId()
                        .equals(user.getId());

        boolean isOwner =
                booking.getRoom()
                        .getHostel()
                        .getOwner()
                        .getId()
                        .equals(user.getId());

        if (!isCustomer && !isOwner) {

            throw new RuntimeException(
                    "You are not authorized to view this booking");
        }

        return BookingResponse.fromBooking(booking);
    }

    // Cancel booking
    public BookingResponse cancelBooking(
            Long bookingId,
            String customerEmail) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));

        if (!booking.getCustomer().getId()
                .equals(customer.getId())) {

            throw new RuntimeException(
                    "You can only cancel your own booking");
        }

        if ("CANCELLED".equalsIgnoreCase(
                booking.getStatus())) {

            throw new RuntimeException(
                    "Booking is already cancelled");
        }

        if ("COMPLETED".equalsIgnoreCase(
                booking.getStatus())) {

            throw new RuntimeException(
                    "Completed booking cannot be cancelled");
        }

        // Release beds if booking was confirmed
        if ("CONFIRMED".equalsIgnoreCase(
                booking.getStatus())) {

            Room room = booking.getRoom();

            int newOccupiedBeds =
                    room.getOccupiedBeds()
                            - booking.getBedsBooked();

            if (newOccupiedBeds < 0) {
                newOccupiedBeds = 0;
            }

            room.setOccupiedBeds(newOccupiedBeds);

            room.setAvailable(
                    newOccupiedBeds < room.getCapacity()
            );

            roomRepository.save(room);
        }

        booking.setStatus("CANCELLED");

        Booking cancelledBooking =
                bookingRepository.save(booking);

        return BookingResponse.fromBooking(
                cancelledBooking
        );
    }

    // Get bookings for owner's hostels
    public List<BookingResponse> getOwnerBookings(
            String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() ->
                        new RuntimeException("Owner not found"));

        if (!"OWNER".equalsIgnoreCase(owner.getRole())) {
            throw new RuntimeException(
                    "Only owners can view owner bookings");
        }

        return bookingRepository
                .findByRoomHostelOwnerId(owner.getId())
                .stream()
                .map(BookingResponse::fromBooking)
                .toList();
    }

    // Confirm booking by owner
    public BookingResponse confirmBooking(
            Long bookingId,
            String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() ->
                        new RuntimeException("Owner not found"));

        if (!"OWNER".equalsIgnoreCase(owner.getRole())) {
            throw new RuntimeException(
                    "Only owners can confirm bookings");
        }

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        if (!booking.getRoom()
                .getHostel()
                .getOwner()
                .getId()
                .equals(owner.getId())) {

            throw new RuntimeException(
                    "You can only confirm bookings for your own hostels");
        }

        if (!"PENDING".equalsIgnoreCase(
                booking.getStatus())) {

            throw new RuntimeException(
                    "Only pending bookings can be confirmed");
        }

        Room room = booking.getRoom();

        int availableBeds =
                room.getCapacity() - room.getOccupiedBeds();

        if (booking.getBedsBooked() > availableBeds) {

            throw new RuntimeException(
                    "Not enough beds available");
        }

        room.setOccupiedBeds(
                room.getOccupiedBeds()
                        + booking.getBedsBooked()
        );

        room.setAvailable(
                room.getOccupiedBeds() < room.getCapacity()
        );

        roomRepository.save(room);

        booking.setStatus("CONFIRMED");

        Booking confirmedBooking =
                bookingRepository.save(booking);

        return BookingResponse.fromBooking(
                confirmedBooking
        );
    }
    // Complete booking by owner
public BookingResponse completeBooking(
        Long bookingId,
        String ownerEmail) {

    User owner = userRepository.findByEmail(ownerEmail)
            .orElseThrow(() ->
                    new RuntimeException("Owner not found"));

    if (!"OWNER".equalsIgnoreCase(owner.getRole())) {
        throw new RuntimeException(
                "Only owners can complete bookings");
    }

    Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() ->
                    new RuntimeException("Booking not found"));

    // Check booking belongs to owner's hostel
    if (!booking.getRoom()
            .getHostel()
            .getOwner()
            .getId()
            .equals(owner.getId())) {

        throw new RuntimeException(
                "You can only complete bookings for your own hostels");
    }

    // Only confirmed bookings can be completed
    if (!"CONFIRMED".equalsIgnoreCase(
            booking.getStatus())) {

        throw new RuntimeException(
                "Only confirmed bookings can be completed");
    }

    // Release occupied beds
    Room room = booking.getRoom();

    int newOccupiedBeds =
            room.getOccupiedBeds()
                    - booking.getBedsBooked();

    if (newOccupiedBeds < 0) {
        newOccupiedBeds = 0;
    }

    room.setOccupiedBeds(newOccupiedBeds);

    room.setAvailable(
            newOccupiedBeds < room.getCapacity()
    );

    roomRepository.save(room);

    // Complete booking
    booking.setStatus("COMPLETED");

    Booking completedBooking =
            bookingRepository.save(booking);

    return BookingResponse.fromBooking(
            completedBooking
    );
}
}