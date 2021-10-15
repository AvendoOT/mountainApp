package fer.hr.inverzni.dto;

public class GradeDTO {

    private Long   grade;
    private String comment;
    private Long   creatorId;
    private Long   tripId;

    public GradeDTO(Long grade, String comment, Long creatorId) {
        this.grade = grade;
        this.comment = comment;
        this.creatorId = creatorId;
    }

    public Long getGrade() {
        return grade;
    }

    public void setGrade(Long grade) {
        this.grade = grade;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    @Override
    public String toString() {
        return "GradeDTO{" +
            "grade=" + grade +
            ", comment='" + comment + '\'' +
            ", creatorId=" + creatorId +
            ", tripId=" + tripId +
            '}';
    }

}
