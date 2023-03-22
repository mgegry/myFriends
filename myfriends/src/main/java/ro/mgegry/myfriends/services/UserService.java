package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.mgegry.myfriends.models.ERole;
import ro.mgegry.myfriends.models.User;
import ro.mgegry.myfriends.repositories.UserRepository;
import ro.mgegry.myfriends.security.jwt.JwtUtils;
import ro.mgegry.myfriends.services.payload.request.UpdateProfilePictureRequest;
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

    @Transactional
    public ResponseEntity<?> updateProfilePicture(String token, UpdateProfilePictureRequest body) {

        String username = jwtUtils.getUserNameFromJwtToken(token.substring(7));
        String url = body.getPictureUrl();

        userRepository.updateProfilePicture(username, url);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
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
        userRepository.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
