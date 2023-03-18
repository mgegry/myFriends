package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import ro.mgegry.myfriends.models.User;
import ro.mgegry.myfriends.repositories.UserRepository;
import ro.mgegry.myfriends.security.jwt.JwtUtils;

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

}
