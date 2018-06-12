package com.steflab.budgetmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BudgetmanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BudgetmanagerApplication.class, args);
	}
}
