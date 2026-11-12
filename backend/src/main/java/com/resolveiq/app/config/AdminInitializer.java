//package com.resolveiq.app.config;
//
//import com.resolveiq.app.entity.User;
//import com.resolveiq.app.enums.Role;
//import com.resolveiq.app.repository.UserRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//import java.time.LocalDateTime;
//
//@Configuration
//public class AdminInitializer {
//
//    @Bean
//    CommandLineRunner createAdmin(UserRepository userRepository,
//                                  BCryptPasswordEncoder passwordEncoder) {
//        return args -> {
//
//            if (userRepository.findByUsername("admin").isEmpty()) {
//
//                User admin = User.builder()
//                        .fullname("Depashree P")
//                        .email("deepashree@gmail.com")
//                        .username("depashree")
//                        .password(passwordEncoder.encode("admin123"))
//                        .role(Role.ADMIN)
//                        .createdAt(LocalDateTime.now())
//                        .build();
//                userRepository.save(admin);
//                System.out.println("Admin created successfully!");
//            }
//        };
//    }
//}