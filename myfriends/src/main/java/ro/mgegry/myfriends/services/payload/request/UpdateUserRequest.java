package ro.mgegry.myfriends.services.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class UpdateUserRequest {
    private String username;

    private String firstName;
    private String lastName;

    private String email;

    private String profilePicture;
}
