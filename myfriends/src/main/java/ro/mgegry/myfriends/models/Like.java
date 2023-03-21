package ro.mgegry.myfriends.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Table( name = "likes",
        uniqueConstraints = {
        @UniqueConstraint(name = "uniqueLike", columnNames = {"user_like_id", "post_id"})
})
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_like_id", insertable = false, updatable = false)
    private User user;

    @Column(name = "user_like_id")
    private Long userLikeId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_id", insertable = false, updatable = false)
    private Post post;

    @Column(name = "post_id")
    private Long postId;

    public Like(Long userLikeId, Long postId) {
        this.userLikeId = userLikeId;
        this.postId = postId;
    }
}
