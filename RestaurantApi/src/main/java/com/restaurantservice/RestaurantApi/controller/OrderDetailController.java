package com.restaurantservice.RestaurantApi.controller;

import com.restaurantservice.RestaurantApi.dto.OrderDetailDto;
import com.restaurantservice.RestaurantApi.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order/{orderId}")
public class OrderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping()
    public ResponseEntity<?> findAll() {
        List<OrderDetailDto> menus = orderDetailService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(menus);
    }

    @PostMapping()
    public ResponseEntity<?> store(@RequestBody OrderDetailDto OrderDetailDto) {
        orderDetailService.store(OrderDetailDto);
        return ResponseEntity.status(HttpStatus.OK).body("Handle success!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        orderDetailService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Delete success!");
    }
}
