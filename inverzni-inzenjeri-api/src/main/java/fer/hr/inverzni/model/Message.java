package fer.hr.inverzni.model;

import fer.hr.inverzni.dto.MessageDTO;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User to;
    @ManyToOne
    private User from;
    private String content;
    @Enumerated(EnumType.STRING)
    private MessageRole messageRole;
    private boolean seen;
    @ManyToOne
    private Event event;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getTo() {
        return to;
    }

    public void setTo(User to) {
        this.to = to;
    }

    public User getFrom() {
        return from;
    }

    public void setFrom(User from) {
        this.from = from;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public MessageRole getMessageRole() {
        return messageRole;
    }

    public void setMessageRole(MessageRole messageRole) {
        this.messageRole = messageRole;
    }

    public boolean isSeen() {
        return seen;
    }

    public void setSeen(boolean seen) {
        this.seen = seen;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public MessageDTO toMessageDTO() {
        final MessageDTO messageDTO = new MessageDTO();
        messageDTO.setContent(this.content);
        messageDTO.setMessageRole(this.messageRole.name());
        messageDTO.setFrom(this.from.getId());
        messageDTO.setTo(this.to.getId());
        messageDTO.setId(this.id);
        messageDTO.setSeen(this.seen);
        messageDTO.setName(this.from.getFirstName() + " " + this.from.getLastName());
        return messageDTO;
    }

    public MessageDTO toMessageEventDTO() {
        final MessageDTO messageDTO = new MessageDTO();
        messageDTO.setContent(this.content);
        messageDTO.setMessageRole(this.messageRole.name());
        messageDTO.setEvent(this.event.getId());
        messageDTO.setTo(this.to.getId());
        messageDTO.setId(this.id);
        messageDTO.setSeen(this.seen);
        return messageDTO;
    }

}
