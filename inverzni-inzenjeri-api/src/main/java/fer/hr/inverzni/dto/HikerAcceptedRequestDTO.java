package fer.hr.inverzni.dto;

public class HikerAcceptedRequestDTO {

    private Long    requestID;
    private Long    tripID;
    private Long    userID;
    private Boolean accepted;

    public HikerAcceptedRequestDTO(Long requestID, Long tripID, Long userID, Boolean accepted) {
        this.requestID = requestID;
        this.tripID = tripID;
        this.userID = userID;
        this.accepted = accepted;
    }

    public Long getRequestID() {
        return requestID;
    }

    public void setRequestID(Long requestID) {
        this.requestID = requestID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        userID = userID;
    }

    public Long getTripID() {
        return tripID;
    }

    public void setTripID(Long tripID) {
        this.tripID = tripID;
    }

    public Boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }

}
