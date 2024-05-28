package com.restaurantservice.RestaurantApi.entity;

import java.time.LocalDate;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="user")
@Getter
@Setter
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id; 

	@Column(name="user_name")
	private String userName;

	@Column(name="password")
	private String password;

	@Column(name="full_name")
	private String fullName;

	@Column(name="birth_date")
	private Date birthDate;

	@Column(name="role")
	private String role;

	@Column(name="enabled")
	private boolean enabled;

	@Column(name="password_reset_token")
	private String passwordResetToken;
	
	@CreationTimestamp
	@Column(updatable=false, name="created_at")
	private LocalDate createdAt;

	@UpdateTimestamp
	@Column(name="updated_at")
	private LocalDate updatedAt;
}
