package com.restaurantservice.RestaurantApi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="order")
@Getter
@Setter
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="user_id")
    private int userId;

    @Column(name="inventory_id")
    private int inventoryId;

    @Column(name="total")
    private long total;

    // CASH - CREDIT-CARD
    @Column(name="payment_method")
    private String paymentMethod;

    @Column(updatable = false, name="created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
