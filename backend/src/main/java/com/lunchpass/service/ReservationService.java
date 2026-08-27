package com.lunchpass.service;

import com.lunchpass.dto.CreateReservationRequest;
import com.lunchpass.dto.MenuItemDto;
import com.lunchpass.dto.ReservationResponse;
import com.lunchpass.entity.Employee;
import com.lunchpass.entity.MenuItem;
import com.lunchpass.entity.QrCode;
import com.lunchpass.entity.Reservation;
import com.lunchpass.repository.EmployeeRepository;
import com.lunchpass.repository.MenuItemRepository;
import com.lunchpass.repository.QrCodeRepository;
import com.lunchpass.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private QrCodeRepository qrCodeRepository;

    @Transactional(readOnly = true)
    public List<ReservationResponse> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<ReservationResponse> getReservationById(Long id) {
        return reservationRepository.findById(id)
                .map(this::convertToResponse);
    }

    @Transactional
    public ReservationResponse createReservation(CreateReservationRequest request) {
        Employee employee = null;
        if (request.getEmployeeId() != null) {
            employee = employeeRepository.findById(request.getEmployeeId()).orElse(null);
        }
        if (employee == null) {
            employee = employeeRepository.findAll().stream().findFirst().orElse(null);
        }

        MenuItem menuItem = menuItemRepository.findById(request.getMenuItemId())
                .orElseThrow(() -> new RuntimeException("Plato de menú no encontrado con ID: " + request.getMenuItemId()));

        LocalDate date = request.getDate() != null ? request.getDate() : LocalDate.now();

        String code = "LP-2026-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();

        Reservation reservation = new Reservation();
        reservation.setEmployee(employee);
        reservation.setMenuItem(menuItem);
        reservation.setReservationDate(date.atStartOfDay());
        reservation.setStatus("CONFIRMED");

        Reservation saved = reservationRepository.save(reservation);

        String qrToken = "LP-QR-" + UUID.randomUUID().toString();
        QrCode qrCode = new QrCode();
        qrCode.setReservation(saved);
        qrCode.setToken(qrToken);
        qrCode.setStatus("ACTIVE");
        qrCode.setGeneratedAt(LocalDateTime.now());
        qrCodeRepository.save(qrCode);

        saved.setQrCode(qrCode);

        return convertToResponse(saved, code);
    }

    @Transactional
    public void cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada con ID: " + id));

        reservation.setStatus("CANCELLED");
        if (reservation.getQrCode() != null) {
            reservation.getQrCode().setStatus("REVOKED");
        }
        reservationRepository.save(reservation);
    }

    private ReservationResponse convertToResponse(Reservation r) {
        String code = "LP-2026-" + String.format("%06d", r.getId());
        return convertToResponse(r, code);
    }

    private ReservationResponse convertToResponse(Reservation r, String displayCode) {
        MenuItemDto itemDto = null;
        if (r.getMenuItem() != null) {
            itemDto = new MenuItemDto(
                    r.getMenuItem().getId(),
                    r.getMenuItem().getName(),
                    r.getMenuItem().getDescription(),
                    r.getMenuItem().getCategory(),
                    r.getMenuItem().getCalories(),
                    r.getMenuItem().getPrice()
            );
        }

        LocalDate date = r.getReservationDate() != null ? r.getReservationDate().toLocalDate() : LocalDate.now();

        return new ReservationResponse(
                r.getId(),
                displayCode,
                date.toString(),
                r.getStatus(),
                itemDto
        );
    }
}
