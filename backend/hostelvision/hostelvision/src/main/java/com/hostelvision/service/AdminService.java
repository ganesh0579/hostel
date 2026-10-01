package com.hostelvision.service;
import com.hostelvision.entity.Hostel;
import com.hostelvision.dto.BookingResponse;
import com.hostelvision.dto.ComplaintResponse;
import com.hostelvision.dto.HostelResponse;
import com.hostelvision.dto.RoomResponse;
import com.hostelvision.dto.UserResponse;
import com.hostelvision.entity.User;
import com.hostelvision.repository.BookingRepository;
import com.hostelvision.repository.ComplaintRepository;
import com.hostelvision.repository.HostelRepository;
import com.hostelvision.repository.RoomRepository;
import com.hostelvision.repository.UserRepository;
import com.hostelvision.entity.Room;
import org.springframework.stereotype.Service;
import com.hostelvision.entity.Booking;
import java.util.List;
import com.hostelvision.entity.Complaint;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final HostelRepository hostelRepository;
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;
    private final ComplaintRepository complaintRepository;

    public AdminService(
            UserRepository userRepository,
            HostelRepository hostelRepository,
            RoomRepository roomRepository,
            BookingRepository bookingRepository,
            ComplaintRepository complaintRepository) {

        this.userRepository = userRepository;
        this.hostelRepository = hostelRepository;
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
        this.complaintRepository = complaintRepository;
    }

    // ==========================================
    // ADMIN VIEWS ALL USERS
    // ==========================================

    public List<UserResponse> getAllUsers(
            String adminEmail) {

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found"));

        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
            throw new RuntimeException(
                    "Only admins can access this API");
        }

        return userRepository.findAll()
                .stream()
                .map(UserResponse::fromUser)
                .toList();
    }

    // ==========================================
    // ADMIN VIEWS ALL HOSTELS
    // ==========================================

    public List<HostelResponse> getAllHostels(
            String adminEmail) {

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found"));

        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
            throw new RuntimeException(
                    "Only admins can access this API");
        }

        return hostelRepository.findAll()
                .stream()
                .map(HostelResponse::fromHostel)
                .toList();
    }

    // ==========================================
    // ADMIN VIEWS ALL ROOMS
    // ==========================================

    public List<RoomResponse> getAllRooms(
            String adminEmail) {

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found"));

        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
            throw new RuntimeException(
                    "Only admins can access this API");
        }

        return roomRepository.findAll()
                .stream()
                .map(RoomResponse::fromRoom)
                .toList();
    }

    // ==========================================
    // ADMIN VIEWS ALL BOOKINGS
    // ==========================================

    public List<BookingResponse> getAllBookings(
            String adminEmail) {

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found"));

        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
            throw new RuntimeException(
                    "Only admins can access this API");
        }

        return bookingRepository.findAll()
                .stream()
                .map(BookingResponse::fromBooking)
                .toList();
    }

    // ==========================================
    // ADMIN VIEWS ALL COMPLAINTS
    // ==========================================

    public List<ComplaintResponse> getAllComplaints(
            String adminEmail) {

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found"));

        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
            throw new RuntimeException(
                    "Only admins can access this API");
        }

        return complaintRepository.findAll()
                .stream()
                .map(ComplaintResponse::fromComplaint)
                .toList();
    }
    // Admin activates or deactivates a user
public UserResponse updateUserStatus(
        String adminEmail,
        Long userId,
        Boolean active) {

    User admin = userRepository.findByEmail(adminEmail)
            .orElseThrow(() ->
                    new RuntimeException("Admin not found"));

    if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
        throw new RuntimeException(
                "Only admins can access this API");
    }

    User user = userRepository.findById(userId)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    // Admin cannot deactivate another admin
    if ("ADMIN".equalsIgnoreCase(user.getRole())) {
        throw new RuntimeException(
                "Admin accounts cannot be deactivated");
    }

    user.setActive(active);

    User updatedUser = userRepository.save(user);

    return UserResponse.fromUser(updatedUser);
}
// Admin activates or deactivates a hostel
public HostelResponse updateHostelStatus(
        String adminEmail,
        Long hostelId,
        Boolean active) {

    User admin = userRepository.findByEmail(adminEmail)
            .orElseThrow(() ->
                    new RuntimeException("Admin not found"));

    if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
        throw new RuntimeException(
                "Only admins can access this API");
    }

    Hostel hostel = hostelRepository.findById(hostelId)
            .orElseThrow(() ->
                    new RuntimeException("Hostel not found"));

    hostel.setActive(active);

    Hostel updatedHostel =
            hostelRepository.save(hostel);

    return HostelResponse.fromHostel(updatedHostel);
}
// Admin activates or deactivates a room
public RoomResponse updateRoomStatus(
        String adminEmail,
        Long roomId,
        Boolean active) {

    User admin = userRepository.findByEmail(adminEmail)
            .orElseThrow(() ->
                    new RuntimeException("Admin not found"));

    if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
        throw new RuntimeException(
                "Only admins can access this API");
    }

    Room room = roomRepository.findById(roomId)
            .orElseThrow(() ->
                    new RuntimeException("Room not found"));

    room.setActive(active);

    Room updatedRoom =
            roomRepository.save(room);

    return RoomResponse.fromRoom(updatedRoom);
}
// Admin manages booking status
public BookingResponse updateBookingStatus(
        String adminEmail,
        Long bookingId,
        String newStatus) {

    User admin = userRepository.findByEmail(adminEmail)
            .orElseThrow(() ->
                    new RuntimeException("Admin not found"));

    if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
        throw new RuntimeException(
                "Only admins can access this API");
    }

    Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() ->
                    new RuntimeException("Booking not found"));

    String currentStatus = booking.getStatus();
    String status = newStatus.toUpperCase();

    if (!status.equals("CONFIRMED")
            && !status.equals("CANCELLED")
            && !status.equals("COMPLETED")) {

        throw new RuntimeException(
                "Invalid booking status");
    }

    Room room = booking.getRoom();

    // PENDING -> CONFIRMED
    if ("PENDING".equals(currentStatus)
            && "CONFIRMED".equals(status)) {

        int occupiedBeds = room.getOccupiedBeds();
        int bedsBooked = booking.getBedsBooked();

        if (occupiedBeds + bedsBooked > room.getCapacity()) {
            throw new RuntimeException(
                    "Not enough beds available");
        }

        room.setOccupiedBeds(
                occupiedBeds + bedsBooked
        );

        room.setAvailable(
                room.getOccupiedBeds() < room.getCapacity()
        );

        roomRepository.save(room);
    }

    // CONFIRMED -> COMPLETED
    else if ("CONFIRMED".equals(currentStatus)
            && "COMPLETED".equals(status)) {

        int occupiedBeds = room.getOccupiedBeds();

        room.setOccupiedBeds(
                Math.max(
                        0,
                        occupiedBeds - booking.getBedsBooked()
                )
        );

        room.setAvailable(
                room.getOccupiedBeds() < room.getCapacity()
        );

        roomRepository.save(room);
    }

    // CONFIRMED -> CANCELLED
    else if ("CONFIRMED".equals(currentStatus)
            && "CANCELLED".equals(status)) {

        int occupiedBeds = room.getOccupiedBeds();

        room.setOccupiedBeds(
                Math.max(
                        0,
                        occupiedBeds - booking.getBedsBooked()
                )
        );

        room.setAvailable(
                room.getOccupiedBeds() < room.getCapacity()
        );

        roomRepository.save(room);
    }

    // PENDING -> CANCELLED
    else if ("PENDING".equals(currentStatus)
            && "CANCELLED".equals(status)) {

        // No occupied-bed change required.
    }

    else {
        throw new RuntimeException(
                "Invalid booking status transition from "
                        + currentStatus
                        + " to "
                        + status);
    }

    booking.setStatus(status);

    Booking updatedBooking =
            bookingRepository.save(booking);

    return BookingResponse.fromBooking(updatedBooking);
}
// Admin updates complaint status
public ComplaintResponse updateComplaintStatus(
        String adminEmail,
        Long complaintId,
        String newStatus) {

    User admin = userRepository.findByEmail(adminEmail)
            .orElseThrow(() ->
                    new RuntimeException("Admin not found"));

    if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
        throw new RuntimeException(
                "Only admins can access this API");
    }

    Complaint complaint = complaintRepository.findById(complaintId)
            .orElseThrow(() ->
                    new RuntimeException("Complaint not found"));

    String status = newStatus.toUpperCase();

    if (!status.equals("OPEN")
            && !status.equals("IN_PROGRESS")
            && !status.equals("RESOLVED")) {

        throw new RuntimeException(
                "Invalid complaint status");
    }

    complaint.setStatus(status);

    Complaint updatedComplaint =
            complaintRepository.save(complaint);

    return ComplaintResponse.fromComplaint(updatedComplaint);
}
}