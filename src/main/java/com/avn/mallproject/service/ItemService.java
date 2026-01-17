package com.avn.mallproject.service;

import java.util.List;

import com.avn.mallproject.entity.Item;

public interface ItemService {

    Item addItemToShop(Long shopId, Item item);

    List<Item> getItemsByShop(Long shopId);
}
