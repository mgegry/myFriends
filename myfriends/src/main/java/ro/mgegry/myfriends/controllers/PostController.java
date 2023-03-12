package ro.mgegry.myfriends.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.mgegry.myfriends.services.PostService;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    PostService postService;

    @GetMapping("/{username}/posts")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getPostsForUser(@PathVariable String username) {
        return postService.getPostsForUser(username);
    }

}
