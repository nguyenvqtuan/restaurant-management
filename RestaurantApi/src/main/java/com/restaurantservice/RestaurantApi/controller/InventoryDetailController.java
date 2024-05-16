package com.restaurantservice.RestaurantApi.controller;

import java.util.List;

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
import com.restaurantservice.RestaurantApi.dto.InventoryDetailDto;
import com.restaurantservice.RestaurantApi.exception.IdException;
import com.restaurantservice.RestaurantApi.service.InventoryDetailService;

@RestController
@RequestMapping("/inventory/{inventoryId}/inventory-detail")
public class InventoryDetailController {

	@Autowired
	private InventoryDetailService inventoryDetailService;
	
	@GetMapping("")
	public ResponseEntity<?> findByInventoryId(@PathVariable int inventoryId) {
		List<InventoryDetailDto> res = inventoryDetailService.findByInventoryId(inventoryId);
		
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable int id) {
		return inventoryDetailService.findById(id)
		.map(e -> {
			return ResponseEntity.status(HttpStatus.OK).body(e);
		}).orElseThrow(() -> new IdException(id, "Not found!"));
	}
	
	@PostMapping("")
	public ResponseEntity<?> store(@RequestBody InventoryDetailDto inventoryDetailDto) {
		inventoryDetailService.store(inventoryDetailDto);
		String title = inventoryDetailDto.getId() != 0 ? ControllerFiled.UPDATE : ControllerFiled.INSERT;
		
		return ResponseEntity.status(HttpStatus.OK).body(title + " success!");
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		inventoryDetailService.delete(id);
		return ResponseEntity.status(HttpStatus.OK).body("Delete success!");
	}
}
