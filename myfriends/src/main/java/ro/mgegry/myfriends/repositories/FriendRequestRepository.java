package ro.mgegry.myfriends.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ro.mgegry.myfriends.models.FriendRequest;

import java.util.List;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    @Query("SELECT f FROM FriendRequest f WHERE f.toUser.username = ?1")
    List<FriendRequest> findFriendRequestsForUser(String username);

    @Modifying
    @Query("DELETE FROM FriendRequest f WHERE f.fromUserId = ?1 AND f.toUserId = ?2")
    void deleteFriendRequest(Long fromUser, Long toUser);

    @Query("SELECT f FROM FriendRequest f WHERE ((f.fromUserId = ?1 AND f.toUserId = ?2) OR (f.fromUserId = ?2 AND f.toUserId = ?1))")
    List<FriendRequest> checkIfFriendRequestExists(Long first, Long second);
}
