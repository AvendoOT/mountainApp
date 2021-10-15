package fer.hr.inverzni.dto;

public class ReportDetailsDTO {

    private Long id;

    private String reporterUsername;
    private Long   tripId;
    private String explanation;

    public ReportDetailsDTO(Long id, String reporterUsername, Long tripId, String explanation) {
        this.id = id;
        this.reporterUsername = reporterUsername;
        this.tripId = tripId;
        this.explanation = explanation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReporterUsername() {
        return reporterUsername;
    }

    public void setReporterUsername(String reporterUsername) {
        this.reporterUsername = reporterUsername;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    @Override
    public String toString() {
        return "ErrorReportDetailsDTO{" +
            "reporterUsername='" + reporterUsername + '\'' +
            ", tripId=" + tripId +
            ", explanation='" + explanation + '\'' +
            '}';
    }

}
