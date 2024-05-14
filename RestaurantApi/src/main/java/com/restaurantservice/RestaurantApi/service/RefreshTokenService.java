package com.restaurantservice.RestaurantApi.service;

import java.util.Optional;

import com.restaurantservice.RestaurantApi.dto.RefreshTokenDto;

public interface RefreshTokenService {
	Optional<RefreshTokenDto> findByToken(String token);
	
	RefreshTokenDto verifyExpiration(RefreshTokenDto token);
	RefreshTokenDto createRefreshToken(int userId);
	void deleteByUserId(int userId);
}
