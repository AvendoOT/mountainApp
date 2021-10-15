package fer.hr.inverzni.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fer.hr.inverzni.dto.ReportDetailsDTO;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "error_report")
public class ErrorReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    private User reporter;

    @JsonIgnore
    @ManyToOne
    private Trip trip;

    private String explanation;

    public ErrorReport() {
    }

    public ErrorReport(Long id, User reporter, Trip trip, String explanation) {
        this.id = id;
        this.reporter = reporter;
        this.trip = trip;
        this.explanation = explanation;
    }

    public ErrorReport(User reporter, Trip trip, String explanation) {
        this.reporter = reporter;
        this.trip = trip;
        this.explanation = explanation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getReporter() {
        return reporter;
    }

    public void setReporter(User reporter) {
        this.reporter = reporter;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public ReportDetailsDTO toErrorReportDetailsDTO() {
        return new ReportDetailsDTO(this.getId(), this.getReporter().getUsername(), this.getTrip().getId(),
            this.getExplanation());
    }

    @Override
    public String toString() {
        return "ErrorReport{" +
            "id=" + id +
            ", reporter=" + reporter +
            ", trip=" + trip +
            ", explanation='" + explanation + '\'' +
            '}';
    }

}
