package com.restaurantservice.RestaurantApi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.restaurantservice.RestaurantApi.entity.UserEntity;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<UserEntity, String> {

	Optional<UserEntity> findByUserName(String userName);
	Optional<UserEntity> findByPasswordResetToken(String token);
	
	@Modifying
	@Query("UPDATE UserEntity SET passwordResetToken = ?2 WHERE userName = ?1")
	void updatePasswordReset(String username, String token);
	
	@Modifying
	@Query("UPDATE UserEntity SET password = ?2 WHERE passwordResetToken = ?1")
	void updatePasswordByToken(String token, String password);
}
