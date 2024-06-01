package com.restaurantservice.RestaurantApi.controller;

import com.restaurantservice.RestaurantApi.dto.OrderDto;
import com.restaurantservice.RestaurantApi.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping()
    public ResponseEntity<?> findAll() {
        List<OrderDto> menus = orderService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(menus);
    }

    @PostMapping()
    public ResponseEntity<?> store(@RequestBody OrderDto OrderDto) {
        orderService.store(OrderDto);
        return ResponseEntity.status(HttpStatus.OK).body("Handle success!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        orderService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Delete success!");
    }
}
