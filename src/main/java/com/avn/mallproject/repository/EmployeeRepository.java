package com.avn.mallproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avn.mallproject.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}

