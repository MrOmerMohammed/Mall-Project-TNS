package com.avn.mallproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avn.mallproject.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}

