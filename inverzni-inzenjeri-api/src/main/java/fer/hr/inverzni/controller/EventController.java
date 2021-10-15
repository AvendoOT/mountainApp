package fer.hr.inverzni.controller;

import fer.hr.inverzni.dto.EventDTO;
import fer.hr.inverzni.dto.EventDetailsDTO;
import fer.hr.inverzni.dto.MessageDTO;
import fer.hr.inverzni.exception.EventNotFoundException;
import fer.hr.inverzni.model.Event;
import fer.hr.inverzni.model.MessageRole;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.service.EventService;
import fer.hr.inverzni.service.NotificationService;
import fer.hr.inverzni.service.TripService;
import fer.hr.inverzni.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private static final Logger LOG = LoggerFactory.getLogger(EventController.class);
    private final TripService tripService;
    private final UserService userService;
    private final EventService eventService;
    private final NotificationService notificationService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public EventController(TripService tripService, UserService userService, EventService eventService,
        NotificationService notificationService, SimpMessagingTemplate simpMessagingTemplate) {
        this.tripService = tripService;
        this.userService = userService;
        this.eventService = eventService;
        this.notificationService = notificationService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @PostMapping("/create")
    public ResponseEntity<Event> createEvent(@ModelAttribute EventDTO eventDTO) {
        LocalDate date = LocalDate.parse(eventDTO.getDate());
        Event newEvent =
            new Event(eventDTO.getName(), eventDTO.getDescription(), date, tripService.findById(eventDTO.getTripID()),
                userService.findById(eventDTO.getCreatorID()),
                Arrays.stream(eventDTO.getInvitedUsersIDs()).map(userService::findById)
                    .collect(Collectors.toList()));
        LOG.info("Creating event controller -> " + newEvent.getCreator().getFirstName());
        Event event;
        try {
            event = eventService.createEvent(newEvent);
        } catch (Exception e) {
            LOG.error("Failed to create event");
            return ResponseEntity.badRequest().build();
        }
        for (Long userId : eventDTO.getInvitedUsersIDs()) {
            final MessageDTO messageDTO =
                new MessageDTO(userId, eventDTO.getId(), "Poziv na događaj",
                    MessageRole.EVENT_REQUEST.name());
            notificationService
                .saveMessageEvent(messageDTO, userService.findById(userId), event);
            simpMessagingTemplate
                .convertAndSend("/api/topic/notification/" + userId, userService.findById(eventDTO.getCreatorID()));
        }
        return ResponseEntity.ok().body(event);
    }

    @GetMapping("/get/")
    public EventDetailsDTO getEventDetails(@RequestParam Long eventId) {
        try {
            return eventService.getEventById(eventId);
        } catch (EventNotFoundException e) {
            return null;
        }
    }

    @PostMapping("/accept")
    public void acceptEventInvitation(@RequestBody Long eventId, @AuthenticationPrincipal User user) {
        eventService.acceptEventInvitation(eventId, user);
    }

}
