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
import ro.mgegry.myfriends.services.payload.request.CheckIfPostLikedByUserRequest;

@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LikeController {

    @Autowired
    LikeService likeService;

    @PostMapping("/like")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addLike(@RequestBody Like like) {
        return likeService.addLike(like);
    }

    @GetMapping("/like")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> checkIfPostLikedByUser(@RequestParam Long userId, @RequestParam Long postId) {
        return likeService.checkIfPostLikedByUser(userId, postId);
    }

}
