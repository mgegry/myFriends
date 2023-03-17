package ro.mgegry.myfriends.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table( name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank
        @Size(max = 30)
        @Column(name = "first_name")
        private String firstName;

        @NotBlank
        @Size(max = 30)
        @Column(name = "last_name")
        private String lastName;

        @NotBlank
        @Size(max = 30)
        private String username;

        @NotBlank
        @Size(max = 50)
        @Email
        private String email;

        @JsonIgnore
        @NotBlank
        @Size(max = 120)
        private String password;

        @Size(max = 255)
        private String bio;

        @Column(name = "is_private")
        private Boolean isPrivate = false;

        @Column(name = "created_at")
        private Date createdAt;

        @JsonIgnore
        @ManyToMany(fetch = FetchType.LAZY)
        @JoinTable( name = "user_roles",
                joinColumns = @JoinColumn(name = "user_id"),
                inverseJoinColumns = @JoinColumn(name = "role_id"))
        private Set<Role> roles = new HashSet<>();

        public User(String username, String email, String password) {
                this.username = username;
                this.email = email;
                this.password = password;
        }

        public User(String firstName, String lastName, String username, String email, String password) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.username = username;
                this.email = email;
                this.password = password;
                this.isPrivate = false;
        }
}
