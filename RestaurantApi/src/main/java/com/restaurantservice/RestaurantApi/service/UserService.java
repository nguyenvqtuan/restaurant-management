package com.restaurantservice.RestaurantApi.service;

import java.util.List;
import java.util.Optional;

import com.restaurantservice.RestaurantApi.dto.UserDto;

public interface UserService {

    Optional<UserDto> findByUserName(String userName);

    Optional<UserDto> findByPasswordResetToken(String token);

    Optional<UserDto> findById(int id);

    List<UserDto> findAll();

    void store(UserDto userDto);

    void updatePasswordReset(String userName, String token);

    void updatePasswordByToken(UserDto userDto);

    void updateRole(String userName, String role);

    void updateFullNameAndBirthDate(UserDto userDto);

    void activeUser(String userName);

    void delete(int id);
}
