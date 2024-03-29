package ro.mgegry.myfriends.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import ro.mgegry.myfriends.services.UserService;
import ro.mgegry.myfriends.services.payload.request.UpdateProfilePictureRequest;
import ro.mgegry.myfriends.services.payload.request.UpdateUserRequest;

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
    public ResponseEntity<?> updateUser(@PathVariable String username,
                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
                                        @RequestBody UpdateUserRequest body) {

        return userService.updateUser(username, authorization, body);
    }


    /**
     * Get all users from the database - only for admin
     * @return a list of User objects
     */
    @GetMapping("admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUserAccounts() {
        return userService.getAllUserAccounts();
    }


    /**
     * Delete user from the database - only for admin
     * @param userId the User ID to delete
     * @return status code for the request
     */
    @DeleteMapping("admin/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        return userService.deleteUser(userId);
    }

    @GetMapping("admin/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }
}
