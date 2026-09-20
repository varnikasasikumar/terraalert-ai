package com.terraalert.auth.config;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.terraalert.auth.model.Role;
import com.terraalert.auth.model.User;
import com.terraalert.auth.repository.UserRepository;

import org.springframework.beans.factory.annotation.Value;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            @Value("${admin.initial.password:admin123}") String initialPassword) {

        return args -> {

            if (userRepository.findByUsername("admin").isEmpty()) {

                User admin = new User();

                admin.setUsername("admin");
                admin.setEmail("admin@terraalert.com");
                admin.setPassword(
                        passwordEncoder.encode(initialPassword)
                );
                admin.setFullName("System Administrator");
                admin.setRole(Role.ADMIN);
                admin.setEnabled(true);
                admin.setCreatedAt(LocalDateTime.now());
                admin.setUpdatedAt(LocalDateTime.now());

                userRepository.save(admin);

                System.out.println(
                        ">>> TerraAlert ADMIN account created <<<"
                );
            }
        };
    }
}