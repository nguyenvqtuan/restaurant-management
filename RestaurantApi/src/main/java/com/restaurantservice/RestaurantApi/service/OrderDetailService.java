package com.restaurantservice.RestaurantApi.service;

import com.restaurantservice.RestaurantApi.dto.OrderDetailDto;

import java.util.List;
import java.util.Optional;

public interface OrderDetailService {
    List<OrderDetailDto> findAll();

    Optional<OrderDetailDto> findById(Integer id);

    void store(OrderDetailDto OrderDetailDto);

    void delete(Integer id);
}
