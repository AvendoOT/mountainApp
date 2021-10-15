package fer.hr.inverzni.dto;

import fer.hr.inverzni.model.Trip;

import java.util.List;

public class TripDTO {

    private Long           id;
    private Integer        duration;
    private Integer        difficulty;
    private String         description;
    private String         peak;
    private String         area;
    private Double         length;
    private Long           rate;
    private Boolean        local;
    private List<CabinDTO> cabins;
    private Long           creatorId;
    private Long           hikerOnCallId;

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Double getLength() {
        return length;
    }

    public void setLength(Double length) {
        this.length = length;
    }

    public Long getRate() {
        return rate;
    }

    public void setRate(Long rate) {
        this.rate = rate;
    }

    public Boolean getLocal() {
        return local;
    }

    public void setLocal(Boolean local) {
        this.local = local;
    }

    public List<CabinDTO> getCabins() {
        return cabins;
    }

    public void setCabins(List<CabinDTO> cabins) {
        this.cabins = cabins;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public Long getHikerOnCallId() {
        return hikerOnCallId;
    }

    public void setHikerOnCallId(Long hikerOnCallId) {
        this.hikerOnCallId = hikerOnCallId;
    }

    public Trip toTrip() {
        return new Trip(this.getDuration(), this.getDifficulty(), this.getDescription(), this.getPeak(),
            this.getLocal(), this.getLength());
    }

    @Override
    public String toString() {
        return "TripDTO{" +
            "id=" + id +
            ", duration=" + duration +
            ", difficulty=" + difficulty +
            ", description='" + description + '\'' +
            ", peak='" + peak + '\'' +
            ", area='" + area + '\'' +
            ", length=" + length +
            ", rate=" + rate +
            ", cabins=" + cabins.toString();
    }

}
