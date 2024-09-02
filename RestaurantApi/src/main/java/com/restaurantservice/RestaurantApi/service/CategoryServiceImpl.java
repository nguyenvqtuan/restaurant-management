package com.restaurantservice.RestaurantApi.service;

import com.restaurantservice.RestaurantApi.dto.CategoryDto;
import com.restaurantservice.RestaurantApi.entity.CategoryEntity;
import com.restaurantservice.RestaurantApi.repository.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CategoryRepository categoryRepo;

    @Override
    public List<CategoryDto> findAll() {
        return categoryRepo.findAll().stream().map(this::convert).toList();
    }

    @Override
    public Optional<CategoryDto> findById(Integer id) {
        return categoryRepo.findById(id).map(this::convert);
    }

    @Override
    public void store(CategoryDto categoryDto) {
        var categoryEntity = convert(categoryDto);
        categoryRepo.save(categoryEntity);
    }

    @Override
    public void delete(Integer id) {
        categoryRepo.deleteById(id);
    }

    private CategoryDto convert(CategoryEntity categoryEntity) {
        return modelMapper.map(categoryEntity, CategoryDto.class);
    }

    private CategoryEntity convert(CategoryDto categoryDto) {
        return modelMapper.map(categoryDto, CategoryEntity.class);
    }
}
