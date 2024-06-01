package com.restaurantservice.RestaurantApi.repository;

import com.restaurantservice.RestaurantApi.entity.OrderDetailEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Integer> {
    Optional<OrderDetailEntity> findById(Integer id);
    Optional<OrderDetailEntity> findByName(String name);

    @Modifying
    @Query("DELETE FROM OrderDetailEntity WHERE inventoryId = ?1")
    void deleteByOrderId(Integer id);
}
