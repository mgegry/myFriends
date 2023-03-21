package ro.mgegry.myfriends.services.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UpdateProfilePictureRequest {

    @NotBlank
    private String pictureUrl;
}
