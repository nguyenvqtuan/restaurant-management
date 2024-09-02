package com.restaurantservice.RestaurantApi.controller;

import com.restaurantservice.RestaurantApi.dto.CategoryDto;
import com.restaurantservice.RestaurantApi.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping()
    public ResponseEntity<?> findAll() {
        List<CategoryDto> menus = categoryService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(menus);
    }

    @PostMapping()
    public ResponseEntity<?> store(@RequestBody CategoryDto categoryDto) {
        categoryService.store(categoryDto);
        return ResponseEntity.status(HttpStatus.OK).body("Handle success!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        categoryService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Delete success!");
    }
}
