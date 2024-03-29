package ro.mgegry.myfriends.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ro.mgegry.myfriends.models.Friend;
import ro.mgegry.myfriends.models.User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {

    Friend findByFirstUserAndSecondUser(User first, User second);

    @Query("SELECT f FROM Friend f WHERE f.firstUser = ?1 OR f.secondUser = ?1")
    List<Friend> findAllFriendsForUser(User user); // TODO: change method to get a username or an ID as parameter

    @Query("SELECT COUNT(f) FROM Friend f WHERE f.firstUser.id = ?1 OR f.secondUser.id = ?1")
    Long findAllFriendsForUserId(Long id);

    @Query("SELECT f FROM Friend f WHERE " +
            "((f.firstUser.id = ?1 AND f.secondUser.id = ?2) OR " +
            "(f.firstUser.id = ?2 AND f.secondUser.id = ?1))")
    List<Friend> checkIfFriendExists(Long first, Long second);

    @Modifying
    @Query("DELETE FROM Friend f WHERE f.firstUser.id = ?1 OR f.secondUser.id = ?1")
    void deleteAllFriendsForUser(Long userId);
}
