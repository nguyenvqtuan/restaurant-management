package com.restaurantservice.RestaurantApi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurantservice.RestaurantApi.entity.InventoryTypeEntity;

@Repository
public interface InventoryTypeRepository extends JpaRepository<InventoryTypeEntity, Integer>{

	Optional<InventoryTypeEntity> findById(int id);
	Optional<InventoryTypeEntity> findByName(String name);
	List<InventoryTypeEntity> findAll();
}
