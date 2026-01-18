package com.avn.mallproject.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.avn.mallproject.entity.Employee;
import com.avn.mallproject.repository.EmployeeRepository;
import com.avn.mallproject.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public List<Employee> getEmployeesByMallId(Long mallId) {
        return employeeRepository.findByMall_MallId(mallId);
    }

    @Override
    public List<Employee> getEmployeesByShopId(Long shopId) {
        return employeeRepository.findByShop_ShopId(shopId);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
