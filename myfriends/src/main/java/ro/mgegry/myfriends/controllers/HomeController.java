package ro.mgegry.myfriends.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import ro.mgegry.myfriends.models.Friend;
import ro.mgegry.myfriends.models.Post;
import ro.mgegry.myfriends.models.User;
import ro.mgegry.myfriends.repositories.*;
import ro.mgegry.myfriends.security.jwt.JwtUtils;
import ro.mgegry.myfriends.services.HomeService;
import ro.mgegry.myfriends.services.payload.response.PostResponse;

import java.util.*;

@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HomeController {

    @Autowired
    HomeService homeService;

    @GetMapping("/wall")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getFriendsPosts(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        return homeService.getFriendsPosts(authorization);
    }
}
