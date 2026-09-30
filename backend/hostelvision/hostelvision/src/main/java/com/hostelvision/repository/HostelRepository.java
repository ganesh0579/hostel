package com.hostelvision.repository;

import com.hostelvision.entity.Hostel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HostelRepository extends JpaRepository<Hostel, Long> {

    List<Hostel> findByCity(String city);

    List<Hostel> findByOwnerId(Long ownerId);
}