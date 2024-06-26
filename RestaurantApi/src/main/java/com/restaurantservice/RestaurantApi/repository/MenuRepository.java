package com.restaurantservice.RestaurantApi.repository;

import com.restaurantservice.RestaurantApi.entity.MenuEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MenuRepository extends JpaRepository<MenuEntity, Integer> {
    Optional<MenuEntity> findById(Integer id);

    Optional<MenuEntity> findByName(String name);
}
