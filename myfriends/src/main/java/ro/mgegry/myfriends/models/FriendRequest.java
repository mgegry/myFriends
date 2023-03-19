package ro.mgegry.myfriends.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "friend_requests",uniqueConstraints = {
        @UniqueConstraint(name = "uniqueFriendRequest", columnNames = {"from_user_id", "to_user_id"})})
public class FriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_user_id", insertable = false, updatable = false)
    private User fromUser;
    @ManyToOne
    @JoinColumn(name = "to_user_id", insertable = false, updatable = false)
    private User toUser;
}
