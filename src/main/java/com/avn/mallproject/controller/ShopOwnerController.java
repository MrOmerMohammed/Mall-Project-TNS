package com.avn.mallproject.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.avn.mallproject.entity.ShopOwner;
import com.avn.mallproject.service.ShopOwnerService;

@RestController
@RequestMapping("/api/shop-owners")
public class ShopOwnerController {

    private final ShopOwnerService shopOwnerService;

    public ShopOwnerController(ShopOwnerService shopOwnerService) {
        this.shopOwnerService = shopOwnerService;
    }

    @PostMapping("/shop/{shopId}")
    public ShopOwner addShopOwner(@RequestBody ShopOwner owner,
            @PathVariable Long shopId) {
        return shopOwnerService.addShopOwner(owner, shopId);
    }

    @GetMapping("/{id}")
    public ShopOwner getShopOwner(@PathVariable Long id) {
        return shopOwnerService.getShopOwnerById(id);
    }

    @GetMapping
    public List<ShopOwner> getAllShopOwners() {
        return shopOwnerService.getAllShopOwners();
    }

    @DeleteMapping("/{id}")
    public void deleteShopOwner(@PathVariable Long id) {
        shopOwnerService.deleteShopOwner(id);
    }

    @GetMapping("/user/{userId}")
    public ShopOwner getShopOwnerByUserId(@PathVariable Long userId) {
        return shopOwnerService.getShopOwnerByUserId(userId);
    }
}
