package com.todoapp.todo.services;

import com.todoapp.todo.models.User;
import com.todoapp.todo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }
}