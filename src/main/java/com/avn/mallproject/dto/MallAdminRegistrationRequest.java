package com.avn.mallproject.dto;

public class MallAdminRegistrationRequest {
    private String username;
    private String password;
    private String adminName;
    private String email;
    private String mallName;
    private String mallLocation;
    private String mallContact;
    private Long existingMallId; // Optional: Link to existing mall

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMallName() {
        return mallName;
    }

    public void setMallName(String mallName) {
        this.mallName = mallName;
    }

    public String getMallLocation() {
        return mallLocation;
    }

    public void setMallLocation(String mallLocation) {
        this.mallLocation = mallLocation;
    }

    public String getMallContact() {
        return mallContact;
    }

    public void setMallContact(String mallContact) {
        this.mallContact = mallContact;
    }

    public Long getExistingMallId() {
        return existingMallId;
    }

    public void setExistingMallId(Long existingMallId) {
        this.existingMallId = existingMallId;
    }
}
