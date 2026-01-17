package com.avn.mallproject.service;

import java.util.List;
import com.avn.mallproject.entity.ShopOwner;

public interface ShopOwnerService {

    ShopOwner addShopOwner(ShopOwner owner, Long shopId);

    ShopOwner getShopOwnerById(Long ownerId);

    List<ShopOwner> getAllShopOwners();

    void deleteShopOwner(Long ownerId);
}
