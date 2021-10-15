package fer.hr.inverzni.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fer.hr.inverzni.dto.TripDTO;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "trip")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer             duration;
    private Integer             difficulty;
    private String              description;
    private String              peak;
    private Boolean             local;
    @ManyToMany
    @JoinTable(
        name = "trip_cabin",
        joinColumns = @JoinColumn(name = "trip_id"),
        inverseJoinColumns = @JoinColumn(name = "cabin_id"))
    private List<MountainCabin> mountainCabins = new LinkedList<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
        name = "trip_user",
        joinColumns = @JoinColumn(name = "trip_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> hikers = new LinkedList<>();

    @ManyToOne
    @JoinColumn(name = "trip_area_id")
    private Area area;

    @ManyToMany
    @JoinTable(
        name = "trip_reviewer",
        joinColumns = @JoinColumn(name = "trip_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> reviewers;


    @ManyToMany
    @JoinTable(
        name = "trip_grade",
        joinColumns = @JoinColumn(name = "trip_id"),
        inverseJoinColumns = @JoinColumn(name = "grade_id"))
    private List<Grade> grades = new LinkedList<>();

    private Double length;

    @JsonIgnore
    @ManyToOne
    private User creator;

    @ManyToOne
    private User hikerOnCall;

    public Trip() {
    }

    public Trip(Long id, Integer duration, Integer difficulty, String description, String peak,
        Boolean local, List<MountainCabin> mountainCabins, List<User> hikers,
        Area area, List<Grade> grades, Double length, User creator) {
        this.id = id;
        this.duration = duration;
        this.difficulty = difficulty;
        this.description = description;
        this.peak = peak;
        this.local = local;
        this.mountainCabins = mountainCabins;
        this.hikers = hikers;
        this.area = area;
        this.grades = grades;
        this.length = length;
        this.creator = creator;
    }

    public Trip(Integer duration, Integer difficulty, String description, String peak, Boolean local, Double length) {
        this.duration = duration;
        this.difficulty = difficulty;
        this.description = description;
        this.peak = peak;
        this.local = local;
        this.length = length;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Integer difficulty) {
        this.difficulty = difficulty;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPeak() {
        return peak;
    }

    public void setPeak(String peak) {
        this.peak = peak;
    }

    public Boolean getPrivate() {
        return local;
    }

    public void setPrivate(Boolean aPrivate) {
        local = aPrivate;
    }

    public List<MountainCabin> getMountainCabins() {
        return mountainCabins;
    }

    public void setMountainCabins(List<MountainCabin> mountainCabins) {
        this.mountainCabins = mountainCabins;
    }

    public List<User> getHikers() {
        return hikers;
    }

    public void setHikers(List<User> hikers) {
        this.hikers = hikers;
    }

    public Boolean getLocal() {
        return local;
    }

    public void setLocal(Boolean local) {
        this.local = local;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public List<Grade> getGrades() {
        return grades;
    }

    public void setGrades(List<Grade> grades) {
        this.grades = grades;
    }

    public Double getLength() {
        return length;
    }

    public void setLength(Double length) {
        this.length = length;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public List<User> getReviewers() {
        return reviewers;
    }

    public void setReviewers(List<User> reviewers) {
        this.reviewers = reviewers;
    }

    public void addNewReviewer(User reviewer) {
        if (!this.getReviewers().contains(reviewer)) {
            this.getReviewers().add(reviewer);
        }
    }


    public TripDTO tripToTripDTO() {
        TripDTO tripDTO = new TripDTO();
        tripDTO.setDescription(this.getDescription());
        tripDTO.setDifficulty(this.getDifficulty());
        tripDTO.setDuration(this.getDuration());
        tripDTO.setPeak(this.getPeak());
        tripDTO.setId(this.getId());
        tripDTO.setArea(this.getArea().getName());
        tripDTO.setLength(this.getLength());
        tripDTO.setCreatorId(this.getCreator().getId());
        try {
            tripDTO.setRate(this.getGrades().stream().mapToLong(Grade::getGrade).sum() / this.getGrades().size());
        } catch (ArithmeticException e) {
            tripDTO.setRate((long) 1);
        }
        tripDTO.setCabins(
            this.getMountainCabins().stream().map(MountainCabin::cabinToCabinDTO).collect(Collectors.toList()));
        tripDTO.setCreatorId(this.getCreator() != null ? this.getCreator().getId() : null);
        tripDTO.setHikerOnCallId(this.getHikerOnCall() != null ? this.getHikerOnCall().getId() : null);
        return tripDTO;
    }

    public void addGrade(Grade grade) {
        this.getGrades().add(grade);
    }

    public User getHikerOnCall() {
        return hikerOnCall;
    }

    public void setHikerOnCall(User hikerOnCall) {
        this.hikerOnCall = hikerOnCall;
    }

    @Override
    public String toString() {
        return "Trip{" +
            "id=" + id +
            ", duration=" + duration +
            ", difficulty=" + difficulty +
            ", description='" + description + '\'' +
            ", peak='" + peak + '\'' +
            ", local=" + local +
            ", mountainCabins=" + mountainCabins +
            ", hikers=" + hikers +
            ", area=" + area +
            ", grades=" + grades +
            ", length=" + length +
            ", creator=" + creator +
            '}';
    }

}
