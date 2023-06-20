package com.example.app;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
            // TODO fix this to use the auth manager
            if (user.getPassword().equals(loginForm.getPassword())) {
                return true;
            }
            return false;
        } catch (UsernameNotFoundException e) {
            return false;
        } catch (NullPointerException e) {
            return false;
        }
    }

    @GetMapping("/user/{username}")
    @PostAuthorize("#username == authentication.name")
    public User userGet(@PathVariable("username") String username) {
        try {
            User user = userRepository.getUserByUsername(username);
            return user;
        } catch (UsernameNotFoundException e) {
            return null;
        } 
    }

    @PostMapping("/user/{username}")
    @PreAuthorize("#username == authentication.name")
    public void userPost(@PathVariable("username") String username, @RequestBody UserForm userForm) {
        try {
            userRepository.updateUser(username, userForm.getPassword(), userForm.getEmail(), userForm.getProfilePicture());
        } catch (Exception e ) {
            return;
        }
    }

    @DeleteMapping("/user/{username}")
    @PreAuthorize("#username == authentication.name")
    public void userDelete(@PathVariable("username") String username) {
        try {
            User u = userRepository.getUserByUsername(username);
            userRepository.delete(u);
        } catch (Exception e) {
            return;
        }
    }

    @PutMapping("/createuser/{username}")
    public void userPut(@PathVariable("username") String username, @RequestBody UserForm userForm) {
        try {
            userRepository.insertUser(userForm.getUsername(), userForm.getPassword(), userForm.getEmail(), userForm.getProfilePicture(), "user");
        } catch (Exception e) {
            return;
        }
    }
}
