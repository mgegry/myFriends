package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.mgegry.myfriends.models.Comment;
import ro.mgegry.myfriends.models.Friend;
import ro.mgegry.myfriends.models.Post;
import ro.mgegry.myfriends.models.User;
import ro.mgegry.myfriends.repositories.*;
import ro.mgegry.myfriends.security.jwt.JwtUtils;
import ro.mgegry.myfriends.services.payload.response.PostResponse;

import java.util.*;

@Service
public class HomeService {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FriendRepository friendRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    CommentRepository commentRepository;

    public ResponseEntity<?> getFriendsPosts(String authorization) {
        String username = jwtUtils.getUserNameFromJwtToken(authorization.substring(7));

        Optional<User> userOptional = userRepository.findByUsername(username);

        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = userOptional.get();

        List<Friend> friends = friendRepository.findAllFriendsForUser(user);

        Set<User> userFriends = new HashSet<>();

        for (Friend friend : friends) {
            if (friend.getFirstUser().equals(user)) {
                userFriends.add(friend.getSecondUser());
            } else {
                userFriends.add(friend.getFirstUser());
            }
        }

        List<Post> posts = new ArrayList<>();

        for (User u : userFriends) {
            posts.addAll(postRepository.findByUser(u));
        }

        posts.sort(Collections.reverseOrder());

        List<PostResponse> postResponses = new ArrayList<>();
        for (Post p : posts) {

            List<Comment> comments = commentRepository.findByPost(p);
            comments.sort(Collections.reverseOrder());

            postResponses.add(new PostResponse(
                    p,
                    likeRepository.findByPost(p),
                    comments
            ));
        }

        return new ResponseEntity<>(postResponses, HttpStatus.OK);
    }

    public ResponseEntity<?> getSearch(String username) {

        return new ResponseEntity<>(userRepository.getSearch(username), HttpStatus.OK);
    }
}
