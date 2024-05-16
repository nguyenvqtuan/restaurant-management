package com.restaurantservice.RestaurantApi.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurantservice.RestaurantApi.dto.InventoryTypeDto;
import com.restaurantservice.RestaurantApi.entity.InventoryTypeEntity;
import com.restaurantservice.RestaurantApi.repository.InventoryTypeRepository;

@Service
public class InventoryTypeServiceImpl implements InventoryTypeService{

	@Autowired
	private InventoryTypeRepository inventoryTypeRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public List<InventoryTypeDto> findAll() {
		List<InventoryTypeEntity> res = inventoryTypeRepo.findAll();
		return res.stream().map(e -> convert(e)).toList();
	}

	@Override
	public Optional<InventoryTypeDto> findById(int id) {
		Optional<InventoryTypeEntity> res = inventoryTypeRepo.findById(id);
		return res.map(e -> convert(e));
	}
	
	@Override
	public Optional<InventoryTypeDto> findByName(String name) {
		Optional<InventoryTypeEntity> res = inventoryTypeRepo.findByName(name);
		return res.map(e -> convert(e));
	}

	@Override
	public void store(InventoryTypeDto inventoryTypeDto) {
		InventoryTypeEntity res = convert(inventoryTypeDto);
		inventoryTypeRepo.save(res);
	}

	@Override
	public void delete(byte id) {
		inventoryTypeRepo.deleteById(id);
	}
	
	private InventoryTypeDto convert(InventoryTypeEntity input) {
		return modelMapper.map(input, InventoryTypeDto.class);
	}
	
	private InventoryTypeEntity convert(InventoryTypeDto input) {
		return modelMapper.map(input, InventoryTypeEntity.class);
	}
}
