package com.resolveiq.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnalyticsResponse {

    private long totalComplaints;
    private long pendingComplaints;
    private long resolvedComplaints;
    private long rejectedComplaints;
}