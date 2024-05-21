package com.restaurantservice.RestaurantApi.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurantservice.RestaurantApi.dto.RefreshTokenDto;
import com.restaurantservice.RestaurantApi.entity.RefreshTokenEntity;
import com.restaurantservice.RestaurantApi.exception.TokenRefreshException;
import com.restaurantservice.RestaurantApi.repository.RefreshTokenRepository;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

	@Autowired
	private RefreshTokenRepository refreshTokenRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Optional<RefreshTokenDto> findByToken(String token) {
		Optional<RefreshTokenEntity> res = refreshTokenRepo.findByToken(token);
		return res.map(e -> convert(e));
	}

	@Override
	public RefreshTokenDto verifyExpiration(RefreshTokenDto token) {
		if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
			refreshTokenRepo.delete(convert(token));
			throw new TokenRefreshException(token.getToken(),
					"Refresh token was expired. Please make a new signin request");
		}
		return token;
	}

	@Override
	public RefreshTokenDto createRefreshToken(int userId) {
		RefreshTokenDto refreshToken = new RefreshTokenDto();

	    refreshToken.setUserId(userId);
	    refreshToken.setExpiryDate(Instant.now().plusMillis(System.currentTimeMillis()+1000*60*3));
	    refreshToken.setToken(UUID.randomUUID().toString());

	    RefreshTokenEntity res = refreshTokenRepo.save(convert(refreshToken));
	    return convert(res);
	}

	@Override
	public void deleteByUserId(int userId) {
		refreshTokenRepo.deleteByUserId(userId);
	}

	private RefreshTokenEntity convert(RefreshTokenDto input) {
		return modelMapper.map(input, RefreshTokenEntity.class);
	}

	private RefreshTokenDto convert(RefreshTokenEntity input) {
		return modelMapper.map(input, RefreshTokenDto.class);
	}
}
