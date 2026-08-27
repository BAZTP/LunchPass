package com.lunchpass.mapper;

import com.lunchpass.dto.*;
import org.springframework.stereotype.Component;

@Component
public class GenericMapper {
    public UserDTO toUserDTO(Object userEntity) {
        return new UserDTO();
    }
    
    public EmployeeDTO toEmployeeDTO(Object employeeEntity) {
        return new EmployeeDTO();
    }
    
    public MenuDto toMenuDTO(Object menuEntity) {
        return new MenuDto();
    }
    
    public ReservationResponseDTO toReservationResponseDTO(Object reservationEntity) {
        return new ReservationResponseDTO();
    }
    
    public DeliveryDTO toDeliveryDTO(Object deliveryEntity) {
        return new DeliveryDTO();
    }
}
