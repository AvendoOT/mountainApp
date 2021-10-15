package fer.hr.inverzni.model;

import fer.hr.inverzni.dto.EventDTO;
import fer.hr.inverzni.dto.EventDetailsDTO;
import fer.hr.inverzni.dto.UserDetailsDTO;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String    name;
    private String    description;
    private LocalDate date;

    @ManyToMany
    @JoinTable(
        name = "event_user",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> invitedUsers = new LinkedList<>();

    @ManyToMany
    @JoinTable(
        name = "event_user_accepted",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> acceptedUsers = new LinkedList<>();

    @ManyToOne
    @JoinColumn(name = "event_trip_id")
    private Trip trip;

    @ManyToOne
    @JoinColumn(name = "event_user_id")
    private User creator;

    public Event() {
    }

    public Event(String name, String description, LocalDate date, Trip trip, User creator, List<User> invitedUsers) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.trip = trip;
        this.creator = creator;
        this.invitedUsers = invitedUsers;
        this.acceptedUsers = new LinkedList<>();
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<User> getInvitedUsers() {
        return invitedUsers;
    }

    public void setInvitedUsers(List<User> invitedUsers) {
        this.invitedUsers = invitedUsers;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public List<User> getAcceptedUsers() {
        return acceptedUsers;
    }

    public void setAcceptedUsers(List<User> acceptedUsers) {
        this.acceptedUsers = acceptedUsers;
    }

    public EventDTO toEventDTO() {
        EventDTO eventDTO = new EventDTO();
        eventDTO.setName(this.getName());
        eventDTO.setDescription(this.getDescription());
        DateTimeFormatter europeanDateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        eventDTO.setDate(this.getDate().format(europeanDateFormatter));
        eventDTO.setAcceptedUsersIDs(this.getAcceptedUsers().stream().map(User::getId).collect(Collectors.toList()).toArray(Long[]::new));
        eventDTO.setInvitedUsersIDs(this.getInvitedUsers().stream().map(User::getId).collect(Collectors.toList()).toArray(Long[]::new));
        eventDTO.setId(this.getId());
        eventDTO.setTripID(this.getTrip().getId());
        eventDTO.setCreatorID(this.getCreator().getId());
        return eventDTO;
    }

    public EventDetailsDTO toEventDetailsDTO() {
        EventDetailsDTO eventDetailsDTO = new EventDetailsDTO();
        eventDetailsDTO.setName(this.getName());
        eventDetailsDTO.setDescription(this.getDescription());
        DateTimeFormatter europeanDateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        eventDetailsDTO.setDate(this.getDate().format(europeanDateFormatter));
        eventDetailsDTO.setAcceptedUsers(this.getAcceptedUsers().stream().map(User::toUserDetailsDTO).collect(Collectors.toList()).toArray(
            UserDetailsDTO[]::new));
        eventDetailsDTO.setInvitedUsers(this.getInvitedUsers().stream().map(User::toUserDetailsDTO).collect(Collectors.toList()).toArray(
            UserDetailsDTO[]::new));
        eventDetailsDTO.setId(this.getId());
        eventDetailsDTO.setTrip(this.getTrip().tripToTripDTO());
        eventDetailsDTO.setCreator(this.getCreator());
        return eventDetailsDTO;
    }

    @Override
    public String toString() {
        return "Event{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", description='" + description + '\'' +
            ", date='" + date + '\'' +
            ", invitedUsers=" + invitedUsers +
            ", trip=" + trip +
            ", creator=" + creator +
            '}';
    }

}
