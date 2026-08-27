package com.lunchpass.dto;

public class ReservationResponse {
    private Long id;
    private String code;
    private String date;
    private String status;
    private MenuItemDto menuItem;

    public ReservationResponse() {}

    public ReservationResponse(Long id, String code, String date, String status, MenuItemDto menuItem) {
        this.id = id;
        this.code = code;
        this.date = date;
        this.status = status;
        this.menuItem = menuItem;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public MenuItemDto getMenuItem() { return menuItem; }
    public void setMenuItem(MenuItemDto menuItem) { this.menuItem = menuItem; }
}
