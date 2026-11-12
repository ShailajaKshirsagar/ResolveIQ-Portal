package com.resolveiq.app.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final String folderPath = "C:/reports/";

    @GetMapping("/download-complaint-report")
    public ResponseEntity<Resource> downloadReport(@RequestParam String date) {

        try {
            String fileName = "Complaint_Report_" + date + ".xlsx";
            Path filePath = Paths.get(folderPath + fileName);

            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }
            UrlResource resource = new UrlResource(filePath.toUri());
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=" + fileName)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/get-all-complaint-reports")
    public List<String> listReports() throws IOException {
        return Files.list(Paths.get("C:/reports/"))
                .map(path -> path.getFileName().toString())
                .toList();
    }
}
