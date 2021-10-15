package fer.hr.inverzni.service.impl;

import fer.hr.inverzni.dto.EventDetailsDTO;
import fer.hr.inverzni.dto.EventResponseDTO;
import fer.hr.inverzni.exception.EventNotFoundException;
import fer.hr.inverzni.model.Event;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.repository.EventRepository;
import fer.hr.inverzni.repository.UserRepository;
import fer.hr.inverzni.service.EventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    private static final Logger LOG = LoggerFactory.getLogger(EventServiceImpl.class);
    private EventRepository eventRepository;
    private UserRepository userRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Event createEvent(Event event) {
        try {
            LOG.info("Creating event -> " + event.toString());
            Event newEvent = eventRepository.save(event);
            return newEvent;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public EventDetailsDTO getEventById(Long eventId) {
        Optional<Event> event = eventRepository.findById(eventId);
        if (event.isEmpty()) {
            throw new EventNotFoundException("Even with id " + eventId + " does not exist.");
        }
        return event.get().toEventDetailsDTO();
    }

    public List<EventResponseDTO> getFriendEvents(Long id) {
        final Optional<User> user = userRepository.findById(id);
        final List<EventResponseDTO> eventResponseDTOS = new LinkedList<>();
        final List<Event> events = eventRepository.findAll();
        for (final Event event : events) {
            for (final User friend : user.get().getFriends()) {
                if (event.getCreator().equals(friend)) {
                    eventResponseDTOS.add(new EventResponseDTO(
                        friend.getFirstName() + " " +
                            friend.getLastName(), event.getName(),
                        event.getId(), event.getDate(), event.getTrip().getArea().getName()
                    ));
                }
            }
        }
        return eventResponseDTOS;
    }

    @Override
    public void acceptEventInvitation(Long eventId, User user) {
        Optional<Event> event = eventRepository.findById(eventId);
        event.ifPresent(value -> {
            value.getInvitedUsers().remove(user);
            value.getAcceptedUsers().add(user);
            eventRepository.save(event.get());
        });
    }

}
