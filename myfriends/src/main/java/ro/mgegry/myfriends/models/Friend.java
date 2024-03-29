package ro.mgegry.myfriends.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table( name = "friends",
        uniqueConstraints = {
        @UniqueConstraint(name = "uniqueFriendship", columnNames = {"first_user_id", "second_user_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at")
    private Date createdAt;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "first_user_id", referencedColumnName = "id")
    User firstUser;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "second_user_id", referencedColumnName = "id")
    User secondUser;

    public Friend(Date createdAt, User firstUser, User secondUser) {
        this.createdAt = createdAt;
        this.firstUser = firstUser;
        this.secondUser = secondUser;
    }
}
