package com.restaurantservice.RestaurantApi.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="inventory-type")
@Getter
@Setter
public class InventoryTypeEntity {

	@Id
	@GeneratedValue
	private int id;

	@Column(name="name")
	private String name;
	
	@CreationTimestamp
	@Column(updatable = false, name="created_at")
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	@Column(name="updated_at")
	private LocalDateTime updatedAt;
}
