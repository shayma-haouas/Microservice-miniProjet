package com.example.Student.Management.Microservice.Controller;

import com.example.Student.Management.Microservice.Service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/chart")
public class ChartController {

    @Autowired
    private ChartService chartService;

    @GetMapping("/user-stats")
    public ResponseEntity<byte[]> getUserStatsChart(
            @RequestParam int verifiedUsers,
            @RequestParam int unverifiedUsers,
            @RequestParam int blockedUsers
    ) throws IOException {
        byte[] chartImage = chartService.generateUserStatsChart(verifiedUsers, unverifiedUsers, blockedUsers);

        HttpHeaders headers = new HttpHeaders();
        // Changer 'inline' en 'attachment' pour forcer le téléchargement du fichier
        headers.add("Content-Disposition", "attachment; filename=user-stats.png");

        return new ResponseEntity<>(chartImage, headers, HttpStatus.OK);
    }
}
