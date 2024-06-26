package com.restaurantservice.RestaurantApi.service;

import java.util.List;
import java.util.Optional;

import com.restaurantservice.RestaurantApi.dto.InventoryTypeDto;

public interface InventoryTypeService {

    List<InventoryTypeDto> findAll();

    Optional<InventoryTypeDto> findById(int id);

    Optional<InventoryTypeDto> findByName(String name);

    void store(InventoryTypeDto inventoryTypeDto);

    void delete(int id);
}
