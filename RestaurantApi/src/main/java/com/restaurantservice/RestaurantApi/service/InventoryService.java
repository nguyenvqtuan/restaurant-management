package com.restaurantservice.RestaurantApi.service;

import java.util.List;
import java.util.Optional;

import com.restaurantservice.RestaurantApi.dto.InventoryDto;

public interface InventoryService {

	List<InventoryDto> findAll();
	
	Optional<InventoryDto> findById(Integer id);
	Optional<InventoryDto> findByName(String name);
	
	void store(InventoryDto inventoryDto);
	void delete(Integer id);
}
