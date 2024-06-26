package com.restaurantservice.RestaurantApi.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryDto {

    private int id;

    private String name;
    private long price;
    private int quantity;

    private LocalDate createdAt;
    private LocalDate updatedAt;
}
