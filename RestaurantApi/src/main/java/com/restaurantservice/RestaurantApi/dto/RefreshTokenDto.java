package com.restaurantservice.RestaurantApi.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenDto {

	private int id;
	private int userId;
	private String token;
	private Instant expiryDate;
}
