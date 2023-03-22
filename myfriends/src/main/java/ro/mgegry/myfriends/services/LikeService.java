package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.mgegry.myfriends.models.Like;
import ro.mgegry.myfriends.repositories.LikeRepository;

@Service
public class LikeService {

    @Autowired
    LikeRepository likeRepository;

    public ResponseEntity<?> addLike(Like like) {

        return new ResponseEntity<>(likeRepository.save(like), HttpStatus.CREATED);
    }
    
    @Transactional
    public ResponseEntity<?> deleteLike(Long userId, Long postId) {
        likeRepository.deleteLike(userId, postId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<?> checkIfPostLikedByUser(Long userId, Long postId) {

        return new ResponseEntity<>(likeRepository.existsByUserLikeIdAndPostId(userId, postId), HttpStatus.OK);
    }

    /**
     * Get all the likes for a particular post
     * @param postId the post ID for which to get the likes
     * @return a list containing all the likes
     */
    public ResponseEntity<?> getLikesForPostId(Long postId) {
        return new ResponseEntity<>(likeRepository.findByPostId(postId), HttpStatus.OK);
    }
}
