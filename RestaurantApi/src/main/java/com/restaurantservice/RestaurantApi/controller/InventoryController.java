package com.restaurantservice.RestaurantApi.controller;

import java.util.List;
import java.util.Optional;

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

import com.restaurantservice.RestaurantApi.config.ControllerFiled;
import com.restaurantservice.RestaurantApi.dto.InventoryDto;
import com.restaurantservice.RestaurantApi.service.InventoryService;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

	@Autowired
	private InventoryService inventoryService;
	
	@GetMapping("")
	public ResponseEntity<?> findAll() {
		List<InventoryDto> res = inventoryService.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		Optional<InventoryDto> res = inventoryService.findById(id);
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateStatus(@PathVariable Integer id, 
			@RequestParam("status") Byte status) {
		inventoryService.updateStatus(id, status);
		return ResponseEntity.status(HttpStatus.OK).body("Update success!");
	}
	
	@PostMapping("")
	public ResponseEntity<?> store(@RequestBody InventoryDto inventoryDto) {
		inventoryService.store(inventoryDto);
		String title = inventoryDto.getId() != 0 ? ControllerFiled.UPDATE : ControllerFiled.INSERT;
		return ResponseEntity.status(HttpStatus.CREATED).body(title + " success!");
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Integer id) {
		if (inventoryService.findById(id).isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id not found!");
		}
		inventoryService.delete(id);
		return ResponseEntity.status(HttpStatus.OK).body("Delete success!");
	}
	
}
