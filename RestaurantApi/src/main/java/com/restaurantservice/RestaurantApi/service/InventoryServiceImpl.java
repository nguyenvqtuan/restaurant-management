package com.restaurantservice.RestaurantApi.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurantservice.RestaurantApi.dto.InventoryDto;
import com.restaurantservice.RestaurantApi.entity.InventoryEntity;
import com.restaurantservice.RestaurantApi.repository.InventoryRepository;

@Service
public class InventoryServiceImpl implements InventoryService{

	@Autowired
	private InventoryRepository inventoryRepo;
	
	@Autowired
	private ModelMapper model;
	
	@Override
	public List<InventoryDto> findAll() {
		List<InventoryEntity> res = inventoryRepo.findAll();
		return res.stream().map(e -> convert(e)).toList();
	}

	@Override
	public Optional<InventoryDto> findById(Integer id) {
		Optional<InventoryEntity> res = inventoryRepo.findById(id);
		return res.map(e -> convert(e));
	}

	@Override
	public void store(InventoryDto inventoryDto) {
		InventoryEntity inventoryEntity = convert(inventoryDto);
		inventoryRepo.save(inventoryEntity);
	}

	@Override
	public void delete(Integer id) {
		inventoryRepo.deleteById(id);
	}

	@Override
	public void updateStatus(Integer id, Byte status) {
		inventoryRepo.updateStatus(id, status);
	}

	private InventoryDto convert(InventoryEntity input) {
		return model.map(input, InventoryDto.class);
	}
	
	private InventoryEntity convert(InventoryDto input) {
		return model.map(input, InventoryEntity.class);
	}
}
