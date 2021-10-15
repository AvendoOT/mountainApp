package fer.hr.inverzni.dto;

public class BadgeDTO {

    private Long   id;
    private String badgeLevel;

    public BadgeDTO(Long id, String badgeLevel) {
        this.id = id;
        this.badgeLevel = badgeLevel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBadgeLevel() {
        return badgeLevel;
    }

    public void setBadgeLevel(String badgeLevel) {
        this.badgeLevel = badgeLevel;
    }

}
