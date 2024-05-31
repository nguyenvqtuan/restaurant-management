package com.restaurantservice.RestaurantApi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MenuDto {

    private int id;
    private String name;
    private String image;
    private String description;
    private int price;
    private int quantity;
    private int ordered;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
