package com.todoapp.todo.controllers;

import com.todoapp.todo.models.User;
import com.todoapp.todo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Optional;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        boolean isValidUser = userService.checkUserCredentials(loginRequest.getEmail(), loginRequest.getPassword());

        if(isValidUser) {
            Optional<User> userOptional = userService.findUserByEmail(loginRequest.getEmail());
            User user = userOptional.get();

            user.setPassword(null);
            return ResponseEntity.ok(user);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }
}