package com.avn.mallproject.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.avn.mallproject.entity.Shop;
import com.avn.mallproject.service.ShopService;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

    private final ShopService shopService;

    public ShopController(ShopService shopService) {
        this.shopService = shopService;
    }

    @PostMapping
    public Shop createShop(@RequestBody Shop shop) {
        return shopService.addShop(shop);
    }

    @GetMapping("/{id}")
    public Shop getShop(@PathVariable Long id) {
        return shopService.getShopById(id);
    }

    @GetMapping
    public List<Shop> getAllShops() {
        return shopService.getAllShops();
    }

    @PutMapping("/{id}")
    public Shop updateShop(@PathVariable Long id, @RequestBody Shop shop) {
        return shopService.updateShop(id, shop);
    }

    @DeleteMapping("/{id}")
    public void deleteShop(@PathVariable Long id) {
        shopService.deleteShop(id);
    }
}
