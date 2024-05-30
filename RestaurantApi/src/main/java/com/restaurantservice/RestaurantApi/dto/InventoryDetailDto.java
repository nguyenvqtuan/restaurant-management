package com.restaurantservice.RestaurantApi.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryDetailDto {

	private int id;
	private String name;
	
	// 0: available, 1: using
	private boolean status;
	
	private int inventoryId;
	
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
