package com.restaurantservice.RestaurantApi.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
	private int id; 
	
	private String userName;
	private String password;
	private String fullName;
	private LocalDate birthDate;
	
	private String role;
	private boolean enabled;
	
	private String passwordResetToken;
	
	private LocalDate createdAt;

	private LocalDate updatedAt;
}
