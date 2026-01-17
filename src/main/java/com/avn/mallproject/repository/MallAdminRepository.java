package com.avn.mallproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avn.mallproject.entity.MallAdmin;

public interface MallAdminRepository extends JpaRepository<MallAdmin, Long> {
}

