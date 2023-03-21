package ro.mgegry.myfriends.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "posts")
@Data
public class Post implements Comparable<Post>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "post_id")
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "post_id")
    private List<Like> likes;

    @Override
    public int compareTo(Post o) {
        return createdAt.compareTo(o.createdAt);
    }
}
