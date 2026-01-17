package com.avn.mallproject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    private String employeeName;
    private String role;
    private Double salary;

    @ManyToOne
    @JoinColumn(name = "mall_id")
    private Mall mall;

    @ManyToOne
    @JoinColumn(name = "shop_id")
    private Shop shop;
}
