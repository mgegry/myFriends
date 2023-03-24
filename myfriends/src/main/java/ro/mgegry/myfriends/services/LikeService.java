package ro.mgegry.myfriends.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.mgegry.myfriends.models.Like;
import ro.mgegry.myfriends.models.Post;
import ro.mgegry.myfriends.repositories.LikeRepository;
import ro.mgegry.myfriends.repositories.PostRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    PostRepository postRepository;

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

    public ResponseEntity<?> getLikesForUserId(Long userId) {
        List<Like> likes = likeRepository.findByUserId(userId);
        List<Post> posts = new ArrayList<>();

        for (Like l : likes) {

            Optional<Post> post = postRepository.findById(l.getPostId());

            post.ifPresent(posts::add);
        }

        return  new ResponseEntity<>(posts, HttpStatus.OK);
    }
}
