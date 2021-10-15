package fer.hr.inverzni.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fer.hr.inverzni.dto.GradeDetailsDTO;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "grade")
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long   grade;
    private String comment;

    @JsonIgnore
    @ManyToOne
    private User creator;

    public Grade() {
    }

    public Grade(Long id, Long grade, String comment, User creator) {
        this.id = id;
        this.grade = grade;
        this.comment = comment;
        this.creator = creator;
    }

    public Grade(Long grade, String comment, User creator) {
        this.grade = grade;
        this.comment = comment;
        this.creator = creator;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public GradeDetailsDTO gradeToGradeDetailsDTO() {
        return new GradeDetailsDTO(this.getGrade(), this.getComment(), this.getCreator().getUsername());
    }

}
