package com.resolveiq.app.repository;

import com.resolveiq.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<User,Long> {
}
