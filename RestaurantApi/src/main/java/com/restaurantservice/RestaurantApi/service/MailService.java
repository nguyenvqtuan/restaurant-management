package com.restaurantservice.RestaurantApi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MailService {
	private Environment env;

	@Autowired
	private MailSender mailSender;
	
	@Autowired
	public MailService(Environment env) {
		this.env = env;
	}
	
	public void sendMail(String emailAddress, String title, String body) {
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setFrom(env.getProperty("spring.mail.username"));
		message.setTo(emailAddress);
		message.setSubject(title);
		message.setText(body);
		
		mailSender.send(message);
	}
}
