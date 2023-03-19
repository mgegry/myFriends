package ro.mgegry.myfriends.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.mgegry.myfriends.services.FriendRequestService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FriendRequestController {

    @Autowired
    FriendRequestService friendRequestService;

    @GetMapping("/{username}/requests")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getAllFriendRequestForUser(@PathVariable String username,
                                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        return friendRequestService.getAllFriendRequestsForUser(username, authorization);
    }

    @PostMapping("/{username}/acceptRequest/{friend}")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable String username,
                                                 @PathVariable String friend,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        return friendRequestService.acceptFriendRequest(username, friend, authorization);
    }

    @DeleteMapping("/{username}/acceptRequest/{friend}")
    public ResponseEntity<?> declineFriendRequest(@PathVariable String username,
                                                 @PathVariable String friend,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        return friendRequestService.declineFriendRequest(username, friend, authorization);
    }
}
