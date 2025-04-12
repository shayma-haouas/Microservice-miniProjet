package com.example.Student.Management.Microservice.Controller;


import com.example.Student.Management.Microservice.Service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;

@RestController
@RequestMapping("/api/pdf")
public class PdfController {

    @Autowired
    private PdfService pdfService;

    @GetMapping("/contract")
    public ResponseEntity<InputStreamResource> generateContract(
            @RequestParam String userName,
            @RequestParam String title,
            @RequestParam String content
    ) {
        ByteArrayInputStream bis = pdfService.generateContractPdf(userName, title, content);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=contrat.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
