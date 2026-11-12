package com.resolveiq.app.scheduler;

import com.resolveiq.app.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ReportScheduler {

    @Autowired
    ReportService reportService;

    // Runs daily at 6 PM
    @Scheduled(cron = "0 0 18 * * ?")
//    @Scheduled(cron = "0 * * * * ?")
    public void generateReportDaily() {
        reportService.generateDailyReport();
    }
}