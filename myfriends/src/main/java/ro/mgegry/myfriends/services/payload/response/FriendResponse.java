package ro.mgegry.myfriends.services.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class FriendResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private Date createdAt;
}
