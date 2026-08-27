package com.lunchpass.dto;

public class EmployeeDTO {
    private Long id;
    private String name;
    private String department;
    private UserDTO user;

    public EmployeeDTO() {}
    public EmployeeDTO(Long id, String name, String department, UserDTO user) {
        this.id = id; this.name = name; this.department = department; this.user = user;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public UserDTO getUser() { return user; }
    public void setUser(UserDTO user) { this.user = user; }
}
