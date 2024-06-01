package com.restaurantservice.RestaurantApi.controller;

import com.restaurantservice.RestaurantApi.dto.MenuDto;
import com.restaurantservice.RestaurantApi.service.FirebaseImageService;
import com.restaurantservice.RestaurantApi.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/menu")
public class MenuController {
    @Autowired
    private FirebaseImageService firebaseService;

    @Autowired
    private MenuService menuService;

    @GetMapping()
    public ResponseEntity<?> findAll() {
        List<MenuDto> menus = menuService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(menus);
    }

    @PostMapping()
    public ResponseEntity<?> store(@RequestBody MenuDto menuDto) {
        menuService.store(menuDto);
        return ResponseEntity.status(HttpStatus.OK).body("Handle success!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        menuService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Delete success!");
    }

    @PostMapping("/upload-image")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        String fileName = firebaseService.upload(file);
        return  ResponseEntity.status(HttpStatus.OK).body(fileName);
    }

    @PostMapping("/delete-image")
    public ResponseEntity<?> delete(@RequestParam("fileName") String fileName) {
        firebaseService.delete(fileName);
        return ResponseEntity.status(HttpStatus.OK).body("Delete image!");
    }
}
