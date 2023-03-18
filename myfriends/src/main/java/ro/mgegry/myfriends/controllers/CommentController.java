package ro.mgegry.myfriends.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.mgegry.myfriends.models.Comment;
import ro.mgegry.myfriends.repositories.CommentRepository;

import java.sql.Timestamp;
import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @PostMapping("/{username}/comment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addNewPost(@PathVariable String username,
                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
                                        @RequestBody Comment comment) {
        comment.setCreatedAt(new Timestamp(new Date().getTime()));
        return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.OK);
    }

}
