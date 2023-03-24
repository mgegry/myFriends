package ro.mgegry.myfriends.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ro.mgegry.myfriends.models.Like;
import ro.mgegry.myfriends.services.LikeService;

import java.util.Optional;

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

    /**
     * Get all the likes for a particular post
     * @param postId the post ID for which to get the likes
     * @return a list containing all the likes
     */
    @GetMapping("/admin/likes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getLikesForPostId(@RequestParam(name = "postId", required = false) Long postId,
                                               @RequestParam(name = "userId", required = false) Long userId) {

        if (postId != null) {
            return likeService.getLikesForPostId(postId);
        } else if (userId != null) {
            return likeService.getLikesForUserId(userId);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
