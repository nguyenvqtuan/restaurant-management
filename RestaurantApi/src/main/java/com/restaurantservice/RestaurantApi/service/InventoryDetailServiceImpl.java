package com.restaurantservice.RestaurantApi.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurantservice.RestaurantApi.dto.InventoryDetailDto;
import com.restaurantservice.RestaurantApi.entity.InventoryDetailEntity;
import com.restaurantservice.RestaurantApi.repository.InventoryDetailRepository;
import com.restaurantservice.RestaurantApi.repository.InventoryRepository;

@Service
public class InventoryDetailServiceImpl implements InventoryDetailService{

	@Autowired
	private InventoryDetailRepository inventoryDetailRepo;
	
	@Autowired
	private InventoryRepository inventoryRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Optional<InventoryDetailDto> findById(Integer id) {
		return inventoryDetailRepo.findById(id).map(e -> convert(e));
	}

	@Override
	public List<InventoryDetailDto> findByInventoryId(Integer inventoryId) {
		List<InventoryDetailEntity> res = inventoryDetailRepo.findByInventoryId(inventoryId);
		return res.stream().map(e -> convert(e)).toList();
	}

	@Override
	public void store(InventoryDetailDto inventoryDetailDto) {
		InventoryDetailEntity res = convert(inventoryDetailDto);
		inventoryDetailRepo.save(res);
	}

	@Override
	public void delete(Integer id) {
		inventoryDetailRepo.deleteById(id);
	}
	
	@Override
	public void deleteOrderByCreatedAt(int inventoryId, int removeQuantity) {
		inventoryDetailRepo.deleteOrderCreatedAt(inventoryId, removeQuantity);
	}
	
	@Override
	public void deleteByInventoryId(Integer inventoryId) {
		inventoryDetailRepo.deleteByInventoryId(inventoryId);
	}
	
	private InventoryDetailEntity convert(InventoryDetailDto inventoryDetailDto) {
		return modelMapper.map(inventoryDetailDto, InventoryDetailEntity.class);
	}
	
	private InventoryDetailDto convert(InventoryDetailEntity inventoryDetailEntity) {
		return modelMapper.map(inventoryDetailEntity, InventoryDetailDto.class);
	}
}
