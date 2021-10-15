package fer.hr.inverzni.dto;

public class BadgeResponseDTO {

    private String username;
    private String badge;
    private Long userId;

    public BadgeResponseDTO(String username, String badge, Long userId) {
        this.username = username;
        this.badge = badge;
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
