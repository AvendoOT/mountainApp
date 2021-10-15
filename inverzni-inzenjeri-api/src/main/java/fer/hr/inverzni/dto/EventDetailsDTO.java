package fer.hr.inverzni.dto;

import fer.hr.inverzni.model.User;

public class EventDetailsDTO {
    private Long    id;
    private String  name;
    private String  description;
    private String  date;
    private TripDTO trip;
    private User    creator;
    private UserDetailsDTO[] invitedUsers;
    private UserDetailsDTO[] acceptedUsers;

    public EventDetailsDTO() {}

    public EventDetailsDTO(Long id, String name, String description, String date, TripDTO trip,
        User creator, UserDetailsDTO[] invitedUsers, UserDetailsDTO[] acceptedUsers) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.trip = trip;
        this.creator = creator;
        this.invitedUsers = invitedUsers;
        this.acceptedUsers = acceptedUsers;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public TripDTO getTrip() {
        return trip;
    }

    public void setTrip(TripDTO trip) {
        this.trip = trip;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public UserDetailsDTO[] getInvitedUsers() {
        return invitedUsers;
    }

    public void setInvitedUsers(UserDetailsDTO[] invitedUsers) {
        this.invitedUsers = invitedUsers;
    }

    public UserDetailsDTO[] getAcceptedUsers() {
        return acceptedUsers;
    }

    public void setAcceptedUsers(UserDetailsDTO[] acceptedUsers) {
        this.acceptedUsers = acceptedUsers;
    }

}
