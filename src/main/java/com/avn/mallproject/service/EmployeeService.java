package com.avn.mallproject.service;

import java.util.List;
import com.avn.mallproject.entity.Employee;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);
    List<Employee> getAllEmployees();
}

