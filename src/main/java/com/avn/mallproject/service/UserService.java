package com.avn.mallproject.service;

import java.util.List;

import com.avn.mallproject.entity.User;

public interface UserService {
    User saveUser(User user);

    List<User> getAllUsers();

    User getUserById(Long userId);

    User updateUser(Long userId, User user);

    void deleteUser(Long userId);

    User loginUser(String username, String password);
}
