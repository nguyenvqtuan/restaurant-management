package com.restaurantservice.RestaurantApi.repository;

import com.restaurantservice.RestaurantApi.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
    Optional<OrderEntity> findById(Integer id);

    Optional<OrderEntity> findByName(String name);
}
