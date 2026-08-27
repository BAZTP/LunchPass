package com.lunchpass.dto;

public class QrValidationResponse {
    private boolean valid;
    private String status;
    private String message;
    private Long reservationId;
    private String employeeName;
    private String reservationCode;
    private String menuItemName;

    public QrValidationResponse() {}

    public QrValidationResponse(boolean valid, String status, String message, Long reservationId, String employeeName, String reservationCode, String menuItemName) {
        this.valid = valid;
        this.status = status;
        this.message = message;
        this.reservationId = reservationId;
        this.employeeName = employeeName;
        this.reservationCode = reservationCode;
        this.menuItemName = menuItemName;
    }

    public boolean isValid() { return valid; }
    public void setValid(boolean valid) { this.valid = valid; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Long getReservationId() { return reservationId; }
    public void setReservationId(Long reservationId) { this.reservationId = reservationId; }

    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }

    public String getReservationCode() { return reservationCode; }
    public void setReservationCode(String reservationCode) { this.reservationCode = reservationCode; }

    public String getMenuItemName() { return menuItemName; }
    public void setMenuItemName(String menuItemName) { this.menuItemName = menuItemName; }
}
