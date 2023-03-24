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

    List<Like> findByPostId(Long postId);

    List<Like> findByUserId(Long userId);

    boolean existsByUserLikeIdAndPostId(Long userLikeId, Long postId);

    @Modifying
    @Query("DELETE FROM Like l WHERE l.userLikeId =?1 AND l.postId = ?2")
    void deleteLike(Long userId, Long likeId);

    @Modifying
    @Query("DELETE FROM Like l WHERE l.userLikeId = ?1")
    void deleteAllLikesForUser(Long userId);

    @Modifying
    @Query("DELETE FROM Like l WHERE l.postId = ?1")
    void deleteAllLikesForPost(Long postId);
}
