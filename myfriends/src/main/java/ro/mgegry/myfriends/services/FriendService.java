package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.mgegry.myfriends.models.Friend;
import ro.mgegry.myfriends.models.FriendRequest;
import ro.mgegry.myfriends.models.User;
import ro.mgegry.myfriends.repositories.FriendRepository;
import ro.mgegry.myfriends.repositories.FriendRequestRepository;
import ro.mgegry.myfriends.repositories.UserRepository;
import ro.mgegry.myfriends.security.jwt.JwtUtils;
import ro.mgegry.myfriends.services.payload.request.DeleteFriendRequest;
import ro.mgegry.myfriends.services.payload.request.SendFriendRequestRequest;
import ro.mgegry.myfriends.services.payload.response.FriendResponse;
import ro.mgegry.myfriends.services.payload.response.NumberOfFriendsResponse;

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
    FriendRequestRepository friendRequestRepository;

    @Autowired
    JwtUtils jwtUtils;

    public ResponseEntity<?> getAllFriends(String username, String authorization) {
        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Set<FriendResponse> users = new HashSet<>();

        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {

            List<Friend> friends = friendRepository.findByFirstUser(user.get());

            for (Friend friend: friends) {

                User gotUser = friend.getSecondUser();
                FriendResponse toAddFriend = new FriendResponse(
                        gotUser.getId(),
                        gotUser.getFirstName(),
                        gotUser.getLastName(),
                        gotUser.getUsername(),
                        gotUser.getEmail(),
                        friend.getCreatedAt()
                );


                users.add(toAddFriend);
            }

            friends = friendRepository.findBySecondUser(user.get());

            for (Friend friend: friends) {
                User gotUser = friend.getFirstUser();
                FriendResponse toAddFriend = new FriendResponse(
                        gotUser.getId(),
                        gotUser.getFirstName(),
                        gotUser.getLastName(),
                        gotUser.getUsername(),
                        gotUser.getEmail(),
                        friend.getCreatedAt()
                );


                users.add(toAddFriend);
            }

            return new ResponseEntity<>(users, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> deleteFriend(String username, String friend, String authorization) {
        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


        Optional<User> user1 = userRepository.findByUsername(username);
        Optional<User> user2 = userRepository.findByUsername(friend);

        if (user1.isPresent() && user2.isPresent()) {
            Friend friendship;

            if (user1.get().getId() < user2.get().getId()) {
                friendship = friendRepository.findByFirstUserAndSecondUser(user1.get(), user2.get());
            } else {
                friendship = friendRepository.findByFirstUserAndSecondUser(user2.get(), user1.get());
            }
            friendRepository.delete(friendship);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    public ResponseEntity<?> getNumberOfFriendsForUser(Long id) {

        NumberOfFriendsResponse response = new NumberOfFriendsResponse(friendRepository.findAllFriendsForUserId(id));

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    public ResponseEntity<?> checkIfAlreadyFriend(SendFriendRequestRequest requestBody) {

        List<Friend> list = friendRepository.checkIfFriendExists(requestBody.getFromUserId(), requestBody.getToUserId());

        if (list.size() == 0) {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }


        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    public ResponseEntity<?> checkIfInteracted(SendFriendRequestRequest requestBody) {

        boolean interacted = false;

        List<Friend> list = friendRepository.checkIfFriendExists(requestBody.getFromUserId(), requestBody.getToUserId());

        if (list.size() != 0) {
            interacted = true;
        }

        List<FriendRequest> list2 = friendRequestRepository.checkIfFriendRequestExists(requestBody.getFromUserId(), requestBody.getToUserId());

        if (list2.size() != 0) {
            interacted = true;
        }

        return new ResponseEntity<>(interacted, HttpStatus.OK);
    }


}
