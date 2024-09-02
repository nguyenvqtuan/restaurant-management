package com.restaurantservice.RestaurantApi.service;

import com.restaurantservice.RestaurantApi.dto.CategoryDto;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<CategoryDto> findAll();

    Optional<CategoryDto> findById(Integer id);

    void store(CategoryDto categoryDto);

    void delete(Integer id);
}
