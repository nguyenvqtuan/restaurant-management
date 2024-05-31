package com.restaurantservice.RestaurantApi.controller;

import com.restaurantservice.RestaurantApi.config.ControllerFiled;
import com.restaurantservice.RestaurantApi.dto.MenuDto;
import com.restaurantservice.RestaurantApi.exception.IdException;
import com.restaurantservice.RestaurantApi.exception.MenuException;
import com.restaurantservice.RestaurantApi.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping()
    public ResponseEntity<?> findAll() {
        List<MenuDto> res = menuService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        Optional<MenuDto> res = menuService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping()
    public ResponseEntity<?> store(@RequestBody MenuDto menuDto) {
        Optional<MenuDto> isExistsMenu = menuService.findByName(menuDto.getName());
        if (isExistsMenu.isPresent()) throw new MenuException(menuDto.getName(),"is exists!");

        menuService.store(menuDto);
        String title = menuDto.getId() != 0 ? ControllerFiled.UPDATE : ControllerFiled.INSERT;

        return ResponseEntity.status(HttpStatus.OK).body(title + " success!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        menuService.findById(id).orElseThrow(() -> new IdException(id, "Not found!"));

        menuService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Delete success!");
    }
}
