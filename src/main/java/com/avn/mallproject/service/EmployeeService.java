package com.avn.mallproject.service;

import java.util.List;
import com.avn.mallproject.entity.Employee;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);

    List<Employee> getAllEmployees();

    List<Employee> getEmployeesByMallId(Long mallId);

    List<Employee> getEmployeesByShopId(Long shopId);

    void deleteEmployee(Long id);
}
