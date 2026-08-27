package com.lunchpass.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "qr_codes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QrCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id", nullable = false, unique = true)
    private Reservation reservation;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime generatedAt;

    @OneToMany(mappedBy = "qrCode", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QrValidationLog> validationLogs;
}
