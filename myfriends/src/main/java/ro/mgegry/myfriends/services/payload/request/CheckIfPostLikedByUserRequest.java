package ro.mgegry.myfriends.services.payload.request;


import lombok.Data;

@Data
public class CheckIfPostLikedByUserRequest {
    Long userId;

    Long postId;
}
