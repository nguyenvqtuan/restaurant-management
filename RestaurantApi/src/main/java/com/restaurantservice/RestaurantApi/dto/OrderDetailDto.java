package com.restaurantservice.RestaurantApi.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDto {
    private int id;
    private int menuId;
    private int orderId;
    private int quantity;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
