package com.lunchpass.controller;

import com.lunchpass.service.DepartmentService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @GetMapping
    public List<Object> getAll() {
        return departmentService.getAllDepartments();
    }
}
