package com.avn.mallproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avn.mallproject.entity.Shop;

public interface ShopRepository extends JpaRepository<Shop, Long> {
}

