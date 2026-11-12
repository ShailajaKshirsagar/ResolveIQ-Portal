package com.resolveiq.app.service;

import com.resolveiq.app.entity.Complaint;
import com.resolveiq.app.repository.ComplaintRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public void generateDailyReport() {

        try {
            List<Complaint> complaints = complaintRepository.findAll();

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Complaint Report");

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Complaint ID");
            header.createCell(1).setCellValue("Title");
            header.createCell(2).setCellValue("Category");
            header.createCell(3).setCellValue("Description");
            header.createCell(4).setCellValue("Status");

            int rowNum = 1;

            for (Complaint c : complaints) {
                Row row = sheet.createRow(rowNum++);

                row.createCell(0).setCellValue(c.getComplaintId());
                row.createCell(1).setCellValue(c.getTitle());
                row.createCell(2).setCellValue(c.getCategory());
                row.createCell(3).setCellValue(c.getDescription());
                row.createCell(4).setCellValue(c.getStatus().name());
            }

            for (int i = 0; i < 5; i++) {
                sheet.autoSizeColumn(i);
            }
            String date = java.time.LocalDate.now().toString();
            String fileName = "Complaint_Report_" + date + ".xlsx";
            String folderPath = "C:/reports/";
            java.io.File folder = new java.io.File(folderPath);
            if (!folder.exists()) {
                folder.mkdirs();
            }
            java.io.FileOutputStream fileOut =
                    new java.io.FileOutputStream(folderPath + fileName);
            workbook.write(fileOut);
            fileOut.close();
            workbook.close();

            System.out.println("Report Generated: " + fileName);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}