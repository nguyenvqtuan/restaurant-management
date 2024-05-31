package com.restaurantservice.RestaurantApi.advice;

import com.restaurantservice.RestaurantApi.dto.ErrorMessageDto;
import com.restaurantservice.RestaurantApi.exception.InventoryException;
import com.restaurantservice.RestaurantApi.exception.MenuException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@RestControllerAdvice
public class MenuControllerAdvice {

    @ExceptionHandler(InventoryException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<?> handleMenuNotFoundException(MenuException ex, WebRequest request) {
        ErrorMessageDto errorMessage =  ErrorMessageDto.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .timestamp(new Date())
                .message(ex.getMessage())
                .description(request.getDescription(false))
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }
}
