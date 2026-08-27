package com.lunchpass.repository;

import com.lunchpass.entity.QrCode;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QrCodeRepository extends JpaRepository<QrCode, Long> {
    
    Optional<QrCode> findByToken(String token);
    
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT q FROM QrCode q WHERE q.token = :token")
    Optional<QrCode> findByTokenForUpdate(@Param("token") String token);
}
