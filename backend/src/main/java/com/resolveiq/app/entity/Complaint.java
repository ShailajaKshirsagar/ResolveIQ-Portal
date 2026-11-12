package com.resolveiq.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.resolveiq.app.enums.ComplaintPriority;
import com.resolveiq.app.enums.ComplaintStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Long id;

    private String complaintId;

    private String title;

    @Column(length = 2000)
    private String description;

    private String category;

    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;

    @Enumerated(EnumType.STRING)
    private ComplaintPriority priority;

    @JsonIgnore
    private LocalDateTime createdAt;
    @JsonIgnore
    private LocalDateTime updatedAt;

    @JsonIgnore
    private boolean deleted = false;

    @JsonIgnore
    private Integer rating;
    //after resolved

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private User user;
}
