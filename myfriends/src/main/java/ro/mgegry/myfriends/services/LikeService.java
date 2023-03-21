package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.mgegry.myfriends.models.Like;
import ro.mgegry.myfriends.repositories.LikeRepository;
import ro.mgegry.myfriends.services.payload.request.CheckIfPostLikedByUserRequest;

@Service
public class LikeService {

    @Autowired
    LikeRepository likeRepository;

    public ResponseEntity<?> addLike(Like like) {

        return new ResponseEntity<>(likeRepository.save(like), HttpStatus.CREATED);
    }

    public ResponseEntity<?> checkIfPostLikedByUser(Long userId, Long postId) {

        return new ResponseEntity<>(likeRepository.existsByUserLikeIdAndPostId(userId, postId), HttpStatus.OK);
    }
}
