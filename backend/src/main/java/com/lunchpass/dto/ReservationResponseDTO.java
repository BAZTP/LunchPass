package com.lunchpass.dto;

public class ReservationResponseDTO {
    private Long id;
    private MenuDto menu;
    private EmployeeDTO employee;
    private String status;

    public ReservationResponseDTO() {}
    public ReservationResponseDTO(Long id, MenuDto menu, EmployeeDTO employee, String status) {
        this.id = id; this.menu = menu; this.employee = employee; this.status = status;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public MenuDto getMenu() { return menu; }
    public void setMenu(MenuDto menu) { this.menu = menu; }
    public EmployeeDTO getEmployee() { return employee; }
    public void setEmployee(EmployeeDTO employee) { this.employee = employee; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
