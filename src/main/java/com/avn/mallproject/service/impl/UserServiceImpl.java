package com.avn.mallproject.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.avn.mallproject.entity.User;
import com.avn.mallproject.repository.UserRepository;
import com.avn.mallproject.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public User updateUser(Long userId, User user) {
        User existingUser = userRepository.findById(userId).orElse(null);
        if (existingUser != null) {
            existingUser.setUsername(user.getUsername());
            existingUser.setPassword(user.getPassword());
            existingUser.setRole(user.getRole());
            return userRepository.save(existingUser);
        }
        return null;
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public User loginUser(String username, String password) {
        // Find user by username (Assuming repository has findByUsername or we iterate)
        // Since UserRepository might not have findByUsername yet, let's check.
        // If not, we can implement it or just iterate all for now (inefficient but
        // works for MVP)
        // Better: Let's assume we can add findByUsername to Repo or use Example.
        // Checking existing code... likely need to add it to Repo.
        // For safety and speed without viewing Repo file, I'll use streams on findAll
        // for this MVP step
        // as the dataset is tiny.
        return userRepository.findAll().stream()
                .filter(u -> u.getUsername().equals(username) && u.getPassword().equals(password))
                .findFirst()
                .orElse(null);
    }
}
