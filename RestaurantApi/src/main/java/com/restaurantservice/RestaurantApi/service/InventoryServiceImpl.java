package com.restaurantservice.RestaurantApi.service;

import java.util.List;
import java.util.Optional;

import com.restaurantservice.RestaurantApi.entity.InventoryTypeEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurantservice.RestaurantApi.dto.InventoryDto;
import com.restaurantservice.RestaurantApi.entity.InventoryDetailEntity;
import com.restaurantservice.RestaurantApi.entity.InventoryEntity;
import com.restaurantservice.RestaurantApi.repository.InventoryDetailRepository;
import com.restaurantservice.RestaurantApi.repository.InventoryRepository;
import com.restaurantservice.RestaurantApi.repository.InventoryTypeRepository;

@Service
public class InventoryServiceImpl implements InventoryService{

	@Autowired
	private InventoryRepository inventoryRepo;
	
	@Autowired
	private InventoryDetailRepository inventoryDetailRepo;
	
	@Autowired
	private InventoryTypeRepository inventoryTypeRepo;
	
	@Autowired
	private ModelMapper model;
	
	@Override
	public List<InventoryDto> findAll() {
		List<InventoryEntity> res = inventoryRepo.findAll();
		return res.stream().map(this::convert).toList();
	}

	@Override
	public Optional<InventoryDto> findById(Integer id) {
		Optional<InventoryEntity> res = inventoryRepo.findById(id);
		return res.map(this::convert);
	}
	
	@Override
	public Optional<InventoryDto> findByName(String name) {
		Optional<InventoryEntity> res = inventoryRepo.findByName(name);
		return res.map(this::convert);
	}

	@Override
	public void store(InventoryDto inventoryDto) {
		InventoryEntity inventoryEntity = convert(inventoryDto);
		int prevQuatity = inventoryRepo.findById(inventoryDto.getId()).map(InventoryEntity::getQuantity).orElse(0);
		
		InventoryEntity res = inventoryRepo.save(inventoryEntity);
		
		// Store inventory-detail follow quantity
		storeInventoryDetail(res, prevQuatity);
	}

	@Override
	public void delete(Integer id) {
		inventoryRepo.deleteById(id);
		
		inventoryDetailRepo.deleteByInventoryId(id);
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
		int inventoryType = inventoryTypeRepo.findByName(inventoryEntity.getName()).map(InventoryTypeEntity::getId).orElse(1);

		int inventoryId = inventoryEntity.getId();
		
		for (int i = 0; i < inventoryEntity.getQuantity() - prevQuantity; ++i) {
			String name = inventoryEntity.getName() + " " + (i + 1);
			
			InventoryDetailEntity inventoryDetailEntity = buildInventoryDetailEntity(inventoryId, name);
			inventoryDetailRepo.save(inventoryDetailEntity);
		}
	}
	
	private InventoryDetailEntity buildInventoryDetailEntity(int inventoryId, String name) {
		InventoryDetailEntity res = new InventoryDetailEntity();
		res.setInventoryId(inventoryId);
		res.setName(name);
		res.setStatus(false);
		return res;
	}
	
	private void deleteInventoryDetail(int inventoryId, int removeQuantity) {
		inventoryDetailRepo.deleteOrderByCreatedAt(inventoryId, removeQuantity);
	}
}
