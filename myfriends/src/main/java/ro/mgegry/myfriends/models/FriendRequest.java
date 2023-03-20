package ro.mgegry.myfriends.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "friend_requests",uniqueConstraints = {
        @UniqueConstraint(name = "uniqueFriendRequest", columnNames = {"from_user_id", "to_user_id"})})
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "from_user_id", insertable = false, updatable = false)
    private User fromUser;

    @Column(name = "from_user_id")
    private Long fromUserId;

    @ManyToOne
    @JoinColumn(name = "to_user_id", insertable = false, updatable = false)
    private User toUser;

    @Column(name = "to_user_id")
    private Long toUserId;

    public FriendRequest(Long fromUser, Long toUser) {
        this.fromUserId = fromUser;
        this.toUserId = toUser;
    }
}
