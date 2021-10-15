package fer.hr.inverzni.model;

import fer.hr.inverzni.dto.HikerRequestOtherDTO;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "trip_request")
public class TripRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public TripRequest() {
    }

    public TripRequest(User user, Trip trip) {
        this.trip = trip;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public HikerRequestOtherDTO tripRequestToOtherHikerRequestDTO() {
        return new HikerRequestOtherDTO(this.getId(), this.getUser().getId(), this.getTrip().tripToTripDTO());
    }

}
