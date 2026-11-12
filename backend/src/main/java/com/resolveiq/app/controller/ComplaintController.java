package com.resolveiq.app.controller;

import com.resolveiq.app.dto.ComplaintRequest;
import com.resolveiq.app.dto.ComplaintResponse;
import com.resolveiq.app.entity.Complaint;
import com.resolveiq.app.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/complaints")
@CrossOrigin(origins = "http://localhost:5173")

public class ComplaintController {

    @Autowired
    ComplaintService complaintService;

    @PostMapping("/submit-complaint")
    public String submitComplaint(@RequestBody ComplaintRequest request,Authentication authentication) {
        Long studentId = (Long) authentication.getPrincipal();
        return complaintService.submitComplaint(
                studentId,
                request.getTitle(),
                request.getDescription(),
                request.getCategory()
        );
    }

    @GetMapping("/view-all-complaints")
    public ResponseEntity<List<ComplaintResponse>> viewAllComplaints(Authentication authentication) {
        Long studentId = (Long) authentication.getPrincipal();
        return new ResponseEntity<>(complaintService.getAllComplaints(studentId), HttpStatus.OK);
    }

    //complaint status
    @GetMapping("/track-status/{complaintId}")
    public ResponseEntity<ComplaintResponse> trackComplaintStatusByCID(@PathVariable String complaintId,Authentication authentication){
        Long studentId = (Long) authentication.getPrincipal();
        return new ResponseEntity<>(complaintService.getStatusByComplaintId(complaintId,studentId),HttpStatus.OK);
    }
    @PutMapping("/rate/{complaintId}")
    public Complaint rate(@PathVariable String complaintId, @RequestParam Integer rating,Authentication authentication) {
        Long studentId = (Long) authentication.getPrincipal();
        return complaintService.giveRating(complaintId, rating,studentId);
    }
    @PutMapping("/reopen/{complaintId}")
    public Complaint reopen(@PathVariable String complaintId,Authentication authentication) {
        Long studentId = (Long) authentication.getPrincipal();
        return complaintService.reopenComplaint(complaintId,studentId);
    }

}
