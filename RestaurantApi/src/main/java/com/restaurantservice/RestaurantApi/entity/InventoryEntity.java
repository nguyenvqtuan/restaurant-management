package com.restaurantservice.RestaurantApi.entity;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
	
	private String name;
	private long price;
	private int quantity;
	
	@CreationTimestamp
	private LocalDate createdAt;

	@UpdateTimestamp
	private LocalDate updatedAt;
}
