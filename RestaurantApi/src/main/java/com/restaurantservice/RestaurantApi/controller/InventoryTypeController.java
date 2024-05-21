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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurantservice.RestaurantApi.config.ControllerFiled;
import com.restaurantservice.RestaurantApi.dto.InventoryTypeDto;
import com.restaurantservice.RestaurantApi.exception.IdException;
import com.restaurantservice.RestaurantApi.service.InventoryTypeService;

@RestController
@RequestMapping("/inventory-type")
public class InventoryTypeController {

	@Autowired
	private InventoryTypeService inventoryTypeService;
	
	@GetMapping()
	public ResponseEntity<?> findAll() {
		List<InventoryTypeDto> res = inventoryTypeService.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		Optional<InventoryTypeDto> res = inventoryTypeService.findById(id);
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	
	@PostMapping()
	public ResponseEntity<?> store(@RequestBody InventoryTypeDto inventoryTypeDto) {
		inventoryTypeService.store(inventoryTypeDto);
		String title = inventoryTypeDto.getId() != 0 ? ControllerFiled.UPDATE : ControllerFiled.INSERT;
		
		return ResponseEntity.status(HttpStatus.OK).body(title + " success!");
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		inventoryTypeService.findById(id).orElseThrow(() -> new IdException(id, "Not found!"));
		
		inventoryTypeService.delete(id);
		return ResponseEntity.status(HttpStatus.OK).body("Delete success!");
	}
}
