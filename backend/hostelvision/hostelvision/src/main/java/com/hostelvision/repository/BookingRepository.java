package com.hostelvision.repository;

import com.hostelvision.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerId(Long customerId);

    List<Booking> findByRoomId(Long roomId);

    List<Booking> findByStatus(String status);

    List<Booking> findByRoomHostelOwnerId(Long ownerId);

    @Query("""
            SELECT COALESCE(SUM(b.bedsBooked), 0)
            FROM Booking b
            WHERE b.room.id = :roomId
            AND b.status IN ('PENDING', 'CONFIRMED')
            """)
    Integer getReservedBeds(@Param("roomId") Long roomId);
}