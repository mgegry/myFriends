package ro.mgegry.myfriends.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ro.mgegry.myfriends.models.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String username);

    @Query("SELECT u FROM User u WHERE u.username LIKE %?1%")
    List<User> getSearch(String username);

    @Modifying
    @Query("DELETE FROM User u WHERE u.id = ?1")
    void deleteUser(Long userId);
}
