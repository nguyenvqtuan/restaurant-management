package com.restaurantservice.RestaurantApi.entity;

import java.time.LocalDate;

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
@Table(name="inventory")
@Getter
@Setter
public class InventoryEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name="name")
	private String name;

	@Column(name="price")
	private long price;

	@Column(name="quantity")
	private int quantity;

	@Column(name="inventory_type")
	private int inventoryType;

	@CreationTimestamp
	@Column(updatable=false, name="created_at")
	private LocalDate createdAt;

	@UpdateTimestamp
	@Column(name="updated_at")
	private LocalDate updatedAt;
}
