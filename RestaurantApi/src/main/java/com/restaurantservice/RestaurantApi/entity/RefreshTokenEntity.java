package com.restaurantservice.RestaurantApi.entity;

import java.time.Instant;
import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="refresh_token")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenEntity {

	@Id
	@GeneratedValue
	private int id;

	@Column(name="user_id")
	private int userId;

	@Column(name="token")
	private String token;

	@Column(name="expiryDate")
	private Instant expiryDate;
	
	@CreationTimestamp
	@Column(updatable=false, name="created_at")
	private LocalDate createdAt;

	@UpdateTimestamp
	@Column(name="updated_at")
	private LocalDate updatedAt;
}
