package com.restaurantservice.RestaurantApi.service;

import java.util.Optional;

import com.restaurantservice.RestaurantApi.dto.UserDto;

public interface UserService {

	Optional<UserDto> findByUserName(String userName);
	Optional<UserDto> findByPasswordResetToken(String token);
	
	void store(UserDto userDto);
	void updatePasswordReset(String userName, String token);
	void updatePasswordByToken(UserDto userDto);
}
