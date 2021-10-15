package fer.hr.inverzni.dto;

import fer.hr.inverzni.customValidation.PasswordMatcher;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.model.UserRole;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@PasswordMatcher
public class CreateUserDTO {

    @NotNull
    private String username;
    @NotNull
    private String password;
    @NotNull
    private String matchingPassword;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    @Email(message = "Email should be valid.")
    private String email;
    private String profileImageUrl;
    private String userRole;

    public CreateUserDTO() {
    }

    public CreateUserDTO(String username, String password, String matchingPassword, String firstName,
        String lastName, String profileImageUrl, String userRole, String email) {
        this.username = username;
        this.password = password;
        this.matchingPassword = matchingPassword;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImageUrl = profileImageUrl;
        this.userRole = userRole;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMatchingPassword() {
        return matchingPassword;
    }

    public void setMatchingPassword(String matchingPassword) {
        this.matchingPassword = matchingPassword;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User toUser() {
        return new User(this.getUsername(), this.getPassword(), this.getFirstName(),
            this.getLastName(), this.getProfileImageUrl(), UserRole.HIKER, this.getEmail());
    }

}
