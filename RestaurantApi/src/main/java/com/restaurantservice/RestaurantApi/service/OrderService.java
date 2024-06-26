package com.restaurantservice.RestaurantApi.service;

import com.restaurantservice.RestaurantApi.dto.OrderDto;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    List<OrderDto> findAll();

    Optional<OrderDto> findById(Integer id);

    Optional<OrderDto> findByName(String name);

    void store(OrderDto orderDto);

    void delete(Integer id);
}
