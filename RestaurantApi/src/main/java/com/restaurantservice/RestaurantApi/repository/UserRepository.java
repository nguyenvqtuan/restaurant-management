package com.restaurantservice.RestaurantApi.repository;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.restaurantservice.RestaurantApi.entity.UserEntity;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

	Optional<UserEntity> findByUserName(String userName);
	Optional<UserEntity> findByPasswordResetToken(String token);
	
	@Modifying
	@Query("UPDATE UserEntity SET fullName = ?2, birthDate = ?3 WHERE userName = ?1")
	void updateFullNameAndBirthDate(String username, String fullName, Date birthDate);
	
	@Modifying
	@Query("UPDATE UserEntity SET passwordResetToken = ?2 WHERE userName = ?1")
	void updatePasswordReset(String username, String token);
	
	@Modifying
	@Query("UPDATE UserEntity SET password = ?2 WHERE passwordResetToken = ?1")
	void updatePasswordByToken(String token, String password);

	@Modifying
	@Query("UPDATE UserEntity SET role = ?2 WHERE userName = ?1")
	void updateRole(String userName, String role);
	
	@Modifying
	@Query("UPDATE UserEntity SET enabled = ?2 WHERE userName = ?1")
	void activeUser(String userName, boolean enabled);
}
