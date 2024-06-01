package com.restaurantservice.RestaurantApi.service;

import com.restaurantservice.RestaurantApi.dto.OrderDto;
import com.restaurantservice.RestaurantApi.entity.OrderEntity;
import com.restaurantservice.RestaurantApi.repository.OrderDetailRepository;
import com.restaurantservice.RestaurantApi.repository.OrderRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderDetailRepository orderDetailRepo;

    @Override
    public List<OrderDto> findAll() {
        return orderRepo.findAll().stream().map(this::convert).toList();
    }

    @Override
    public Optional<OrderDto> findById(Integer id) {
        return orderRepo.findById(id).map(this::convert);
    }

    @Override
    public Optional<OrderDto> findByName(String name) {
        return orderRepo.findByName(name).map(this::convert);
    }

    @Override
    public void store(OrderDto orderDto) {
        OrderEntity orderEntity = convert(orderDto);
        orderRepo.save(orderEntity);

        // Save order-detail by orderId
        // TODO
    }

    @Override
    public void delete(Integer id) {
        orderRepo.deleteById(id);

        // Remove order-detail by orderId
        orderDetailRepo.deleteByOrderId(id);
    }

    private OrderDto convert(OrderEntity orderEntity) {
        return modelMapper.map(orderEntity, OrderDto.class);
    }

    private OrderEntity convert(OrderDto orderDto) {
        return modelMapper.map(orderDto, OrderEntity.class);
    }
}
