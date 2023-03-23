package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.mgegry.myfriends.models.ERole;
import ro.mgegry.myfriends.models.Post;
import ro.mgegry.myfriends.models.User;
import ro.mgegry.myfriends.repositories.*;
import ro.mgegry.myfriends.security.jwt.JwtUtils;
import ro.mgegry.myfriends.services.payload.request.UpdateProfilePictureRequest;
import ro.mgegry.myfriends.services.payload.request.UpdateUserRequest;
import ro.mgegry.myfriends.services.payload.response.ProfileResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    FriendRepository friendRepository;

    @Autowired
    FriendRequestRepository friendRequestRepository;

    public ResponseEntity<?> getUser(String username, String authorization) {

        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<User> user = userRepository.findByUsername(username);

        if (!user.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    public ResponseEntity<?> updateUser(String username, String authorization, UpdateUserRequest request) {
        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<User> userOptional = userRepository.findByUsername(username);

        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = userOptional.get();
        if(request.getEmail() != null) {
            if (!userRepository.existsByEmail(request.getEmail())) {
                user.setEmail(request.getEmail());
            }
        }
        if(request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }

        if(request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }

        if(request.getUsername() != null) {
            if (!userRepository.existsByUsername(request.getUsername())) {
                user.setUsername(request.getUsername());
            }
        }

        if(request.getProfilePicture() != null) {
            user.setProfilePicture(request.getProfilePicture());
        }

        if(request.getBio() != null) {
            user.setBio(request.getBio());
        }

        return new ResponseEntity<>(userRepository.save(user), HttpStatus.CREATED);
    }

    public ResponseEntity<?> getProfile(String username) {

        Optional<User> userOptional = userRepository.findByUsername(username);

        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = userOptional.get();

        ProfileResponse profileResponse = new ProfileResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getBio()
        );



        return new ResponseEntity<>(profileResponse, HttpStatus.OK);
    }

    // ADMIN methods

    /**
     * Get all the user accounts from the database
     * @return a list of User objects
     */
    public ResponseEntity<?> getAllUserAccounts() {

        List<User> users = userRepository.findAll();

        List<User> toRemove = new ArrayList<>();

        for (User u : users) {
            u.getRoles().forEach(role -> {
                if (role.getName().equals(ERole.ROLE_ADMIN)) {
                    toRemove.add(u);
                }
            });
        }

        users.removeAll(toRemove);

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    /**
     * Delete a user account from the database
     * @param userId the ID of the user to delete
     * @return Http Status Code
     */
    @Transactional
    public ResponseEntity<?> deleteUser(Long userId) {

        commentRepository.deleteCommentsForUser(userId);
        likeRepository.deleteAllLikesForUser(userId);

        List<Post> posts = postRepository.findByUserId(userId);

        for (Post p : posts) {
            commentRepository.deleteCommentsForPost(p.getId());
            likeRepository.deleteAllLikesForPost(p.getId());
        }

        postRepository.deletePostsForUser(userId);
        friendRepository.deleteAllFriendsForUser(userId);
        friendRequestRepository.deleteAllFriendRequestsForUser(userId);

        userRepository.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<?> getUserById(Long userId) {
        return new ResponseEntity<>(userRepository.findById(userId), HttpStatus.OK);
    }

}
