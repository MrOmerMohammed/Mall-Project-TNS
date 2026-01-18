package com.avn.mallproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.avn.mallproject.entity.Employee;
import com.avn.mallproject.service.EmployeeService;

@RestController
@RequestMapping("/api/employees") // ✅ ADD THIS
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }

    @GetMapping
    public List<Employee> getEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/mall/{mallId}")
    public List<Employee> getEmployeesByMall(@PathVariable Long mallId) {
        return employeeService.getEmployeesByMallId(mallId);
    }

    @GetMapping("/shop/{shopId}")
    public List<Employee> getEmployeesByShop(@PathVariable Long shopId) {
        return employeeService.getEmployeesByShopId(shopId);
    }
}
