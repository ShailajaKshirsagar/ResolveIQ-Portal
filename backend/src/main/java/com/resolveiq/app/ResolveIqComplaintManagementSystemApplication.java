package com.resolveiq.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ResolveIqComplaintManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResolveIqComplaintManagementSystemApplication.class, args);
	}
}
