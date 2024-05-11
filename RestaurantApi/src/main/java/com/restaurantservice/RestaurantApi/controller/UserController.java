package com.restaurantservice.RestaurantApi.controller;

import java.util.Optional;

import org.modelmapper.internal.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.restaurantservice.RestaurantApi.dto.JwtResponseDto;
import com.restaurantservice.RestaurantApi.dto.UserDto;
import com.restaurantservice.RestaurantApi.service.JwtService;
import com.restaurantservice.RestaurantApi.service.MailService;
import com.restaurantservice.RestaurantApi.service.UserService;
import com.restaurantservice.RestaurantApi.service.UtilityService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private MailService mailService;
	
	@Autowired
	private UtilityService utilityService;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> login(@RequestBody UserDto userDto) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(userDto.getUserName(), userDto.getPassword()));

		if (authentication.isAuthenticated()) {
			JwtResponseDto token = JwtResponseDto.builder().accessToken(jwtService.generateToken(userDto.getUserName()))
					.build();
			return ResponseEntity.ok().body(token);
		}
		return ResponseEntity.badRequest().body("Login failed!");
	}

	@PostMapping("/v1/sign-up")
	public ResponseEntity<?> store(@RequestBody UserDto userDto) {
		if (userService.findByUserName(userDto.getUserName()).isPresent()) {
			return ResponseEntity.badRequest().body("User name exists!");
		}
		userService.store(userDto);
		JwtResponseDto token = JwtResponseDto.builder().accessToken(jwtService.generateToken(userDto.getUserName()))
				.build();
		return ResponseEntity.status(HttpStatus.CREATED).body(token);
	}
	
	@GetMapping("/v1/reset-password")
	public ResponseEntity<?> resetPassword(@RequestParam("userName") String userName) {
		Optional<UserDto> user = userService.findByUserName(userName);
		if (!user.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body("User not exists!");
		}
		
		sendMailResetPassword(userName);
		return ResponseEntity.status(HttpStatus.OK).body("Password reset link had sent to your email. Please check your email!");
	}
	
	@GetMapping("/v1/verify-token")
	public ResponseEntity<?> verifyToken(@RequestParam("token") String token) {
		userService.findByPasswordResetToken(token).orElseThrow(() -> new RuntimeException("Token invalid!"));
		
		return ResponseEntity.status(HttpStatus.OK).body("Verify token success!");
	}
	
	@PostMapping("/v1/update-password")
	public ResponseEntity<?> updatePassword(@RequestBody UserDto userDto) {
		userService.findByPasswordResetToken(userDto.getPasswordResetToken()).orElseThrow(() -> new RuntimeException("Token invalid!"));
		
		userService.updatePasswordByToken(userDto);
		
		return ResponseEntity.status(HttpStatus.OK).body("Update password success!");
	}
	
	private void sendMailResetPassword(String userName) {
		String token = RandomString.make(30);
		userService.updatePasswordReset(userName, token);
		
		// Send mail
		mailService.sendMail(userName, "Reset password restaurant app!", getBodyMailResetPassword(userName, token));
	}
	
	private String getBodyMailResetPassword(String userName, String token) {
		StringBuilder res = new StringBuilder();
		res.append("Hi " + userName + " \r\n");
		res.append("This is email send from restaurant application!" + " \r\n");
		res.append("Below is link reset your password! \r\n" + " \r\n");
		
		res.append(utilityService.getFEPath() + "/reset-password?token=" + token  + " \r\n");
		res.append("Thanks and regards!");
		return res.toString();
	}
}
