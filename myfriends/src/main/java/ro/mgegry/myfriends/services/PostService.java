package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.mgegry.myfriends.models.Comment;
import ro.mgegry.myfriends.models.Post;
import ro.mgegry.myfriends.models.User;
import ro.mgegry.myfriends.repositories.CommentRepository;
import ro.mgegry.myfriends.repositories.LikeRepository;
import ro.mgegry.myfriends.repositories.PostRepository;
import ro.mgegry.myfriends.repositories.UserRepository;
import ro.mgegry.myfriends.security.jwt.JwtUtils;
import ro.mgegry.myfriends.services.payload.response.PostResponse;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    JwtUtils jwtUtils;

    public ResponseEntity<?> getPostsForUser(String username) {

        Optional<User> user = userRepository.findByUsername(username);

        if (!user.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Post> posts = postRepository.findByUser(user.get());
        posts.sort(Collections.reverseOrder());

        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    public ResponseEntity<?> addPostForUser(Post post, String username, String authorization) {
        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        post.setCreatedAt(new Timestamp(new Date().getTime()));

        return new ResponseEntity<>(postRepository.save(post), HttpStatus.OK);
    }

    public ResponseEntity<?> getPostById(Long id) {

        Optional<Post> post = postRepository.findById(id);

        if (!post.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Comment> comments = commentRepository.findByPost(post.get());
        comments.sort(Collections.reverseOrder());

        PostResponse postResponse = new PostResponse(
                post.get(),
                likeRepository.findByPost(post.get()),
                comments
        );

        return new ResponseEntity<>(postResponse, HttpStatus.OK);
    }

    /**
     * Get all the posts for a given user
     * @param userId the ID of the user for which the posts are returned
     * @return a list of all posts and an HTTP status code
     */
    public ResponseEntity<?> getPostsForUserWithId(Long userId) {
        return new ResponseEntity<>(postRepository.findByUserId(userId), HttpStatus.OK);
    }
}
