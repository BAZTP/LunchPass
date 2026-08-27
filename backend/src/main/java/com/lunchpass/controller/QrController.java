package com.lunchpass.controller;

import com.lunchpass.dto.QrValidationRequest;
import com.lunchpass.dto.QrValidationResponse;
import com.lunchpass.service.QrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/qr")
public class QrController {

    @Autowired
    private QrService qrService;

    @PostMapping("/validate")
    public ResponseEntity<QrValidationResponse> validateQr(@RequestBody QrValidationRequest request) {
        return ResponseEntity.ok(qrService.validateQr(request));
    }
}
