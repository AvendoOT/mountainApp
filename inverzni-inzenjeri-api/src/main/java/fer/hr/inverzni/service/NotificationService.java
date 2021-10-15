package fer.hr.inverzni.service;

import fer.hr.inverzni.dto.MessageDTO;
import fer.hr.inverzni.model.Event;
import fer.hr.inverzni.model.Message;
import fer.hr.inverzni.model.User;

import java.util.List;

public interface NotificationService {

    Message saveMessage(MessageDTO messageDTO, User to, User from);

    Message saveMessageEvent(MessageDTO messageDTO, User to, Event from);

    Integer countUnseenMessages(User user);

    List<MessageDTO> getMessages(User user);

    Message setMessageSeen(Long messageId);

}
