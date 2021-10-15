package fer.hr.inverzni.service.impl;

import fer.hr.inverzni.dto.MessageDTO;
import fer.hr.inverzni.model.Event;
import fer.hr.inverzni.model.Message;
import fer.hr.inverzni.model.MessageRole;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.repository.MessageRepository;
import fer.hr.inverzni.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final MessageRepository messageRepository;

    @Autowired
    public NotificationServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public Message saveMessage(MessageDTO messageDTO, User to, User from) {
        return messageRepository.save(messageDTO.toMessage(to, from));
    }

    @Override
    public Message saveMessageEvent(MessageDTO messageDTO, User to, Event from) {
        return messageRepository.save(messageDTO.toMessageEvent(to, from));
    }

    @Override
    public Integer countUnseenMessages(User user) {
        return messageRepository.countByToAndSeen(user, false);
    }

    @Override
    public List<MessageDTO> getMessages(User user) {
        final List<Message> messages = messageRepository.getAllByTo(user);
        List<MessageDTO> messageDTOS = new LinkedList<>();
        for (Message message : messages) {
            if (message.getMessageRole().equals(MessageRole.EVENT_REQUEST)) {
                messageDTOS.add(message.toMessageEventDTO());
            } else {
                messageDTOS.add(message.toMessageDTO());
            }
        }
        return messageDTOS;
    }

    @Override
    public Message setMessageSeen(Long messageId) {
        Optional<Message> message = messageRepository.findById(messageId);
        message.get().setSeen(true);
        return messageRepository.save(message.get());
    }

}
