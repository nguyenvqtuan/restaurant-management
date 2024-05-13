package com.restaurantservice.RestaurantApi.controller;

import java.util.Optional;

import org.modelmapper.internal.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.restaurantservice.RestaurantApi.dto.UserDto;
import com.restaurantservice.RestaurantApi.service.MailService;
import com.restaurantservice.RestaurantApi.service.UserService;
import com.restaurantservice.RestaurantApi.service.UtilityService;

@Controller
@RequestMapping("/v1")
public class ForgotPasswordController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private UtilityService utilityService;

	@GetMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestParam("userName") String userName) {
		Optional<UserDto> user = userService.findByUserName(userName);
		if (!user.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body("User not exists!");
		}
		
		sendMailResetPassword(userName);
		return ResponseEntity.status(HttpStatus.OK).body("Password reset link had sent to your email. Please check your email!");
	}
	
	@GetMapping("/verify-token")
	public ResponseEntity<?> verifyToken(@RequestParam("token") String token) {
		userService.findByPasswordResetToken(token).orElseThrow(() -> new RuntimeException("Token invalid!"));
		
		return ResponseEntity.status(HttpStatus.OK).body("Verify token success!");
	}
	
	@PostMapping("/update-password")
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
		
		res.append(utilityService.getFEPath() + "/verify-token?token=" + token  + " \r\n");
		res.append("Thanks and regards!");
		return res.toString();
	}
}
