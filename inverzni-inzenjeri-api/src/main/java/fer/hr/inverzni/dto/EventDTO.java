package fer.hr.inverzni.dto;

public class EventDTO {

    private Long   id;
    private String name;
    private String description;
    private String date;
    private Long   tripID;
    private Long   creatorID;
    private Long[] invitedUsersIDs;
    private Long[] acceptedUsersIDs;

    public EventDTO() {
    }

    public EventDTO(String name, String description, String date, Long tripID, Long creatorID, Long[] invitedUsersIDs, Long[] acceptedUsersIDs) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.tripID = tripID;
        this.creatorID = creatorID;
        this.invitedUsersIDs = invitedUsersIDs;
        this.acceptedUsersIDs = acceptedUsersIDs;
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

    public Long getTripID() {
        return tripID;
    }

    public void setTripID(Long tripID) {
        this.tripID = tripID;
    }

    public Long getCreatorID() {
        return creatorID;
    }

    public void setCreatorID(Long creatorID) {
        this.creatorID = creatorID;
    }

    public Long[] getInvitedUsersIDs() {
        return invitedUsersIDs;
    }

    public void setInvitedUsersIDs(Long[] invitedUsersIDs) {
        this.invitedUsersIDs = invitedUsersIDs;
    }

    public Long[] getAcceptedUsersIDs() {
        return acceptedUsersIDs;
    }

    public void setAcceptedUsersIDs(Long[] acceptedUsersIDs) {
        this.acceptedUsersIDs = acceptedUsersIDs;
    }

    //    public Event toEvent(){
//        return new Event(this.getName(), this.getDescription(), this.getDate(), this.getTrip().toTrip(), this.getCreator(), this.getInvitedUsers());
//    }

}
