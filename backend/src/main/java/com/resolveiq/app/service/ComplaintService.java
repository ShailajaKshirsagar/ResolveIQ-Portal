package com.resolveiq.app.service;

import com.resolveiq.app.dto.ComplaintResponse;
import com.resolveiq.app.entity.Complaint;
import com.resolveiq.app.entity.User;
import com.resolveiq.app.enums.ComplaintPriority;
import com.resolveiq.app.enums.ComplaintStatus;
import com.resolveiq.app.notification.EmailService;
import com.resolveiq.app.repository.ComplaintRepository;
import com.resolveiq.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ComplaintService {

    @Autowired
    ComplaintRepository complaintRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmailService emailService;

    public String submitComplaint(Long studentId, String title, String description, String category) {

        User user = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (complaintRepository.existsByUserIdAndTitle(studentId, title)) {
            return "You already raised a similar complaint.";
        }

        Complaint complaint = Complaint.builder()
                .complaintId("CMP-" + UUID.randomUUID().toString().substring(0, 6))
                .title(title)
                .description(description)
                .category(category)
                .status(ComplaintStatus.PENDING)
                .priority(autoDetectPriority(description))
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .user(user)
                .build();

        Complaint savedComplaint = complaintRepository.save(complaint);

        emailService.sendEmail(
                user.getEmail(),
                "Complaint Submitted",
                "Your complaint with ID " + savedComplaint.getComplaintId() + " has been submitted successfully."
        );

        return "Complaint submitted successfully. Complaint ID: " + savedComplaint.getComplaintId();
    }

    private ComplaintPriority autoDetectPriority(String description) {
        String text = description.toLowerCase();

        if (text.contains("urgent") || text.contains("harassment") || text.contains("electric")) {
            return ComplaintPriority.HIGH;
        }
        return ComplaintPriority.MEDIUM;
    }

    public List<ComplaintResponse> getAllComplaints(Long studentId) {

        userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return complaintRepository.findByUserId(studentId)
                .stream()
                .map(c -> ComplaintResponse.builder()
                        .complaintId(c.getComplaintId())
                        .title(c.getTitle())
                        .description(c.getDescription())
                        .category(c.getCategory())
                        .status(c.getStatus())
                        .priority(c.getPriority())
                        .build())
                .collect(Collectors.toList());
    }

    public ComplaintResponse getStatusByComplaintId(String complaintId, Long studentId) {

        Complaint complaint = complaintRepository.findByComplaintId(complaintId);

        if (complaint == null || !complaint.getUser().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized access");
        }

        return ComplaintResponse.builder()
                .complaintId(complaint.getComplaintId())
                .title(complaint.getTitle())
                .description(complaint.getDescription())
                .category(complaint.getCategory())
                .status(complaint.getStatus())
                .priority(complaint.getPriority())
                .build();
    }

    public Complaint giveRating(String complaintId, Integer rating, Long studentId) {

        Complaint complaint = complaintRepository.findByComplaintId(complaintId);

        if (complaint == null || !complaint.getUser().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized access");
        }

        complaint.setRating(rating);
        return complaintRepository.save(complaint);
    }

    public Complaint reopenComplaint(String complaintId, Long studentId) {

        Complaint complaint = complaintRepository.findByComplaintId(complaintId);

        if (complaint == null || !complaint.getUser().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized access");
        }

        if (complaint.getStatus() != ComplaintStatus.RESOLVED) {
            throw new RuntimeException("Only resolved complaint can be reopened");
        }

        complaint.setStatus(ComplaintStatus.REOPENED);
        complaint.setUpdatedAt(LocalDateTime.now());

        return complaintRepository.save(complaint);
    }
}