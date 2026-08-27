package com.lunchpass.repository;

import com.lunchpass.entity.MealDelivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealDeliveryRepository extends JpaRepository<MealDelivery, Long> {
}
