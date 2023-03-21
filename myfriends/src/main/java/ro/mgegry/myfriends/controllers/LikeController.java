package ro.mgegry.myfriends.controllers;


import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/like")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addLike(@RequestBody Like like) {
        return likeService.addLike(like);
    }

    @DeleteMapping("/like")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteLike(@RequestParam Long userId, @RequestParam Long postId) {
        return likeService.deleteLike(userId, postId);
    }
    @GetMapping("/like")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> checkIfPostLikedByUser(@RequestParam Long userId, @RequestParam Long postId) {
        return likeService.checkIfPostLikedByUser(userId, postId);
    }

}
