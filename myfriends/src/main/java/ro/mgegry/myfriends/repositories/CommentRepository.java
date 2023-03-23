package ro.mgegry.myfriends.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ro.mgegry.myfriends.models.Comment;
import ro.mgegry.myfriends.models.Post;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);

    List<Comment> findByPostId(Long postId);

    List<Comment> findByUserId(Long userId);

    @Modifying
    @Query("DELETE FROM Comment c WHERE c.userId = ?1")
    void deleteCommentsForUser(Long userId);

    @Modifying
    @Query("DELETE FROM Comment c WHERE c.postId = ?1")
    void deleteCommentsForPost(Long postId);

    void deleteCommentById(Long id);
}
