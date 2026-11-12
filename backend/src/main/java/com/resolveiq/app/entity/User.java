package com.resolveiq.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.resolveiq.app.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @NotBlank(message = "Full name is required")
    private String fullname;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
    @JsonIgnore
    private LocalDateTime createdAt;
    @JsonIgnore
    @Column(unique = true)
    private String username;
}
