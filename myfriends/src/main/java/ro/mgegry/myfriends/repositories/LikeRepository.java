package ro.mgegry.myfriends.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ro.mgegry.myfriends.models.Like;
import ro.mgegry.myfriends.models.Post;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByPost(Post post);

    boolean existsByUserLikeIdAndPostId(Long userLikeId, Long postId);
}
