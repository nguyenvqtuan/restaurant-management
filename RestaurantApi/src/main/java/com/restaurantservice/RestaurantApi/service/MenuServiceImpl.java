package com.restaurantservice.RestaurantApi.service;

import com.restaurantservice.RestaurantApi.dto.MenuDto;
import com.restaurantservice.RestaurantApi.entity.MenuEntity;
import com.restaurantservice.RestaurantApi.repository.MenuRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuRepository menuRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<MenuDto> findAll() {
        return menuRepo.findAll().stream().map(this::convert).toList();
    }

    @Override
    public Optional<MenuDto> findById(Integer id) {
        return menuRepo.findById(id).map(this::convert);
    }

    @Override
    public Optional<MenuDto> findByName(String name) {
        return menuRepo.findByName(name).map(this::convert);
    }

    @Override
    public void store(MenuDto menuDto) {

        // When insert
        if (menuDto.getId() == 0) {
            // Ordered always == quantity
            menuDto.setOrdered(menuDto.getQuantity());
        }

        menuRepo.save(convert(menuDto));
    }

    @Override
    public void delete(Integer id) {

    }

    private MenuEntity convert(MenuDto menuDto) {
        return modelMapper.map(menuDto, MenuEntity.class);
    }

    private MenuDto convert(MenuEntity menuEntity) {
        return modelMapper.map(menuEntity, MenuDto.class);
    }
}
