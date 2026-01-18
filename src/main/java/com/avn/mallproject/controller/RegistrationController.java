package com.avn.mallproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.avn.mallproject.dto.MallAdminRegistrationRequest;
import com.avn.mallproject.dto.ShopOwnerRegistrationRequest;
import com.avn.mallproject.entity.Mall;
import com.avn.mallproject.entity.MallAdmin;
import com.avn.mallproject.entity.Shop;
import com.avn.mallproject.entity.ShopOwner;
import com.avn.mallproject.entity.User;
import com.avn.mallproject.repository.MallAdminRepository;
import com.avn.mallproject.repository.MallRepository;
import com.avn.mallproject.repository.ShopOwnerRepository;
import com.avn.mallproject.repository.ShopRepository;
import com.avn.mallproject.repository.UserRepository;

@RestController
@RequestMapping("/api/register")
public class RegistrationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MallRepository mallRepository;

    @Autowired
    private MallAdminRepository mallAdminRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private ShopOwnerRepository shopOwnerRepository;

    @PostMapping("/mall-admin")
    public MallAdmin registerMallAdmin(@RequestBody MallAdminRegistrationRequest request) {
        // 1. Create User
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setRole("MALL_ADMIN");
        User savedUser = userRepository.save(user);

        // 2. Create or Link Mall
        Mall mall;
        if (request.getExistingMallId() != null) {
            mall = mallRepository.findById(request.getExistingMallId())
                    .orElseThrow(() -> new RuntimeException("Mall not found with ID: " + request.getExistingMallId()));
        } else {
            mall = new Mall();
            mall.setMallName(request.getMallName());
            mall.setLocation(request.getMallLocation());
            mall.setContactNumber(request.getMallContact());
            mall = mallRepository.save(mall);
        }

        // 3. Create MallAdmin
        MallAdmin admin = new MallAdmin();
        admin.setAdminName(request.getAdminName());
        admin.setEmail(request.getEmail());
        admin.setUser(savedUser);
        admin.setMall(mall); // Link Mall
        MallAdmin savedAdmin = mallAdminRepository.save(admin);

        // Link backend if needed (bidirectional), usually JPA handles via saves if
        // mapped correctly.
        // Mall -> Admin might need setting?
        // Mall entity likely has 'mallAdmin', we might need to set it on mall too if
        // OneToOne.
        // But simplified flow here.

        return savedAdmin;
    }

    @PostMapping("/shop-owner")
    public ShopOwner registerShopOwner(@RequestBody ShopOwnerRegistrationRequest request) {
        // 1. Create User
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setRole("SHOP_OWNER");
        User savedUser = userRepository.save(user);

        // 2. Create or Link Shop
        Shop shop;
        if (request.getExistingShopId() != null) {
            shop = shopRepository.findById(request.getExistingShopId())
                    .orElseThrow(() -> new RuntimeException("Shop not found with ID: " + request.getExistingShopId()));
        } else {
            shop = new Shop();
            shop.setShopName(request.getShopName());
            shop.setShopType(request.getShopType());
            shop.setStatus("Open"); // Default

            // If Mall ID provided, link it
            if (request.getMallId() != null) {
                Mall mall = mallRepository.findById(request.getMallId()).orElse(null);
                shop.setMall(mall);
            }
            shop = shopRepository.save(shop);
        }

        // 3. Create ShopOwner
        ShopOwner owner = new ShopOwner();
        owner.setOwnerName(request.getOwnerName());
        owner.setContactNumber(request.getContactNumber());
        owner.setUser(savedUser);
        owner.setShop(shop);
        ShopOwner savedOwner = shopOwnerRepository.save(owner);

        return savedOwner;
    }
}
