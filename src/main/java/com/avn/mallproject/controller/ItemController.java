package com.avn.mallproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.avn.mallproject.entity.Item;
import com.avn.mallproject.service.ItemService;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    // Add item to shop
    @PostMapping("/shop/{shopId}")
    public Item addItemToShop(@PathVariable Long shopId,
                              @RequestBody Item item) {
        return itemService.addItemToShop(shopId, item);
    }

    // View items of a shop
    @GetMapping("/shop/{shopId}")
    public List<Item> getItemsByShop(@PathVariable Long shopId) {
        return itemService.getItemsByShop(shopId);
    }
}
