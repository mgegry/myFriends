package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.mgegry.myfriends.models.Friend;
import ro.mgegry.myfriends.models.User;
import ro.mgegry.myfriends.repositories.FriendRepository;
import ro.mgegry.myfriends.repositories.UserRepository;
import ro.mgegry.myfriends.security.jwt.JwtUtils;
import ro.mgegry.myfriends.services.payload.request.DeleteFriendRequest;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class FriendService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    FriendRepository friendRepository;

    @Autowired
    JwtUtils jwtUtils;

    public ResponseEntity<?> getAllFriends(String username, String authorization) {
        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Set<User> users = new HashSet<>();

        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {

            List<Friend> friends = friendRepository.findByFirstUser(user.get());

            for (Friend friend: friends) {
                users.add(friend.getSecondUser());
            }

            friends = friendRepository.findBySecondUser(user.get());

            for (Friend friend: friends) {
                users.add(friend.getFirstUser());
            }

            return new ResponseEntity<>(users, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> deleteFriend(String username, String authorization, DeleteFriendRequest user) {
        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<User> user1 = userRepository.findById(Math.min(user.getUserId(), user.getToDeleteUserId()));
        Optional<User> user2 = userRepository.findById(Math.max(user.getUserId(), user.getToDeleteUserId()));

        if (user1.isPresent() && user2.isPresent()) {
            Friend friend = friendRepository.findByFirstUserAndSecondUser(user1.get(), user2.get());
            friendRepository.delete(friend);

            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }



}
