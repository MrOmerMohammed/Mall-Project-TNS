package com.avn.mallproject.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.avn.mallproject.entity.Item;
import com.avn.mallproject.entity.Shop;
import com.avn.mallproject.repository.ItemRepository;
import com.avn.mallproject.repository.ShopRepository;
import com.avn.mallproject.service.ItemService;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final ShopRepository shopRepository;

    public ItemServiceImpl(ItemRepository itemRepository,
            ShopRepository shopRepository) {
        this.itemRepository = itemRepository;
        this.shopRepository = shopRepository;
    }

    @Override
    public Item addItemToShop(Long shopId, Item item) {
        Shop shop = shopRepository.findById(shopId).orElse(null);
        item.setShop(shop);
        return itemRepository.save(item);
    }

    @Override
    public Item getItemById(Long itemId) {
        return itemRepository.findById(itemId).orElse(null);
    }

    @Override
    public List<Item> getItemsByShop(Long shopId) {
        return itemRepository.findAll()
                .stream()
                .filter(i -> i.getShop() != null
                        && i.getShop().getShopId().equals(shopId))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(Long itemId) {
        itemRepository.deleteById(itemId);
    }
}
