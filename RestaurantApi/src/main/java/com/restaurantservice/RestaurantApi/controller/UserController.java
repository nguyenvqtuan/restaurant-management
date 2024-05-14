package com.restaurantservice.RestaurantApi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.restaurantservice.RestaurantApi.dto.UserDto;
import com.restaurantservice.RestaurantApi.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("")
	public ResponseEntity<?> findAll() {
		List<UserDto> users = userService.findAll();
		
		return ResponseEntity.status(HttpStatus.OK).body(users);
	}
	
	@PostMapping("")
	public ResponseEntity<?> updateUser(@RequestBody UserDto userDto) {
		userService.findByUserName(userDto.getUserName()).orElseThrow(() -> new RuntimeException("Username not found!"));
		userService.store(userDto);
		
		return ResponseEntity.status(HttpStatus.OK).body("Update success!");
	}
	
	@PutMapping("/{userName}")
	public ResponseEntity<?> updateRole(@PathVariable String userName, 
			@RequestParam String role) {
		userService.findByUserName(userName).orElseThrow(() -> new RuntimeException("Username not found!"));
		userService.updateRole(userName, role);
		
		return ResponseEntity.status(HttpStatus.OK).body("Update role success!");
	}
	
	@PutMapping("/{userName}/active")
	public ResponseEntity<?> activeUser(@PathVariable String userName, 
			@RequestParam boolean active) {
		userService.findByUserName(userName).orElseThrow(() -> new RuntimeException("Username not found!"));
		userService.activeUser(userName, active);
		
		return ResponseEntity.status(HttpStatus.OK).body("Active user success!");
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
		userService.findById(id).orElseThrow(() -> new RuntimeException("Username not found!"));
		userService.delete(id);
		
		return ResponseEntity.status(HttpStatus.OK).body("Delete user success!");

	}
}
