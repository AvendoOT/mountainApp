package fer.hr.inverzni.dto;

public class GradeDetailsDTO {

    private Long   grade;
    private String comment;
    private String creatorUsername;

    public GradeDetailsDTO(Long grade, String comment, String creatorUsername) {
        this.grade = grade;
        this.comment = comment;
        this.creatorUsername = creatorUsername;
    }

    public String getCreatorUsername() {
        return creatorUsername;
    }

    public void setCreatorUsername(String creatorUsername) {
        this.creatorUsername = creatorUsername;
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

}
