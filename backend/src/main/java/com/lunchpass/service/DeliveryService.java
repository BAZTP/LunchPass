package com.lunchpass.service;

import com.lunchpass.dto.DeliveryRequest;
import com.lunchpass.entity.MealDelivery;
import com.lunchpass.entity.Reservation;
import com.lunchpass.repository.MealDeliveryRepository;
import com.lunchpass.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class DeliveryService {

    @Autowired
    private MealDeliveryRepository mealDeliveryRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Transactional
    public void confirmDelivery(DeliveryRequest request) {
        Reservation reservation = reservationRepository.findById(request.getReservationId())
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada con ID: " + request.getReservationId()));

        if ("DELIVERED".equalsIgnoreCase(reservation.getStatus()) || "USED".equalsIgnoreCase(reservation.getStatus())) {
            throw new IllegalStateException("Esta reserva ya fue marcada como ENTREGADA anteriormente.");
        }

        reservation.setStatus("DELIVERED");
        if (reservation.getQrCode() != null) {
            reservation.getQrCode().setStatus("USED");
        }
        reservationRepository.save(reservation);

        MealDelivery delivery = new MealDelivery();
        delivery.setReservation(reservation);
        delivery.setDeliveryTime(LocalDateTime.now());
        delivery.setStatus("DELIVERED");
        mealDeliveryRepository.save(delivery);
    }
}
