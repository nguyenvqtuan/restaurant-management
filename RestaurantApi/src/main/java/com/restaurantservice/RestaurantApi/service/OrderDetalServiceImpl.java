package com.restaurantservice.RestaurantApi.service;

import com.restaurantservice.RestaurantApi.dto.OrderDetailDto;
import com.restaurantservice.RestaurantApi.entity.OrderDetailEntity;
import com.restaurantservice.RestaurantApi.repository.OrderDetailRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetalServiceImpl implements OrderDetailService{

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OrderDetailRepository orderDetailRepo;

    @Override
    public List<OrderDetailDto> findAll() {
        return orderDetailRepo.findAll().stream().map(this::convert).toList();
    }

    @Override
    public Optional<OrderDetailDto> findById(Integer id) {
        return orderDetailRepo.findById(id).map(this::convert);
    }

    @Override
    public Optional<OrderDetailDto> findByName(String name) {
        return orderDetailRepo.findByName(name).map(this::convert);
    }

    @Override
    public void store(OrderDetailDto orderDetailDto) {
        OrderDetailEntity orderDetailEntity = convert(orderDetailDto);
        orderDetailRepo.save(orderDetailEntity);
    }

    @Override
    public void delete(Integer id) {
        orderDetailRepo.deleteById(id);
    }

    private OrderDetailEntity convert(OrderDetailDto orderDetailDto) {
        return modelMapper.map(orderDetailDto, OrderDetailEntity.class);
    }

    private OrderDetailDto convert(OrderDetailEntity orderDetailEntity) {
        return modelMapper.map(orderDetailEntity, OrderDetailDto.class);
    }
}
