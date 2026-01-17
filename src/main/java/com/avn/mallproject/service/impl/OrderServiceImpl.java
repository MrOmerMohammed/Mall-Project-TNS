package com.avn.mallproject.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.avn.mallproject.entity.OrderDetails;
import com.avn.mallproject.repository.OrderDetailsRepository;
import com.avn.mallproject.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Override
    public OrderDetails saveOrder(OrderDetails order) {
        return orderDetailsRepository.save(order);
    }

    @Override
    public List<OrderDetails> getAllOrders() {
        return orderDetailsRepository.findAll();
    }

    @Override
    public OrderDetails getOrderById(Long orderId) {
        return orderDetailsRepository.findById(orderId).orElse(null);
    }

    @Override
    public OrderDetails updateOrder(Long orderId, OrderDetails order) {
        OrderDetails existingOrder = orderDetailsRepository.findById(orderId).orElse(null);
        if (existingOrder != null) {
            existingOrder.setOrderStatus(order.getOrderStatus());
            existingOrder.setPaymentMode(order.getPaymentMode());
            existingOrder.setTotalAmount(order.getTotalAmount());
            return orderDetailsRepository.save(existingOrder);
        }
        return null;
    }

    @Override
    public void deleteOrder(Long orderId) {
        orderDetailsRepository.deleteById(orderId);
    }
}
