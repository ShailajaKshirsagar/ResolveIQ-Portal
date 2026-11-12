package com.resolveiq.app.service;

import com.resolveiq.app.dto.AnalyticsResponse;
import com.resolveiq.app.dto.ComplaintResponse;
import com.resolveiq.app.entity.Complaint;
import com.resolveiq.app.entity.User;
import com.resolveiq.app.enums.ComplaintStatus;
import com.resolveiq.app.notification.EmailService;
import com.resolveiq.app.repository.AdminRepo;
import com.resolveiq.app.repository.ComplaintRepository;
import com.resolveiq.app.repository.UserRepository;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminComplaintService {

    @Autowired
    ComplaintRepository complaintRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AdminRepo adminRepo;
    @Autowired
    EmailService emailService;

    public List<Complaint> getAllComplaints(Long adminId) {
        User user = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        List<Complaint> complaintList = complaintRepository.findAll();
        return complaintList;
    }

    public Complaint getComplaintById(String complaintId, Long adminId) {
        User user = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        Complaint complaint =  complaintRepository.findByComplaintId(complaintId) ;
        return complaint;
    }

    public List<Complaint> getComplaintsByStatus(ComplaintStatus status,Long adminId) {
        User user = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        return complaintRepository.findByStatus(status);
    }

    public Complaint updateStatus(String complaintId, Long adminId, ComplaintStatus status) {
        User user = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        Complaint complaint = complaintRepository.findByComplaintId(complaintId);
        complaint.setStatus(status);
        complaint.setUpdatedAt(LocalDateTime.now());
        return complaintRepository.save(complaint);
    }

    public Complaint resolveComplaint(String complaintId, Long adminId) {
        User user = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        Complaint complaint = complaintRepository.findByComplaintId(complaintId);
        complaint.setStatus(ComplaintStatus.RESOLVED);
        complaint.setUpdatedAt(LocalDateTime.now());

        Complaint saved = complaintRepository.save(complaint);
        emailService.sendEmail(
                complaint.getUser().getEmail(),
                "Complaint Resolved",
                "Your complaint with ID " + complaintId + " has been resolved."
        );
        return saved;
    }

    public Complaint rejectComplaint(String complaintId, Long adminId) {
        User user = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        Complaint complaint = complaintRepository.findByComplaintId(complaintId);
        complaint.setStatus(ComplaintStatus.REJECTED);
        complaint.setUpdatedAt(LocalDateTime.now());
        Complaint saved = complaintRepository.save(complaint);
        emailService.sendEmail(
                complaint.getUser().getEmail(),
                "Complaint Rejected",
                "Your complaint with ID " + complaintId + " Is REJECTED"
        );
        return saved;
    }

    public List<ComplaintResponse> getPendingComplaint(Long adminId) {
        User user = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        List<Complaint> complaints = complaintRepository.findPendingComplaints();
        List<ComplaintResponse> responseList = new ArrayList<>();
        for(Complaint complaint : complaints){
            ComplaintResponse response = ComplaintResponse.builder()
                    .complaintId(complaint.getComplaintId())
                    .title(complaint.getTitle())
                    .description(complaint.getDescription())
                    .category(complaint.getCategory())
                    .status(complaint.getStatus())
                    .priority(complaint.getPriority())
                    .build();
            responseList.add(response);
        }
        return responseList;
    }
    public List<ComplaintResponse> getRecentComplaints(Long adminId) {
        User user = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        // Limit to 5 recent complaints
        List<Complaint> complaints = complaintRepository.findRecentComplaints(
                org.springframework.data.domain.PageRequest.of(0, 10)
        );

        List<ComplaintResponse> responseList = new ArrayList<>();

        for (Complaint complaint : complaints) {
            ComplaintResponse response = ComplaintResponse.builder()
                    .title(complaint.getTitle())
                    .description(complaint.getDescription())
                    .category(complaint.getCategory())
                    .status(complaint.getStatus())
                    .priority(complaint.getPriority())
                    .build();

            responseList.add(response);
        }

        return responseList;
    }

    public AnalyticsResponse getAnalytics(Long adminId) {

        User user = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        return AnalyticsResponse.builder()
                .totalComplaints(complaintRepository.countAll())
                .pendingComplaints(complaintRepository.countPending())
                .resolvedComplaints(complaintRepository.countResolved())
                .rejectedComplaints(complaintRepository.countRejected())
                .build();
    }

    public Map<String, Long> getMonthlyTrend(Long adminId) {

        User user = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        List<Object[]> data = complaintRepository.getMonthlyTrend();

        Map<String, Long> result = new LinkedHashMap<>();

        for (Object[] row : data) {
            String month = row[0].toString();
            Long count = (Long) row[1];
            result.put(month, count);
        }

        return result;
    }
}
