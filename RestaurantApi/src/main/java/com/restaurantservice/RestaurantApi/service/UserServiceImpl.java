package com.restaurantservice.RestaurantApi.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.restaurantservice.RestaurantApi.dto.UserDto;
import com.restaurantservice.RestaurantApi.entity.UserEntity;
import com.restaurantservice.RestaurantApi.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{

	private static final String ROLE_EMPLOYEE = "EMPLOYEE";
	private static final String ROLE_CHIEF = "CHIEF";
	private static final String ROLE_ADMIN = "ADMIN";
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private ModelMapper model;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public Optional<UserDto> findByUserName(String userName) {
		return userRepo.findByUserName(userName).map(e -> convert(e));
	}
	
	public Optional<UserDto> findByPasswordResetToken(String token) {
		return userRepo.findByPasswordResetToken(token).map(e -> convert(e));
	}
	
	@Override
	public void store(UserDto userDto) {
		UserEntity userEntity = convert(userDto);
		userRepo.save(userEntity);
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
	
	private UserDto convert(UserEntity userEntity) {
		return model.map(userEntity, UserDto.class);
	}
	
	private UserEntity convert(UserDto userDto) {
		UserEntity res = model.typeMap(UserDto.class, UserEntity.class)
		.addMappings(mapper -> {
			mapper.map(src -> ROLE_EMPLOYEE, UserEntity::setRole);
			mapper.map(src-> 1, UserEntity::setEnabled);
		})
		.map(userDto);
		res.setPassword(passwordEncoder.encode(userDto.getPassword()));
		return res;
	}
}
