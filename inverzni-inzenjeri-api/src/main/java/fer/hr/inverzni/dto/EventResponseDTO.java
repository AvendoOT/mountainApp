package fer.hr.inverzni.dto;

import java.time.LocalDate;

public class EventResponseDTO {

    private String username;
    private String eventName;
    private Long eventId;
    private LocalDate date;
    private String area;

    public EventResponseDTO(String username, String eventName, Long eventId, LocalDate date, String area) {
        this.username = username;
        this.eventName = eventName;
        this.eventId = eventId;
        this.date = date;
        this.area = area;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

}
