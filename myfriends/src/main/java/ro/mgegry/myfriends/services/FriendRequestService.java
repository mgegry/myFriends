package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.mgegry.myfriends.repositories.FriendRequestRepository;
import ro.mgegry.myfriends.security.jwt.JwtUtils;

@Service
public class FriendRequestService {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    FriendRequestRepository friendRequestRepository;

    public ResponseEntity<?> getAllFriendRequestsForUser(String username, String authorization) {

        if (!jwtUtils.checkAuthorizationForUsername(username, authorization)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(friendRequestRepository.findFriendRequestsForUser(username), HttpStatus.OK);
    }

}
