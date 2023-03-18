package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.mgegry.myfriends.models.Post;
import ro.mgegry.myfriends.models.User;
import ro.mgegry.myfriends.repositories.PostRepository;
import ro.mgegry.myfriends.repositories.UserRepository;
import ro.mgegry.myfriends.security.jwt.JwtUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    public ResponseEntity<?> getPostsForUser(String username) {

        Optional<User> user = userRepository.findByUsername(username);

        if (!user.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(postRepository.findByUser(user.get()), HttpStatus.OK);
    }

    public ResponseEntity<?> addPostForUser(Post post, String username, String authorization) {
        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        post.setCreatedAt(new Timestamp(new Date().getTime()));
        System.out.println(post);

        return new ResponseEntity<>(postRepository.save(post), HttpStatus.OK);
    }
}
