package com.avn.mallproject.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Mall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mallId;

    private String mallName;
    private String location;
    private String contactNumber;

    @OneToMany(mappedBy = "mall")
    private List<Shop> shops;

    @OneToMany(mappedBy = "mall")
    private List<Employee> employees;

    @OneToOne(mappedBy = "mall")
    private MallAdmin mallAdmin;

    // Getters and Setters
    public Long getMallId() {
        return mallId;
    }

    public void setMallId(Long mallId) {
        this.mallId = mallId;
    }

    public String getMallName() {
        return mallName;
    }

    public void setMallName(String mallName) {
        this.mallName = mallName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public List<Shop> getShops() {
        return shops;
    }

    public void setShops(List<Shop> shops) {
        this.shops = shops;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public MallAdmin getMallAdmin() {
        return mallAdmin;
    }

    public void setMallAdmin(MallAdmin mallAdmin) {
        this.mallAdmin = mallAdmin;
    }
}
