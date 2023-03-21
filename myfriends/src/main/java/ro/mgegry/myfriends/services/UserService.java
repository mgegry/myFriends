package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.mgegry.myfriends.models.User;
import ro.mgegry.myfriends.repositories.UserRepository;
import ro.mgegry.myfriends.security.jwt.JwtUtils;
import ro.mgegry.myfriends.services.payload.request.UpdateProfilePictureRequest;
import ro.mgegry.myfriends.services.payload.response.ProfileResponse;

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

}
