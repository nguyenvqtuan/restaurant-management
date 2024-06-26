package com.restaurantservice.RestaurantApi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.restaurantservice.RestaurantApi.entity.UserEntity;
import com.restaurantservice.RestaurantApi.repository.UserRepository;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepo.findByUserName(username)
            .orElseThrow(() -> new UsernameNotFoundException("Could not find user"));

        return new CustomUserDetails(user);
    }
}
