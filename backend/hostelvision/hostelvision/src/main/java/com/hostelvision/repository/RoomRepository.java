package com.hostelvision.repository;

import com.hostelvision.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByHostelId(Long hostelId);

    List<Room> findByAvailableTrue();

    boolean existsByHostelIdAndRoomNumber(
            Long hostelId,
            String roomNumber
    );
}