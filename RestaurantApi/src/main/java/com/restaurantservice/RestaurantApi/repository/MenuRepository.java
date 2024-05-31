package com.restaurantservice.RestaurantApi.repository;

import com.restaurantservice.RestaurantApi.entity.MenuEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface MenuRepository extends JpaRepository<MenuEntity, Integer> {

    Optional<MenuEntity> findById(Integer id);
    Optional<MenuEntity> findByName(String name);

    @Modifying
    @Query("UPDATE MenuEntity SET ordered = ?2 WHERE id = ?1")
    void updateOrderedById(Integer id, Integer ordered);
}
