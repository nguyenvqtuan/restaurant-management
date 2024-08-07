package com.restaurantservice.RestaurantApi.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.restaurantservice.RestaurantApi.dto.JwtResponseDto;
import com.restaurantservice.RestaurantApi.dto.RefreshTokenDto;
import com.restaurantservice.RestaurantApi.dto.TokenRefreshResponseDto;
import com.restaurantservice.RestaurantApi.dto.UserDto;
import com.restaurantservice.RestaurantApi.exception.TokenRefreshException;
import com.restaurantservice.RestaurantApi.exception.UserException;
import com.restaurantservice.RestaurantApi.service.JwtService;
import com.restaurantservice.RestaurantApi.service.RefreshTokenService;
import com.restaurantservice.RestaurantApi.service.UserService;

@RestController
public class LoginController {

    private final String URI_LOGIN = "/login";
    private final String URI_SIGNUP = "/sign-up";
    private final String URI_REFRESH_TOKEN = "/refresh-token";

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * @param userDto
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(userDto.getUserName(), userDto.getPassword()));

        if (authentication.isAuthenticated()) {
            JwtResponseDto token = buildJwt(userDto.getUserName());
            return ResponseEntity.ok().body(token);
        }
        return ResponseEntity.badRequest().body("Login failed!");
    }

    /**
     * @param userDto
     * @return
     */
    @PostMapping("/sign-up")
    public ResponseEntity<?> store(@RequestBody UserDto userDto) {
        Optional<UserDto> res = userService.findByUserName(userDto.getUserName());

        if (res.isPresent()) throw new UserException(userDto.getUserName(), "existed!");
        userService.store(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Sign up success!");
    }

    /**
     * @param refreshTokenDto
     * @return
     */
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenDto refreshTokenDto) {
        String requestRefreshToken = refreshTokenDto.getToken();

        return refreshTokenService.findByToken(requestRefreshToken).map(refreshTokenService::verifyExpiration)
                .map(refreshToken -> {
                    String token = jwtService.generateToken(userService.findById(refreshToken.getId()).get().getUserName());
                    return ResponseEntity.ok(new TokenRefreshResponseDto(token, requestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken, "Refresh token is not in database!"));

    }

    private JwtResponseDto buildJwt(String userName) {
        JwtResponseDto jwtResponse = new JwtResponseDto();
        jwtResponse.setToken(jwtService.generateToken(userName));
        jwtResponse.setUserName(userName);

        RefreshTokenDto refreshToken = buildRefreshToken(userName);
        jwtResponse.setRefreshToken(refreshToken.getToken());
        return jwtResponse;
    }

    private RefreshTokenDto buildRefreshToken(String userName) {
        int userId = userService.findByUserName(userName).get().getId();
        return refreshTokenService.createRefreshToken(userId);
    }
}
