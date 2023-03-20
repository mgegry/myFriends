package ro.mgegry.myfriends.services.payload.request;

import lombok.Data;

@Data
public class SendFriendRequestRequest {
    private Long fromUserId;

    private Long toUserId;
}
