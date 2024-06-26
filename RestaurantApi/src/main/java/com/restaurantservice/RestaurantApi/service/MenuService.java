package com.restaurantservice.RestaurantApi.service;

import com.restaurantservice.RestaurantApi.dto.MenuDto;

import java.util.List;
import java.util.Optional;

public interface MenuService {
    List<MenuDto> findAll();

    Optional<MenuDto> findById(Integer id);

    Optional<MenuDto> findByName(String name);

    void store(MenuDto menuDto);

    void delete(Integer id);
}
