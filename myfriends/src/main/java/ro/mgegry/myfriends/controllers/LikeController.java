package ro.mgegry.myfriends.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ro.mgegry.myfriends.models.Like;
import ro.mgegry.myfriends.services.LikeService;

@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LikeController {

    @Autowired
    LikeService likeService;

    @PostMapping("/addLike")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addLike(@RequestBody Like like) {
        return likeService.addLike(like);
    }

}
