package ro.mgegry.myfriends.services.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileResponse {
    private Long id;

    private String firstName;

    private String lastName;

    private String username;

    private String bio;
}
