package ro.mgegry.myfriends.payload.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorMessageResponse {

    @JsonProperty("field-error")
    private String fieldError;

    private String message;
}