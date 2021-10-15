package fer.hr.inverzni.dto;

import java.util.List;

public class ApproveTripDTO {

    private Long       tripId;
    private List<Long> userIds;

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public List<Long> getUserIds() {
        return userIds;
    }

    public void setUserIds(List<Long> userIds) {
        this.userIds = userIds;
    }

}
