package fer.hr.inverzni.dto;

public class HikerRequestDTO {

    private Long id;
    private Long tripID;
    private Long userID;

    public HikerRequestDTO(Long userID, Long tripID) {
        this.tripID = tripID;
        this.userID = userID;
    }

    //    public HikerRequestDTO(Long id, Long userID, Long tripID) {
    //        this.id = id;
    //        this.tripID = tripID;
    //        this.userID = userID;
    //    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTripID() {
        return tripID;
    }

    public void setTripID(Long tripID) {
        tripID = tripID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        userID = userID;
    }

}
