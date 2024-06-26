package com.restaurantservice.RestaurantApi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class IdException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public IdException(int id, String message) {
        super(String.format("Failed for [%d]: %s", id, message));
    }
}
