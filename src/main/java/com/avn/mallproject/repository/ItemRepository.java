package com.avn.mallproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avn.mallproject.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
