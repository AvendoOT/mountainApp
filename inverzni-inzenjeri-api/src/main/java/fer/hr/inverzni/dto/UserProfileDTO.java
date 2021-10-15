package fer.hr.inverzni.dto;

import java.util.List;

public class UserProfileDTO {

    private Long                 id;
    private String               username;
    private String               firstName;
    private String               lastName;
    private String               userRole;
    private List<TripDTO>        visitedTrips;
    private String               badge;
    private String               email;
    private List<UserDetailsDTO> friends;
    private List<UserDetailsDTO> pendingFriends;
    private List<TripDTO>        favouriteTrips;

    public UserProfileDTO() {
    }

    public UserProfileDTO(Long id, String username, String firstName, String lastName, String userRole,
        List<TripDTO> visitedTrips, String badge, List<UserDetailsDTO> friends, List<UserDetailsDTO> pendingFriends,
        List<TripDTO> favouriteTrips) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userRole = userRole;
        this.visitedTrips = visitedTrips;
        this.badge = badge;
        this.friends = friends;
        this.pendingFriends = pendingFriends;
        this.favouriteTrips = favouriteTrips;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public List<TripDTO> getVisitedTrips() {
        return visitedTrips;
    }

    public void setVisitedTrips(List<TripDTO> visitedTrips) {
        this.visitedTrips = visitedTrips;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<UserDetailsDTO> getFriends() {
        return friends;
    }

    public void setFriends(List<UserDetailsDTO> friends) {
        this.friends = friends;
    }

    public List<UserDetailsDTO> getPendingFriends() {
        return pendingFriends;
    }

    public void setPendingFriends(List<UserDetailsDTO> pendingFriends) {
        this.pendingFriends = pendingFriends;
    }

    public List<TripDTO> getFavouriteTrips() {
        return favouriteTrips;
    }

    public void setFavouriteTrips(List<TripDTO> favouriteTrips) {
        this.favouriteTrips = favouriteTrips;
    }

}
