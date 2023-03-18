package ro.mgegry.myfriends.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.mgegry.myfriends.services.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{username}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getUser(@PathVariable String username,
                                     @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        return userService.getUser(username, authorization);
    }
}
