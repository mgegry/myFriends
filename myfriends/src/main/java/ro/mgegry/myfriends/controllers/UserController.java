package ro.mgegry.myfriends.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.mgegry.myfriends.services.UserService;
import ro.mgegry.myfriends.services.payload.request.UpdateProfilePictureRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{username}/info")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getUser(@PathVariable String username,
                                     @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        return userService.getUser(username, authorization);
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getProfile(@PathVariable String username) {
        return userService.getProfile(username);
    }

    @PutMapping("/{username}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?>  updateProfilePicture(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
                                                   @RequestBody UpdateProfilePictureRequest body) {
        return userService.updateProfilePicture(authorization, body);
    }


    /**
     * Get all users from the database - only for admin
     * @return a list of User objects
     */
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUserAccounts() {
        return userService.getAllUserAccounts();
    }
}
