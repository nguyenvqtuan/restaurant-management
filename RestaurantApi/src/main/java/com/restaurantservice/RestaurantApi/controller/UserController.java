package com.restaurantservice.RestaurantApi.controller;

import java.util.Arrays;
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
import com.restaurantservice.RestaurantApi.enumeration.UserRoleEnum;
import com.restaurantservice.RestaurantApi.exception.IdException;
import com.restaurantservice.RestaurantApi.exception.UserException;
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
		userService.findByUserName(userDto.getUserName())
		.orElseThrow(() -> new UserException(userDto.getUserName(), "Not found!"));
		
		userService.updateFullNameAndBirthDate(userDto);
		return ResponseEntity.status(HttpStatus.OK).body("Update success!");
	}
	
	@PutMapping("/update-role")
	public ResponseEntity<?> updateRole(@RequestParam String userName, 
			@RequestParam String role) {
		userService.findByUserName(userName).orElseThrow(() -> new UserException(userName, "Not found!"));
		userService.updateRole(userName, role);
		
		return ResponseEntity.status(HttpStatus.OK).body("Update role success!");
	}
	
	@GetMapping("/list-role")
	public ResponseEntity<?> listRole() {
		return ResponseEntity.status(HttpStatus.OK).body(Arrays.asList(UserRoleEnum.values()));
	}
	
	@PutMapping("/{userName}/active")
	public ResponseEntity<?> activeUser(@PathVariable String userName) {
		userService.findByUserName(userName).orElseThrow(() -> new UserException(userName, "Not found!"));
		userService.activeUser(userName);
		
		return ResponseEntity.status(HttpStatus.OK).body("Active user success!");
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
		userService.findById(id).orElseThrow(() -> new IdException(id, "Not found!"));
		userService.delete(id);
		
		return ResponseEntity.status(HttpStatus.OK).body("Delete user success!");

	}
}
