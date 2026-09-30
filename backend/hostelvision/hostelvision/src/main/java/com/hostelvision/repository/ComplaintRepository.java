package com.hostelvision.repository;

import com.hostelvision.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository
        extends JpaRepository<Complaint, Long> {

    List<Complaint> findByCustomerId(Long customerId);

    List<Complaint> findByHostelId(Long hostelId);

    List<Complaint> findByStatus(String status);

    List<Complaint> findByHostelOwnerId(Long ownerId);
}