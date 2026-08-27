package com.lunchpass.controller;

import com.lunchpass.service.DashboardService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public Object getStats() {
        return dashboardService.getDashboardStats();
    }
}
