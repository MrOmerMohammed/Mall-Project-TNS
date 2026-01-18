package com.avn.mallproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.avn.mallproject.entity.OrderDetails;
import com.avn.mallproject.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public OrderDetails createOrder(@RequestBody OrderDetails order) {
        return orderService.saveOrder(order);
    }

    @GetMapping
    public List<OrderDetails> getOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public OrderDetails getOrder(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @PutMapping("/{id}")
    public OrderDetails updateOrder(@PathVariable Long id, @RequestBody OrderDetails order) {
        return orderService.updateOrder(id, order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
    }

    @GetMapping("/shop/{shopId}")
    public List<OrderDetails> getOrdersByShop(@PathVariable Long shopId) {
        return orderService.getOrdersByShopId(shopId);
    }
}
