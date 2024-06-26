package com.restaurantservice.RestaurantApi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class UtilityService {

    @Autowired
    private Environment env;

    public String getFEPath() {
        return env.getProperty("front-end.url");
    }
}
