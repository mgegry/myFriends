package ro.mgegry.myfriends.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import ro.mgegry.myfriends.services.FriendService;
import ro.mgegry.myfriends.services.payload.request.DeleteFriendRequest;
import ro.mgegry.myfriends.services.payload.request.SendFriendRequestRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class FriendController {

    @Autowired
    FriendService friendService;

    @GetMapping("/{username}/friends")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getAllFriends(@PathVariable String username,
                                           @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        return friendService.getAllFriends(username, authorization);
    }

    @DeleteMapping("{username}/friends/{friendUsername}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteFriend(@PathVariable String username, @PathVariable String friendUsername,
                                          @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization
    ){
        return friendService.deleteFriend(username, friendUsername, authorization);
    }

    @GetMapping("/{userId}/friends/number")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getNumberOfFriendsForUser(@PathVariable Long userId) {
        return friendService.getNumberOfFriendsForUser(userId);
    }

    @PostMapping("/checkIfFriend")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> checkIfAlreadyFriend(@RequestBody SendFriendRequestRequest requestBody) {
        return new ResponseEntity<>(friendService.checkIfAlreadyFriend(requestBody), HttpStatus.OK);
    }

    @PostMapping("/checkIfInteracted")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> checkIfInteracted(@RequestBody SendFriendRequestRequest requestBody) {
        return new ResponseEntity<>(friendService.checkIfInteracted(requestBody), HttpStatus.OK);
    }

}
