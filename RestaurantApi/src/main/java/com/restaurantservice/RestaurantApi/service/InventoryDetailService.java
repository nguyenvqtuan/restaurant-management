package com.restaurantservice.RestaurantApi.service;

import java.util.List;
import java.util.Optional;

import com.restaurantservice.RestaurantApi.dto.InventoryDetailDto;

public interface InventoryDetailService {
	List<InventoryDetailDto> findByInventoryId(Integer inventoryId);
	Optional<InventoryDetailDto> findById(Integer id);
	Optional<InventoryDetailDto> findByNameAndInventoryId(String name, Integer inventoryId);

	void store(InventoryDetailDto inventoryDetailDto);
	void delete(Integer id);
	void deleteByInventoryId(Integer inventoryId);
}
