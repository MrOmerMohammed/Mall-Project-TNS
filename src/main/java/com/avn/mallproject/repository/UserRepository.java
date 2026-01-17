package com.avn.mallproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avn.mallproject.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}

