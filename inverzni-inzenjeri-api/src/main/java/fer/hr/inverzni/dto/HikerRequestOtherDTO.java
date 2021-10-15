package fer.hr.inverzni.dto;

public class HikerRequestOtherDTO {

    private Long    id;
    private TripDTO trip;
    private Long    userID;
    //private Long tripID;
    //private boolean accepted;

    //    public HikerRequestOtherDTO(Long id, Long tripID, Long userID, boolean accepted) {
    //        this.id = id;
    //        this.tripID = tripID;
    //        this.userID = userID;
    //        this.accepted = accepted;
    //    }

    public HikerRequestOtherDTO(Long id, Long userID, TripDTO trip) {
        this.id = id;
        this.trip = trip;
        this.userID = userID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TripDTO getTrip() {
        return trip;
    }

    public void setTrip(TripDTO trip) {
        trip = trip;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        userID = userID;
    }

    //    public boolean isAccepted() {
    //        return accepted;
    //    }
    //
    //    public void setAccepted(boolean accepted) {
    //        this.accepted = accepted;
    //    }
    //
    //    public Long getTripID() {
    //        return tripID;
    //    }
    //
    //    public void setTripID(Long tripID) {
    //        this.tripID = tripID;
    //    }
}
