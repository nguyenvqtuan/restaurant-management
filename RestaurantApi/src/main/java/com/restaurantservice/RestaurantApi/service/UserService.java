package com.restaurantservice.RestaurantApi.service;

import java.util.Optional;

import com.restaurantservice.RestaurantApi.dto.UserDto;

public interface UserService {

	Optional<UserDto> findByUserName(String userName);
	void store(UserDto userDto);
}
