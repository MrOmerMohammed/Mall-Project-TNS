package com.avn.mallproject.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    private String itemName;
    private double price;
    private int quantity;

    // 🔗 Item → Shop (Many items belong to one shop)
    @ManyToOne
    @JoinColumn(name = "shop_id")
    private Shop shop;

    // 🔗 Item → Order (keep this for later use)
    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderDetails order;

    // ===== GETTERS & SETTERS =====

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Shop getShop() {
        return shop;
    }

    // ⭐ THIS METHOD WAS MISSING ⭐
    public void setShop(Shop shop) {
        this.shop = shop;
    }

    public OrderDetails getOrder() {
        return order;
    }

    public void setOrder(OrderDetails order) {
        this.order = order;
    }
}

