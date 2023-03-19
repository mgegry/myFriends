package ro.mgegry.myfriends.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
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
    List<Friend> findAllFriendsForUser(User user);

    List<Friend> findByFirstUser(User user);
    List<Friend> findBySecondUser(User user);

}
