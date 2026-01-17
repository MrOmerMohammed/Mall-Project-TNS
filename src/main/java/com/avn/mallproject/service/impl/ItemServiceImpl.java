package com.avn.mallproject.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.avn.mallproject.entity.Item;
import com.avn.mallproject.entity.Shop;
import com.avn.mallproject.repository.ItemRepository;
import com.avn.mallproject.repository.ShopRepository;
import com.avn.mallproject.service.ItemService;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Override
    public Item addItemToShop(Long shopId, Item item) {

        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() ->
                        new RuntimeException("Shop not found with id " + shopId));

        // IMPORTANT: set relationship
        item.setShop(shop);

        return itemRepository.save(item);
    }

    @Override
    public List<Item> getItemsByShop(Long shopId) {
        return itemRepository.findByShopShopId(shopId);
    }
}

