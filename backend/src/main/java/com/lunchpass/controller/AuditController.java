package com.lunchpass.controller;

import com.lunchpass.service.AuditService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/audit")
public class AuditController {
    @Autowired
    private AuditService auditService;

    @PostMapping
    public void log(@RequestParam String action) {
        auditService.logAction(action);
    }
}
