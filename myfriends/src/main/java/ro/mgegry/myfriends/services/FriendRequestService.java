package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.mgegry.myfriends.models.Friend;
import ro.mgegry.myfriends.models.FriendRequest;
import ro.mgegry.myfriends.models.User;
import ro.mgegry.myfriends.repositories.FriendRepository;
import ro.mgegry.myfriends.repositories.FriendRequestRepository;
import ro.mgegry.myfriends.repositories.UserRepository;
import ro.mgegry.myfriends.security.jwt.JwtUtils;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FriendRequestService {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    FriendRequestRepository friendRequestRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FriendRepository friendRepository;

    public ResponseEntity<?> getAllFriendRequestsForUser(String username, String authorization) {

        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<FriendRequest> friendRequests = friendRequestRepository.findFriendRequestsForUser(username);
        List<User> users = new ArrayList<>();

        for (FriendRequest fr : friendRequests) {
            Optional<User> userOptional = userRepository.findById(fr.getFromUserId());

            if (userOptional.isPresent()) {
                users.add(userOptional.get());
            }
        }

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> acceptFriendRequest(String username, String friend, String authorization) {
        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<User> fromUserOptional = userRepository.findByUsername(friend);
        Optional<User> toUserOptional = userRepository.findByUsername(username);

        if (!fromUserOptional.isPresent() || !toUserOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User fromUser = fromUserOptional.get();
        User toUser = toUserOptional.get();

        friendRequestRepository.deleteFriendRequest(fromUser.getId(), toUser.getId());

        Friend friendShip;

        if (fromUser.getId() < toUser.getId()) {

            friendShip = new Friend(
                    new Timestamp(new Date().getTime()),
                    fromUser,
                    toUser
            );
        } else {
            friendShip = new Friend(
                    new Timestamp(new Date().getTime()),
                    toUser,
                    fromUser
            );
        }

        return new ResponseEntity<>(friendRepository.save(friendShip), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> declineFriendRequest(String username, String friend, String authorization) {
        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


        Optional<User> fromUserOptional = userRepository.findByUsername(friend);
        Optional<User> toUserOptional = userRepository.findByUsername(username);

        if (!fromUserOptional.isPresent() || !toUserOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User fromUser = fromUserOptional.get();
        User toUser = toUserOptional.get();

        friendRequestRepository.deleteFriendRequest(fromUser.getId(), toUser.getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
