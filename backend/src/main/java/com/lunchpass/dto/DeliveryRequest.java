package com.lunchpass.dto;

public class DeliveryRequest {
    private Long reservationId;

    public DeliveryRequest() {}
    public DeliveryRequest(Long reservationId) { this.reservationId = reservationId; }

    public Long getReservationId() { return reservationId; }
    public void setReservationId(Long reservationId) { this.reservationId = reservationId; }
}
