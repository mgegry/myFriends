package ro.mgegry.myfriends.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Set;

import javax.validation.constraints.*;

@Data
public class SignupRequest {

    @NotBlank
    @Size(min = 3, max = 30)
    @JsonProperty("firstname")
    private String firstName;

    @NotBlank
    @Size(min = 3, max = 30)
    @JsonProperty("lastname")
    private String lastName;

    @NotBlank
    @Size(min = 3, max = 30)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private Set<String> role;

    @NotBlank
    @Size(min = 6, max = 120)
    private String password;
}
