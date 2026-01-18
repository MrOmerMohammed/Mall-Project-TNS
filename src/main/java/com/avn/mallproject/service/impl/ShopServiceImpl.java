package com.avn.mallproject.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.avn.mallproject.entity.Shop;
import com.avn.mallproject.repository.ShopRepository;
import com.avn.mallproject.service.ShopService;

@Service
public class ShopServiceImpl implements ShopService {

    private final ShopRepository shopRepository;

    public ShopServiceImpl(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    @Override
    public Shop addShop(Shop shop) {
        return shopRepository.save(shop);
    }

    @Override
    public Shop getShopById(Long shopId) {
        return shopRepository.findById(shopId).orElse(null);
    }

    @Override
    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    @Override
    public Shop updateShop(Long shopId, Shop shop) {
        Shop existingShop = shopRepository.findById(shopId).orElse(null);
        if (existingShop != null) {
            existingShop.setShopName(shop.getShopName());
            existingShop.setShopType(shop.getShopType());
            existingShop.setStatus(shop.getStatus());
            return shopRepository.save(existingShop);
        }
        return null;
    }

    @Override
    public void deleteShop(Long shopId) {
        shopRepository.deleteById(shopId);
    }

    @Override
    public List<Shop> getShopsByMallId(Long mallId) {
        return shopRepository.findByMall_MallId(mallId);
    }
}
