package com.avn.mallproject.service;

import java.util.List;

import com.avn.mallproject.entity.OrderDetails;

public interface OrderService {
    OrderDetails saveOrder(OrderDetails order);

    List<OrderDetails> getAllOrders();

    OrderDetails getOrderById(Long orderId);

    OrderDetails updateOrder(Long orderId, OrderDetails order);

    void deleteOrder(Long orderId);

    List<OrderDetails> getOrdersByShopId(Long shopId);
}
