package ro.mgegry.myfriends.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ro.mgegry.myfriends.models.Friend;
import ro.mgegry.myfriends.models.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {

    Boolean existsByFirstUserAndSecondUser(User first, User second);

    Friend findByFirstUserAndSecondUser(User first, User second);

    List<Friend> findByFirstUser(User user);
    List<Friend> findBySecondUser(User user);

}
