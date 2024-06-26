package com.restaurantservice.RestaurantApi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.restaurantservice.RestaurantApi.entity.InventoryDetailEntity;

import jakarta.transaction.Transactional;

@Repository
public interface InventoryDetailRepository extends JpaRepository<InventoryDetailEntity, Integer> {

    Optional<InventoryDetailEntity> findById(Integer id);

    List<InventoryDetailEntity> findByInventoryId(Integer inventoryId);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM inventory_detail WHERE inventory_id = ?1 ORDER BY created_at DESC LIMIT ?2")
    void deleteOrderByCreatedAt(int inventoryId, int removeQuantity);

    @Transactional
    @Modifying
    @Query("DELETE FROM InventoryDetailEntity WHERE inventoryId = ?1")
    void deleteByInventoryId(int inventoryId);
}
