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
public class OrderDto {
    private int id;
    private String name;
    private int userId;
    private int inventoryId;
    private long total;
    private String paymentMethod;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
