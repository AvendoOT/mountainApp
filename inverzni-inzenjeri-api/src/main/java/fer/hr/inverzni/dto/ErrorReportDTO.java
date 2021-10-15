package fer.hr.inverzni.dto;

public class ErrorReportDTO {

    private Long reporterId;

    private Long tripId;

    private String explanation;

    public ErrorReportDTO(Long reporterId, Long tripId, String explanation) {
        this.reporterId = reporterId;
        this.tripId = tripId;
        this.explanation = explanation;
    }

    public Long getReporterId() {
        return reporterId;
    }

    public void setReporterId(Long reporterId) {
        this.reporterId = reporterId;
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
        return "ErrorReportDTO{" +
            "reporterId=" + reporterId +
            ", tripId=" + tripId +
            ", explanation='" + explanation + '\'' +
            '}';
    }

}
