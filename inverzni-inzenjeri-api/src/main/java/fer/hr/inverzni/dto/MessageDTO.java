package fer.hr.inverzni.dto;

import fer.hr.inverzni.model.Event;
import fer.hr.inverzni.model.Message;
import fer.hr.inverzni.model.MessageRole;
import fer.hr.inverzni.model.User;

public class MessageDTO {

    private Long to;
    private Long from;
    private String content;
    private String messageRole;
    private Long id;
    private boolean seen;
    private String name;
    private Long event;

    public MessageDTO() {
    }

    public MessageDTO(Long to, Long from, String content, String messageRole) {
        this.to = to;
        this.from = from;
        this.content = content;
        this.messageRole = messageRole;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getFrom() {
        return from;
    }

    public void setFrom(Long from) {
        this.from = from;
    }

    public Long getTo() {
        return to;
    }

    public void setTo(Long to) {
        this.to = to;
    }

    public String getMessageRole() {
        return messageRole;
    }

    public void setMessageRole(String messageRole) {
        this.messageRole = messageRole;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isSeen() {
        return seen;
    }

    public void setSeen(boolean seen) {
        this.seen = seen;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getEvent() {
        return event;
    }

    public void setEvent(Long event) {
        this.event = event;
    }

    public Message toMessage(User to, User from) {
        Message message = new Message();
        message.setContent(this.content);
        message.setMessageRole(MessageRole.valueOf(this.messageRole));
        message.setTo(to);
        message.setFrom(from);
        message.setSeen(false);
        return message;
    }

    public Message toMessageEvent(User to, Event event) {
        Message message = new Message();
        message.setContent(this.content);
        message.setMessageRole(MessageRole.valueOf(this.messageRole));
        message.setTo(to);
        message.setEvent(event);
        message.setSeen(false);
        return message;
    }

}
