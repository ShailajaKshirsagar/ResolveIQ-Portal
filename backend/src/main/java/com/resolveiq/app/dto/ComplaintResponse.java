package com.resolveiq.app.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.resolveiq.app.enums.ComplaintPriority;
import com.resolveiq.app.enums.ComplaintStatus;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComplaintResponse {
    private String complaintId;
    private String title;
    private String description;
    private String category;
    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;
    @Enumerated(EnumType.STRING)
    private ComplaintPriority priority;
}
