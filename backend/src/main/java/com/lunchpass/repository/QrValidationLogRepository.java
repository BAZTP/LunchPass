package com.lunchpass.repository;

import com.lunchpass.entity.QrValidationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QrValidationLogRepository extends JpaRepository<QrValidationLog, Long> {
}
