package com.avn.mallproject.dto;

public class ShopOwnerRegistrationRequest {
    private String username;
    private String password;
    private String ownerName;
    private String contactNumber;
    private String shopName;
    private String shopType;
    // Optional: Select Mall? For now assume standalone or link later.
    // Actually project structure implies Shops are inside Malls.
    // But for "Shop Signup" maybe they select a mall later or we need mallId here.
    // Let's add mallId just in case, but make it optional or handle null.
    // Let's add mallId just in case, but make it optional or handle null.
    private Long mallId; // For creating NEW shop in a mall
    private Long existingShopId; // Optional: Link to existing shop

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

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getShopType() {
        return shopType;
    }

    public void setShopType(String shopType) {
        this.shopType = shopType;
    }

    public Long getMallId() {
        return mallId;
    }

    public void setMallId(Long mallId) {
        this.mallId = mallId;
    }

    public Long getExistingShopId() {
        return existingShopId;
    }

    public void setExistingShopId(Long existingShopId) {
        this.existingShopId = existingShopId;
    }
}
