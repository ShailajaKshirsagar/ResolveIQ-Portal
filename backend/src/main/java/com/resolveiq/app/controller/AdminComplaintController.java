package com.resolveiq.app.controller;

import com.resolveiq.app.dto.AnalyticsResponse;
import com.resolveiq.app.dto.ComplaintResponse;
import com.resolveiq.app.entity.Complaint;
import com.resolveiq.app.enums.ComplaintStatus;
import com.resolveiq.app.service.AdminComplaintService;
import com.resolveiq.app.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/complaints")
public class AdminComplaintController {

    @Autowired
    AdminComplaintService adminComplaintService;

    @GetMapping("/view-all-complaints")
    public ResponseEntity<List<Complaint>> viewAllComplaints(Authentication authentication){
        Long adminId = (Long) authentication.getPrincipal();
        return new ResponseEntity<>(adminComplaintService.getAllComplaints(adminId), HttpStatus.OK);
    }

    @GetMapping("/get-complaintById/{complaintId}")
    public Complaint getComplaint(@PathVariable String complaintId,Authentication authentication) {
        Long adminId = (Long) authentication.getPrincipal();
        return adminComplaintService.getComplaintById(complaintId,adminId);
    }

    @GetMapping("/filter-by-status/{status}")
    public List<Complaint> getComplaintsByStatus(@PathVariable ComplaintStatus status,Authentication authentication) {
        Long adminId = (Long) authentication.getPrincipal();
        return adminComplaintService.getComplaintsByStatus(status,adminId);
    }

    @PutMapping("/update-complaint-status/{complaintId}")
    public Complaint updateStatus(@PathVariable String complaintId,@RequestParam ComplaintStatus status, Authentication authentication) {
        Long adminId = (Long) authentication.getPrincipal();
        return adminComplaintService.updateStatus(complaintId, adminId,status);
    }

    @PutMapping("/resolve-complaint/{complaintId}")
    public Complaint resolveComplaint(@PathVariable String complaintId,Authentication authentication) {
        Long adminId = (Long) authentication.getPrincipal();
        return adminComplaintService.resolveComplaint(complaintId,adminId);
    }

    @PutMapping("/reject-complaint/{complaintId}")
    public Complaint rejectComplaint(@PathVariable String complaintId,Authentication authentication) {
        Long adminId = (Long) authentication.getPrincipal();
        return adminComplaintService.rejectComplaint(complaintId,adminId);
    }

    //show all pending or unresolve complaint id's for admin
    @GetMapping("/get-pending-complaints")
    public List<ComplaintResponse> getPendingComplaint(Authentication authentication){
        Long adminId = (Long) authentication.getPrincipal();
        return adminComplaintService.getPendingComplaint(adminId);
    }

    @GetMapping("/recent-complaints")
    public ResponseEntity<List<ComplaintResponse>> getRecentComplaints(Authentication authentication) {
        Long adminId = (Long) authentication.getPrincipal();
        return new ResponseEntity<>(
                adminComplaintService.getRecentComplaints(adminId),
                HttpStatus.OK
        );
    }

    @GetMapping("/analytics")
    public AnalyticsResponse getAnalytics(Authentication authentication) {
        Long adminId = (Long) authentication.getPrincipal();
        return adminComplaintService.getAnalytics(adminId);
    }

    @GetMapping("/monthly-trend")
    public ResponseEntity<Map<String, Long>> getMonthlyTrend(Authentication authentication) {
        Long adminId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(adminComplaintService.
                getMonthlyTrend(adminId));
    }
}
