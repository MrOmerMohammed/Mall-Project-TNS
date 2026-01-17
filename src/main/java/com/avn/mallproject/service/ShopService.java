package com.avn.mallproject.service;


import java.util.List;

import com.avn.mallproject.entity.Shop;

public interface ShopService {

    Shop addShop(Shop shop);

    Shop getShopById(Long shopId);

    List<Shop> getAllShops();

    Shop updateShop(Long shopId, Shop shop);

    void deleteShop(Long shopId);
}
