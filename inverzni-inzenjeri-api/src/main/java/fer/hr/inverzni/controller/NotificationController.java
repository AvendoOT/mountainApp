package fer.hr.inverzni.controller;

import fer.hr.inverzni.dto.MessageDTO;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.service.NotificationService;
import fer.hr.inverzni.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NotificationController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserService           userService;
    private final NotificationService   notificationService;

    @Autowired
    public NotificationController(SimpMessagingTemplate simpMessagingTemplate,
        UserService userService, NotificationService notificationService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.userService = userService;
        this.notificationService = notificationService;
    }

    @MessageMapping("/notification/{to}")
    public void sendMessage(@DestinationVariable Long to, MessageDTO messageDTO, Principal principal) {
        final User user = (User) userService.loadUserByUsername(principal.getName());
        notificationService.saveMessage(messageDTO, userService.findById(to), user);
        simpMessagingTemplate.convertAndSend("/api/topic/notification/" + to, user.getId());
    }

    @GetMapping("/notification/countUnseenMessages")
    public ResponseEntity<Integer> countUnseenMessages(@AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.OK).body(notificationService.countUnseenMessages(user));
    }

    @GetMapping("/notification")
    public List<MessageDTO> getMessages(Principal principal) {
        final User user = (User) userService.loadUserByUsername(principal.getName());
        return notificationService.getMessages(user);
    }

    @PutMapping("/notification/setMessageSeen/{messageId}")
    public Long setMessageSeen(@PathVariable Long messageId) {
        return notificationService.setMessageSeen(messageId).getId();
    }

}
