package com.lunchpass.dto;

public class DeliveryDTO {
    private Long id;
    private ReservationResponseDTO reservation;
    private String deliveredAt;
    private String status;

    public DeliveryDTO() {}
    public DeliveryDTO(Long id, ReservationResponseDTO reservation, String deliveredAt, String status) {
        this.id = id; this.reservation = reservation; this.deliveredAt = deliveredAt; this.status = status;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public ReservationResponseDTO getReservation() { return reservation; }
    public void setReservation(ReservationResponseDTO reservation) { this.reservation = reservation; }
    public String getDeliveredAt() { return deliveredAt; }
    public void setDeliveredAt(String deliveredAt) { this.deliveredAt = deliveredAt; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
