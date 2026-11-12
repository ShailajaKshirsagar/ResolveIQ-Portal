package com.resolveiq.app.repository;

import com.resolveiq.app.entity.Complaint;
import com.resolveiq.app.enums.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint,Long> {
    boolean existsByUserIdAndTitle(Long id, String title);

    @Query("SELECT c FROM Complaint c WHERE c.complaintId =:complaintId")
    Complaint findByComplaintId(@Param("complaintId") String complaintId);

    List<Complaint> findByUserId(Long userId);


    @Query("SELECT c FROM Complaint c WHERE c.status =:status")
    List<Complaint> findByStatus(@Param("status") ComplaintStatus status);

    @Query("SELECT c FROM Complaint c WHERE c.status = 'PENDING'")
    List<Complaint> findPendingComplaints();

    @Query("SELECT c FROM Complaint c ORDER BY c.createdAt DESC")
    List<Complaint> findRecentComplaints(org.springframework.data.domain.Pageable pageable);

    @Query("SELECT COUNT(c) FROM Complaint c")
    long countAll();

    @Query("SELECT COUNT(c) FROM Complaint c WHERE c.status = 'PENDING'")
    long countPending();

    @Query("SELECT COUNT(c) FROM Complaint c WHERE c.status = 'RESOLVED'")
    long countResolved();

    @Query("SELECT COUNT(c) FROM Complaint c WHERE c.status = 'REJECTED'")
    long countRejected();

    @Query("SELECT FUNCTION('TO_CHAR', c.createdAt, 'YYYY-MM'), COUNT(c) " +
            "FROM Complaint c " +
            "GROUP BY FUNCTION('TO_CHAR', c.createdAt, 'YYYY-MM') " +
            "ORDER BY FUNCTION('TO_CHAR', c.createdAt, 'YYYY-MM')")
    List<Object[]> getMonthlyTrend();
}
