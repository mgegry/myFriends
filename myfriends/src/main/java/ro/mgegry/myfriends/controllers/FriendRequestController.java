package ro.mgegry.myfriends.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.mgegry.myfriends.services.FriendRequestService;
import ro.mgegry.myfriends.services.payload.request.SendFriendRequestRequest;

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

    @PostMapping("/{username}/sendRequest")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> sendFriendRequest(@PathVariable String username,
                                               @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
                                               @RequestBody SendFriendRequestRequest requestBody) {
        return friendRequestService.sendFriendRequest(username, authorization, requestBody);
    }

    @PostMapping("/{username}/acceptRequest/{friend}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable String username,
                                                 @PathVariable String friend,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        return friendRequestService.acceptFriendRequest(username, friend, authorization);
    }

    @DeleteMapping("/{username}/declineRequest/{friend}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> declineFriendRequest(@PathVariable String username,
                                                 @PathVariable String friend,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        return friendRequestService.declineFriendRequest(username, friend, authorization);
    }

    @PostMapping("/checkIfFriendRequest")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> checkIfFriendRequestExists(@RequestBody SendFriendRequestRequest requestBody) {
        return new ResponseEntity<>(friendRequestService.checkIfFriendRequestExists(requestBody), HttpStatus.OK);
    }
}
