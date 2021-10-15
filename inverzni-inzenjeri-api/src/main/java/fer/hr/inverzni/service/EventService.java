package fer.hr.inverzni.service;

import fer.hr.inverzni.dto.EventDetailsDTO;
import fer.hr.inverzni.dto.EventResponseDTO;
import fer.hr.inverzni.model.Event;
import fer.hr.inverzni.model.User;

import java.util.List;

public interface EventService {

    Event createEvent(Event event);

    EventDetailsDTO getEventById(Long eventId);

    List<EventResponseDTO> getFriendEvents(Long id);

    void acceptEventInvitation(Long eventId, User user);

}
