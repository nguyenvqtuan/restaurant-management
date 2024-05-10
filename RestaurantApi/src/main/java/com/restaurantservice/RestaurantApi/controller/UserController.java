package com.restaurantservice.RestaurantApi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurantservice.RestaurantApi.dto.UserDto;
import com.restaurantservice.RestaurantApi.service.UserService;

@RestController
@RequestMapping("/v1")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping("/sign-up")
	public ResponseEntity<?> store(@RequestBody UserDto userDto) {
		userService.store(userDto);
		return ResponseEntity.status(HttpStatus.CREATED).body("Create user success!");
	}
}
