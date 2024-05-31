package com.restaurantservice.RestaurantApi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MenuException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public MenuException(String title, String message) {
        super(String.format("Failed for [%s]: %s", title, message));
    }
}
