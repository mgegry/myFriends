package ro.mgegry.myfriends.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.mgegry.myfriends.models.Comment;
import ro.mgegry.myfriends.repositories.CommentRepository;
import ro.mgegry.myfriends.services.CommentService;

import java.sql.Timestamp;
import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("/{username}/comment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addNewComment(@PathVariable String username,
                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
                                        @RequestBody Comment comment) {
        return commentService.addNewComment(username, authorization, comment);
    }

    /**
     * Get all comments for specific post
     * @param postId the post id for which to get the comments
     * @return a response entity containing a list of comments and a status code
     */
    @GetMapping("/comments/{postId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getCommentsForPostId(@PathVariable Long postId) {
        return commentService.getCommentsForPostId(postId);
    }

}
