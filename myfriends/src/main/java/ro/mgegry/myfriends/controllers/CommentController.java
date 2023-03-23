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
import java.util.Optional;

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
     * Get all comments for specific user or specific post
     * @param userId the user for which to get the comments
     * @return a list of comments and a status code
     */
    @GetMapping("admin/comments")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getCommentsForUserId(
            @RequestParam(name="userId", required = false) Long userId,
            @RequestParam(name = "postId", required = false) Long postId) {

        if (postId == null && userId != null) {
            return commentService.getCommentsForUserId(userId);
        } else if (postId != null && userId == null){
            return commentService.getCommentsForPostId(postId);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("admin/comments/{commentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        commentService.deleteCommentById(commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
