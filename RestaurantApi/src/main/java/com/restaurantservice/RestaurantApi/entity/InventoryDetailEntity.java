package com.restaurantservice.RestaurantApi.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "inventory_detail")
@Getter
@Setter
public class InventoryDetailEntity {

    @Id
    @GeneratedValue
    private int id;
    private String name;

    // 0: char, 1: table
    private int type;

    // 0: available, 1: using
    private boolean status;

    private int inventoryId;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
