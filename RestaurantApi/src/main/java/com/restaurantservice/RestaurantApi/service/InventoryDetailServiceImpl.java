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
public class InventoryDetailServiceImpl implements InventoryDetailService {

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

        // When insert inventory-detail update quantity inventory
        if (inventoryDetailDto.getId() == 0) {
            updateQuantity(inventoryDetailDto.getInventoryId(), -1);
        }
    }

    @Override
    public void delete(Integer id) {
        int inventoryId = inventoryDetailRepo.findById(id).map(e -> e.getInventoryId()).orElse(1);
        inventoryDetailRepo.deleteById(id);

        updateQuantity(inventoryId, 1);
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

    private void updateQuantity(int inventoryId, int quantity) {
        int currentQuantity = inventoryRepo.findById(inventoryId).map(e -> e.getQuantity()).orElse(1);
        inventoryRepo.updateQuantity(inventoryId, currentQuantity - quantity);
    }
}
