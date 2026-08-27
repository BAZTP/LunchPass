package com.lunchpass.dto;

public class ReservationRequestDTO {
    private Long menuId;
    private Long employeeId;

    public ReservationRequestDTO() {}
    public ReservationRequestDTO(Long menuId, Long employeeId) {
        this.menuId = menuId; this.employeeId = employeeId;
    }
    public Long getMenuId() { return menuId; }
    public void setMenuId(Long menuId) { this.menuId = menuId; }
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
}
