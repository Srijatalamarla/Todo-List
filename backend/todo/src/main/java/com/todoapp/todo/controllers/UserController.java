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
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        System.out.println("===============================================================");
        System.out.println("Register endpoint hit");
        System.out.println("===============================================================");
        try {
            return ResponseEntity.ok(userService.registerUser(user));
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        System.out.println("===============================================================");
        System.out.println("Login endpoint hit");
        System.out.println("===============================================================");
        boolean isValidUser = userService.validateUserCredentials(loginRequest.getEmail(), loginRequest.getPassword());

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
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        System.out.println("===============================================================");
        System.out.println("Delete endpoint hit");
        System.out.println("===============================================================");

        boolean isDeleted  = userService.deleteUserById(id);
        if(isDeleted) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}