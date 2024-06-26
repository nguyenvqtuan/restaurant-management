package com.restaurantservice.RestaurantApi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
