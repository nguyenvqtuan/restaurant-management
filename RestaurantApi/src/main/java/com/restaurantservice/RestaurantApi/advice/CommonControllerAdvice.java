package com.restaurantservice.RestaurantApi.advice;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.restaurantservice.RestaurantApi.dto.ErrorMessageDto;
import com.restaurantservice.RestaurantApi.exception.IdException;

@RestControllerAdvice
public class CommonControllerAdvice {

	@ExceptionHandler(IdException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorMessageDto handleIdNotFoundException(IdException ex, WebRequest request) {
		return ErrorMessageDto.builder()
				.statusCode(HttpStatus.BAD_REQUEST.value())
				.timestamp(new Date())
				.message(ex.getMessage())
				.description(request.getDescription(false))
				.build();
	}
}