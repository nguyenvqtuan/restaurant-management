package com.restaurantservice.RestaurantApi.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.restaurantservice.RestaurantApi.dto.UserDto;
import com.restaurantservice.RestaurantApi.entity.UserEntity;
import com.restaurantservice.RestaurantApi.enumeration.UserRoleEnum;
import com.restaurantservice.RestaurantApi.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ModelMapper model;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> findAll() {
        List<UserEntity> res = userRepo.findAll();
        return res.stream().map(e -> convert(e)).toList();
    }

    @Override
    public Optional<UserDto> findById(int id) {
        Optional<UserEntity> res = userRepo.findById(id);
        return res.map(e -> convert(e));
    }

    @Override
    public Optional<UserDto> findByUserName(String userName) {
        return userRepo.findByUserName(userName).map(e -> convert(e));
    }

    @Override
    public Optional<UserDto> findByPasswordResetToken(String token) {
        return userRepo.findByPasswordResetToken(token).map(e -> convert(e));
    }

    @Override
    public void store(UserDto userDto) {
        UserEntity userEntity = convert(userDto);
        userRepo.save(userEntity);
    }

    @Override
    public void updateFullNameAndBirthDate(UserDto userDto) {
        userRepo.updateFullNameAndBirthDate(userDto.getUserName(), userDto.getFullName(), userDto.getBirthDate());
    }

    @Override
    public void updatePasswordReset(String userName, String token) {
        userRepo.updatePasswordReset(userName, token);
    }

    @Override
    public void updatePasswordByToken(UserDto userDto) {
        String newPassword = passwordEncoder.encode(userDto.getPassword());
        userRepo.updatePasswordByToken(userDto.getPasswordResetToken(), newPassword);
    }

    @Override
    public void updateRole(String userName, String role) {
        userRepo.updateRole(userName, role);
    }

    @Override
    public void activeUser(String userName) {
        Optional<UserEntity> userEntity = userRepo.findByUserName(userName);
        userRepo.activeUser(userName, userEntity.get().isEnabled() ? false : true);
    }

    @Override
    public void delete(int id) {
        userRepo.deleteById(id);
    }

    private UserDto convert(UserEntity userEntity) {
        return model.map(userEntity, UserDto.class);
    }

    private UserEntity convert(UserDto userDto) {
        UserEntity res = model.typeMap(UserDto.class, UserEntity.class)
                .addMappings(mapper -> {
                    mapper.map(src -> UserRoleEnum.EMPLOYEE.getName(), UserEntity::setRole);
                    mapper.map(src -> 1, UserEntity::setEnabled);
                })
                .map(userDto);
        res.setPassword(passwordEncoder.encode(userDto.getPassword()));
        return res;
    }
}
