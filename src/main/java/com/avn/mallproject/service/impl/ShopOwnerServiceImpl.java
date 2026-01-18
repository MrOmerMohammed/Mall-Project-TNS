package com.avn.mallproject.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.avn.mallproject.entity.Shop;
import com.avn.mallproject.entity.ShopOwner;
import com.avn.mallproject.repository.ShopOwnerRepository;
import com.avn.mallproject.repository.ShopRepository;
import com.avn.mallproject.service.ShopOwnerService;

@Service
public class ShopOwnerServiceImpl implements ShopOwnerService {

    private final ShopOwnerRepository shopOwnerRepository;
    private final ShopRepository shopRepository;

    public ShopOwnerServiceImpl(ShopOwnerRepository shopOwnerRepository,
            ShopRepository shopRepository) {
        this.shopOwnerRepository = shopOwnerRepository;
        this.shopRepository = shopRepository;
    }

    @Override
    public ShopOwner addShopOwner(ShopOwner owner, Long shopId) {
        Shop shop = shopRepository.findById(shopId).orElse(null);
        owner.setShop(shop);
        return shopOwnerRepository.save(owner);
    }

    @Override
    public ShopOwner getShopOwnerById(Long ownerId) {
        return shopOwnerRepository.findById(ownerId).orElse(null);
    }

    @Override
    public List<ShopOwner> getAllShopOwners() {
        return shopOwnerRepository.findAll();
    }

    @Override
    public void deleteShopOwner(Long ownerId) {
        shopOwnerRepository.deleteById(ownerId);
    }

    @Override
    public ShopOwner getShopOwnerByUserId(Long userId) {
        return shopOwnerRepository.findByUser_UserId(userId);
    }
}
