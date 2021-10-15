package fer.hr.inverzni.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fer.hr.inverzni.dto.UserDetailsDTO;
import fer.hr.inverzni.dto.UserProfileDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "app_user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String   username;
    private String   password;
    private String   firstName;
    private String   lastName;
    private String   profileImageUrl;
    private String   email;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @ManyToMany
    @JoinTable(
        name = "user_trip",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "trip_id"))
    private List<Trip> visitedTrips = new LinkedList<>();

    @Enumerated(EnumType.STRING)
    private BadgeLevel badge;

    @ManyToMany
    @JoinTable(
        name = "user_favourite_trips",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "trip_id")
    )
    private List<Trip> favouriteTrips = new LinkedList<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
        name = "friends",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "friend_id"))
    private List<User> friends = new LinkedList<>();

    @ManyToMany
    @JoinTable(
        name = "pending_friends",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "friend_id"))
    private List<User> pendingFriends = new LinkedList<>();

    @ManyToMany
    @JoinTable(
        name = "receiver_report",
        joinColumns = @JoinColumn(name = "receiver_id"),
        inverseJoinColumns = @JoinColumn(name = "report_id"))
    private List<ErrorReport> reports;

    @ManyToMany
    @JoinTable(
        name = "user_archived_trips",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "trip_id")
    )
    private List<Trip> archivedTrips = new LinkedList<>();


    public User() {
    }

    public User(String username, String password, String firstName, String lastName,
        String profileImageUrl, UserRole userRole, String email) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImageUrl = profileImageUrl;
        this.userRole = userRole;
        this.email = email;
        this.badge = BadgeLevel.NOTHING;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
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

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(this.getUserRole().name()));
        return authorities;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public List<Trip> getVisitedTrips() {
        return visitedTrips;
    }

    public void setVisitedTrips(List<Trip> visitedTrips) {
        this.visitedTrips = visitedTrips;
    }

    public BadgeLevel getBadge() {
        return badge;
    }

    public void setBadge(BadgeLevel badge) {
        this.badge = badge;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<ErrorReport> getReports() {
        return reports;
    }

    public void setReports(List<ErrorReport> reports) {
        this.reports = reports;
    }

    public List<User> getFriends() {
        return friends;
    }

    public void setFriends(List<User> friends) {
        this.friends = friends;
    }

    public List<User> getPendingFriends() {
        return pendingFriends;
    }

    public void setPendingFriends(List<User> pendingFriends) {
        this.pendingFriends = pendingFriends;

    }

    public List<Trip> getFavouriteTrips() {
        return favouriteTrips;
    }

    public void setFavouriteTrips(List<Trip> favouriteTrips) {
        this.favouriteTrips = favouriteTrips;
    }

    public List<Trip> getArchivedTrips() {
        return archivedTrips;
    }

    public void setArchivedTrips(List<Trip> archivedTrips) {
        this.archivedTrips = archivedTrips;
    }


    public UserDetailsDTO toUserDetailsDTO() {
        return new UserDetailsDTO(this.getId(), this.getUsername(), this.getFirstName(),
            this.getLastName(), this.getUserRole().name(), this.getEmail());
    }

    public UserProfileDTO toUserProfileDTO() {
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setFirstName(this.getFirstName());
        userProfileDTO.setLastName(this.getLastName());
        userProfileDTO.setUsername(this.getUsername());
        userProfileDTO.setId(this.getId());
        userProfileDTO.setEmail(this.getEmail());
        userProfileDTO.setUserRole(this.getUserRole().name());
        userProfileDTO
            .setVisitedTrips(this.getVisitedTrips().stream().map(Trip::tripToTripDTO).collect(Collectors.toList()));

        userProfileDTO
            .setFriends(this.getFriends().stream().map(User::toUserDetailsDTO).collect(Collectors.toList()));

        userProfileDTO
            .setFavouriteTrips(this.getFavouriteTrips().stream().map(Trip::tripToTripDTO).collect(Collectors.toList()));

        userProfileDTO
            .setFavouriteTrips(this.getFavouriteTrips().stream().map(Trip::tripToTripDTO).collect(Collectors.toList()));

        userProfileDTO.setFriends(this.getFriends().stream().map(User::toUserDetailsDTO).collect(Collectors.toList()));
        userProfileDTO.setPendingFriends(
            this.getPendingFriends().stream().map(User::toUserDetailsDTO).collect(Collectors.toList()));
        userProfileDTO.setBadge(this.getBadge() == null ? BadgeLevel.NOTHING.name() : this.getBadge().name());
        return userProfileDTO;
    }

    public void addReport(ErrorReport errorReport) {
        this.getReports().add(errorReport);
    }

    public void removeReport(ErrorReport errorReport) {
        this.getReports().remove(errorReport);
    }

}
