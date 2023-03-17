package ro.mgegry.myfriends.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Table( name = "likes",
        uniqueConstraints = {
        @UniqueConstraint(name = "uniqueLike", columnNames = {"user_like_id", "post_id"})
})
@Entity
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "user_like_id")
    User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_id")
    Post post;
}
