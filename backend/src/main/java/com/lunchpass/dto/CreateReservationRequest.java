package com.lunchpass.dto;

import java.time.LocalDate;

public class CreateReservationRequest {
    private Long menuItemId;
    private Long employeeId;
    private LocalDate date;

    public CreateReservationRequest() {}

    public CreateReservationRequest(Long menuItemId, Long employeeId, LocalDate date) {
        this.menuItemId = menuItemId;
        this.employeeId = employeeId;
        this.date = date;
    }

    public Long getMenuItemId() { return menuItemId; }
    public void setMenuItemId(Long menuItemId) { this.menuItemId = menuItemId; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}
