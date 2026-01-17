package com.avn.mallproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avn.mallproject.entity.Mall;

public interface MallRepository extends JpaRepository<Mall, Long> {
}
