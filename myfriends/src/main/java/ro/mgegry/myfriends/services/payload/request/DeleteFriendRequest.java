package ro.mgegry.myfriends.services.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class DeleteFriendRequest {
    @NotBlank
    private Long userId;

    @NotBlank
    private Long toDeleteUserId;
}
