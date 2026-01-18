package com.avn.mallproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.avn.mallproject.entity.Employee;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByMall_MallId(Long mallId);

    List<Employee> findByShop_ShopId(Long shopId);
}
