package com.restaurantservice.RestaurantApi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="menu")
@Getter
@Setter
public class MenuEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="file_name")
    private String fileName;

    @Column(name="description")
    private String description;

    @Column(name="quantity")
    private int quantity;

    @Column(name="ordered")
    private int ordered;

    @Column(name="category_id")
    private Integer categoryId;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
