package com.restaurantservice.RestaurantApi.advice;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.restaurantservice.RestaurantApi.dto.ErrorMessageDto;
import com.restaurantservice.RestaurantApi.exception.TokenException;
import com.restaurantservice.RestaurantApi.exception.TokenRefreshException;

@RestControllerAdvice
public class TokenControllerAdvice {

	@ExceptionHandler(value = TokenRefreshException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public ResponseEntity<?> handleTokenRefreshException(TokenRefreshException ex, WebRequest request) {
		ErrorMessageDto errorMessage =  ErrorMessageDto.builder()
				.statusCode(HttpStatus.BAD_REQUEST.value())
				.timestamp(new Date())
				.message(ex.getMessage())
				.description(request.getDescription(false))
				.build();
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorMessage);
	}
	
	@ExceptionHandler(value = TokenException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<?> handleTokenException(TokenException ex, WebRequest request) {
		ErrorMessageDto errorMessage =  ErrorMessageDto.builder()
				.statusCode(HttpStatus.BAD_REQUEST.value())
				.timestamp(new Date())
				.message(ex.getMessage())
				.description(request.getDescription(false))
				.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
	}
}
