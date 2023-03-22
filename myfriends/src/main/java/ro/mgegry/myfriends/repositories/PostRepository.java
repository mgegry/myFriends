package ro.mgegry.myfriends.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ro.mgegry.myfriends.models.Post;
import ro.mgegry.myfriends.models.User;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user);

    List<Post> findByUserId(Long userId);

    @Modifying
    @Query("DELETE FROM Post p WHERE p.userId = ?1")
    void deletePostsForUser(Long userId);
}
