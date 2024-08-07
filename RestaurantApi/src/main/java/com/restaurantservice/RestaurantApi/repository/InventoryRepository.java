package com.restaurantservice.RestaurantApi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.restaurantservice.RestaurantApi.entity.InventoryEntity;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface InventoryRepository extends JpaRepository<InventoryEntity, Integer> {

    Optional<InventoryEntity> findById(Integer id);

    Optional<InventoryEntity> findByName(String name);

    @Modifying
    @Query("UPDATE InventoryEntity SET quantity = ?2 WHERE id = ?1")
    void updateQuantity(Integer id, Integer quantity);

}
