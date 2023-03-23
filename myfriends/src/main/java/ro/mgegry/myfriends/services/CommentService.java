package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.mgegry.myfriends.models.Comment;
import ro.mgegry.myfriends.repositories.CommentRepository;
import ro.mgegry.myfriends.security.jwt.JwtUtils;

import java.sql.Timestamp;
import java.util.Date;

@Service
public class CommentService {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    CommentRepository commentRepository;

    public ResponseEntity<?> addNewComment(String username, String authorization, Comment comment) {

        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


        comment.setCreatedAt(new Timestamp(new Date().getTime()));
        return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.OK);
    }

    /**
     * Get all comments for specific post
     * @param postId the post id for which to get the comments
     * @return a list of comments and a status code
     */
    public ResponseEntity<?> getCommentsForPostId(Long postId) {
        return new ResponseEntity<>(commentRepository.findByPostId(postId), HttpStatus.OK);
    }

    /**
     * Get all comments for specific user
     * @param userId the user for which to get the comments
     * @return a list of comments and a status code
     */
    public ResponseEntity<?> getCommentsForUserId(Long userId) {
        return new ResponseEntity<>(commentRepository.findByUserId(userId), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> deleteCommentById(Long commentId) {
        commentRepository.deleteCommentById(commentId);
        return new ResponseEntity<>( HttpStatus.OK);
    }
}
