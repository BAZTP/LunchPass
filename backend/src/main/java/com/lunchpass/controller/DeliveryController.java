package com.lunchpass.controller;

import com.lunchpass.dto.DeliveryRequest;
import com.lunchpass.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @PostMapping
    public ResponseEntity<Void> confirmDelivery(@RequestBody DeliveryRequest request) {
        deliveryService.confirmDelivery(request);
        return ResponseEntity.ok().build();
    }
}
