package com.lunchpass.controller;

import com.lunchpass.service.SystemSettingService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/settings")
public class SettingController {
    @Autowired
    private SystemSettingService systemSettingService;

    @GetMapping("/{key}")
    public String getSetting(@PathVariable String key) {
        return systemSettingService.getSetting(key);
    }
}
