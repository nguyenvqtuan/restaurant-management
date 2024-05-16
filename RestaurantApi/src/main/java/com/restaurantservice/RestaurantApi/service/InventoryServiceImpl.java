package com.restaurantservice.RestaurantApi.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurantservice.RestaurantApi.dto.InventoryDetailDto;
import com.restaurantservice.RestaurantApi.dto.InventoryDto;
import com.restaurantservice.RestaurantApi.entity.InventoryEntity;
import com.restaurantservice.RestaurantApi.repository.InventoryRepository;

@Service
public class InventoryServiceImpl implements InventoryService{

	@Autowired
	private InventoryRepository inventoryRepo;
	
	@Autowired
	private InventoryDetailService inventoryDetailService;
	
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
	public Optional<InventoryDto> findByName(String name) {
		Optional<InventoryEntity> res = inventoryRepo.findByName(name);
		return res.map(e -> convert(e));
	}

	@Override
	public void store(InventoryDto inventoryDto) {
		InventoryEntity inventoryEntity = convert(inventoryDto);
		int prevQuatity = inventoryRepo.findById(inventoryDto.getId()).map(e -> e.getQuantity()).orElse(0);
		
		InventoryEntity res = inventoryRepo.save(inventoryEntity);
		
		// Store inventory-detail follow quantity
		storeInventoryDetail(res, prevQuatity);
	}

	@Override
	public void delete(Integer id) {
		inventoryRepo.deleteById(id);
		
		inventoryDetailService.deleteByInventoryId(id);
	}
	
	@Override
	public void updateQuantity(int id, int quantity) {
		int currentQuantity = inventoryRepo.findById(id).map(e -> e.getQuantity()).orElse(1);
		inventoryRepo.updateQuantity(id, currentQuantity - quantity);
	}

	private InventoryDto convert(InventoryEntity input) {
		return model.map(input, InventoryDto.class);
	}
	
	private InventoryEntity convert(InventoryDto input) {
		return model.map(input, InventoryEntity.class);
	}
	
	private void storeInventoryDetail(InventoryEntity inventoryEntity, int prevQuantity) {
		int quantity = inventoryEntity.getQuantity();
		if (quantity >= prevQuantity) {
			// Adding new inventory detail
			newInventoryDetail(inventoryEntity, prevQuantity);
		} else {
			// Delete inventory detail
			int removeQuantity = prevQuantity - quantity;
			deleteInventoryDetail(inventoryEntity.getId(), removeQuantity);
		}
	}
	
	private void newInventoryDetail(InventoryEntity inventoryEntity, int prevQuantity) {
		byte inventoryType = 1;
//		res.setType(inventoryDetailService.getType(inventoryEntity.getName()));
		int inventoryId = inventoryEntity.getId();
		
		for (int i = 0; i < inventoryEntity.getQuantity() - prevQuantity; ++i) {
			String name = inventoryEntity.getName() + " " + (i + 1);
			
			InventoryDetailDto inventoryDetailDto = buildInventoryDetailDto(inventoryId, inventoryType, name);
			inventoryDetailService.store(inventoryDetailDto);
		}
	}
	
	private InventoryDetailDto buildInventoryDetailDto(int inventoryId, byte inventoryType, String name) {
		InventoryDetailDto res = new InventoryDetailDto();
		res.setInventoryId(inventoryId);
		res.setName(name);
		res.setType(inventoryType);
		res.setStatus(false);
		return res;
	}
	
	private void deleteInventoryDetail(int inventoryId, int removeQuantity) {
		inventoryDetailService.deleteOrderByCreatedAt(inventoryId, removeQuantity);
	}
}
