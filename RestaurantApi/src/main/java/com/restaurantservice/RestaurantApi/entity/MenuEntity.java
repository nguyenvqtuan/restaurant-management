package com.restaurantservice.RestaurantApi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name="menu")
public class MenuEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="image")
    private String image;

    @Column(name="description")
    private String description;

    @Column(name="price")
    private int price;

    // Check can order
    @Column(name="quantity")
    private int quantity;

    // Check can order (ordered + current order >= quantity -> can't order)
    @Column(name="ordered")
    private int ordered;

    @CreationTimestamp
    @Column(updatable=false, name="created_at")
    private LocalDate createdAt;

    @UpdateTimestamp
    @Column(name="updated_at")
    private LocalDate updatedAt;
}
