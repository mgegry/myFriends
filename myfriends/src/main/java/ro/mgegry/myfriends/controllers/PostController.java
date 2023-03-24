package ro.mgegry.myfriends.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.mgegry.myfriends.models.Post;
import ro.mgegry.myfriends.services.PostService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PostController {

    @Autowired
    PostService postService;

    @GetMapping("/{username}/posts")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getPostsForUser(@PathVariable String username) {
        return postService.getPostsForUser(username);
    }

    @PostMapping("/{username}/post")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addPostForUser(@RequestBody Post post,
                                            @PathVariable String username,
                                            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        return postService.addPostForUser(post, username, authorization);
    }

    @GetMapping("/posts/{postId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getPostById(@PathVariable Long postId) {
        return postService.getPostById(postId);
    }


    /**
     * Get all the posts for a given user
     * @param userId the ID of the user for which the posts are returned
     * @return a list of all posts and an HTTP status code
     */
    @GetMapping("/admin/posts")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPostsForUserWithId(@RequestParam(name = "userId", required = false) Long userId) {

        if (userId != null) {
            return postService.getPostsForUserWithId(userId);
        } else {
            return postService.getPosts();
        }


    }

    @DeleteMapping("/admin/posts/{postId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?>  deletePostById(@PathVariable Long postId) {
        return postService.deletePostById(postId);
    }

}
