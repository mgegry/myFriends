package ro.mgegry.myfriends.services.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import ro.mgegry.myfriends.models.Comment;
import ro.mgegry.myfriends.models.Like;
import ro.mgegry.myfriends.models.Post;
import ro.mgegry.myfriends.models.User;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class PostResponse {

    private Post post;

    private List<Like> likes;

    private List<Comment> comments;
}
