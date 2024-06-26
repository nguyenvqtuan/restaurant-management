package com.restaurantservice.RestaurantApi.controller;

import org.modelmapper.internal.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.restaurantservice.RestaurantApi.dto.UserDto;
import com.restaurantservice.RestaurantApi.exception.TokenException;
import com.restaurantservice.RestaurantApi.exception.UserException;
import com.restaurantservice.RestaurantApi.service.MailService;
import com.restaurantservice.RestaurantApi.service.UserService;
import com.restaurantservice.RestaurantApi.service.UtilityService;

@Controller
public class ForgotPasswordController {

    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;

    @Autowired
    private UtilityService utilityService;

    @GetMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("userName") String userName) {
        return userService.findByUserName(userName).map((usr) -> {
            sendMailResetPassword(userName);
            return ResponseEntity.status(HttpStatus.OK).body("Password reset link had sent to your email. Please check your email!");
        }).orElseThrow(() -> new UserException(userName, " Not found!"));
    }

    @GetMapping("/verify-token")
    public ResponseEntity<?> verifyToken(@RequestParam("token") String token) {
        return userService.findByPasswordResetToken(token)
                .map(e -> {
                    return ResponseEntity.status(HttpStatus.OK).body("Verify token success!");
                })
                .orElseThrow(() -> new TokenException(token, "Token invalid!"));
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UserDto userDto) {
        String token = userDto.getPasswordResetToken();
        return userService.findByPasswordResetToken(token)
                .map(e -> {
                    return ResponseEntity.status(HttpStatus.OK).body("Verify token success!");
                })
                .orElseThrow(() -> new TokenException(token, "Update password success!"));
    }

    private void sendMailResetPassword(String userName) {
        String token = RandomString.make(30);
        userService.updatePasswordReset(userName, token);

        // Send mail
        mailService.sendMail(userName, "Reset password restaurant app!", getBodyMailResetPassword(userName, token));
    }

    private String getBodyMailResetPassword(String userName, String token) {
        StringBuilder res = new StringBuilder();
        res.append("Hi ").append(userName).append(" \r\n");
        res.append("This is email send from restaurant application!" + " \r\n");
        res.append("Below is link reset your password! \r\n" + " \r\n");

        res.append(utilityService.getFEPath()).append("/verify-token?token=").append(token).append(" \r\n");
        res.append("Thanks and regards!");
        return res.toString();
    }
}
