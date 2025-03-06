package com.todoapp.todo.services;

import com.todoapp.todo.models.User;
import com.todoapp.todo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public  Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean checkUserCredentials(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if(userOptional.isEmpty()) {
            return false;
        }

        User user = userOptional.get();
        return passwordEncoder.matches(password, user.getPassword());
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
}