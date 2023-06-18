package com.example.app;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login") 
    public boolean login(@RequestBody LoginForm loginForm) {
        try {
            User user = userRepository.getUserByUsername(loginForm.getUsername());
            if (user.getPassword().equals(loginForm.getPassword())) {
                return true;
            }
            return false;
        } catch (UsernameNotFoundException e) {
            return false;
        }
    }

    @GetMapping("/user/{username}")
    @PostAuthorize("#username == authentication.name")
    public User user(@PathVariable("username") String username) {
        try {
            User user = userRepository.getUserByUsername(username);
            return user;
        } catch (UsernameNotFoundException e) {
            return null;
        } 
    }
}
