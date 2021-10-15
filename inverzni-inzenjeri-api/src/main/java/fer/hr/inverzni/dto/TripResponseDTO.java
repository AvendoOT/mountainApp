package fer.hr.inverzni.dto;

public class TripResponseDTO {

    private String username;
    private Long tripId;
    private String peak;
    private String area;

    public TripResponseDTO(String name, Long tripId, String peak, String area) {
        this.username = name;
        this.tripId = tripId;
        this.peak = peak;
        this.area = area;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public String getPeak() {
        return peak;
    }

    public void setPeak(String peak) {
        this.peak = peak;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

}
