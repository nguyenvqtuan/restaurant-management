package com.restaurantservice.RestaurantApi.dto;

import java.util.Date;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@Data
public class ErrorMessageDto {

    private int statusCode;
    private Date timestamp;
    private String message;
    private String description;
}
