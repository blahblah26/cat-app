package com.example.app;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
public class CatController {
    @Autowired
    private CatRepository catRepository;

    @Autowired
    private UserRepository userRepository;

    @SuppressWarnings("unused")
    private boolean isAuthorized(String catName, String username) {
        try {
            Cat cat = catRepository.getCatByName(catName);
            User user = userRepository.findById(cat.getUser_id()).get();
            if (user.getUsername().equals(username)) {
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }


    @GetMapping("/cat/{catName}")
    @PreAuthorize("isAuthorized(#catName, authentication.name)")
    public Cat getCatByName(@PathVariable("catName") String catName) {
        try {
            Cat cat = catRepository.getCatByName(catName);
            return cat;
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/user/{username}/cats")
    @PreAuthorize("#username = authentication.name")
    public List<Cat> getCatByUsername(@PathVariable("username") String username) {
        try {
            return catRepository.getCatByUsername(username);
        } catch (Exception e) {
            return null;
        }
    }

    @PutMapping("/cat/create")
    public void catPut(@RequestBody CatForm catForm) {
        try {
            catRepository.insertCat(catForm.getName(), catForm.getUser_id(), catForm.getPicture());
        } catch (Exception e) {
            return;
        }
    }

    @PostMapping("/cat/{catName}")
    @PreAuthorize("isAuthorized(#catName, authentication.name)")
    public void catPost(@RequestBody CatForm catForm) {
        try {
            catRepository.updateCat(catForm.getName(), catForm.getPicture());
        } catch (Exception e) {
            return;
        }
    }

    @DeleteMapping("/cat/{catName}")
    @PreAuthorize("isAuthorized(#catName, authentication.name)")
    public void catDelete(@PathVariable("catName") String catName) {
        try {
            catRepository.delete(catRepository.getCatByName(catName));
        } catch (Exception e) {
            return;
        }
    }
}
