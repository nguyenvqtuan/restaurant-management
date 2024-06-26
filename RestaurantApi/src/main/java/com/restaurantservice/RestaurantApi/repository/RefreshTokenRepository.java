package com.restaurantservice.RestaurantApi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.restaurantservice.RestaurantApi.entity.RefreshTokenEntity;

import jakarta.transaction.Transactional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Integer> {

    Optional<RefreshTokenEntity> findByToken(String token);

    @Transactional
    @Modifying
    @Query("DELETE FROM RefreshTokenEntity WHERE userId = ?1")
    void deleteByUserId(int userId);
}
