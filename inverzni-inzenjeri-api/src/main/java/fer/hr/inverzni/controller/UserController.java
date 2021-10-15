package fer.hr.inverzni.controller;

import fer.hr.inverzni.dto.BadgeResponseDTO;
import fer.hr.inverzni.dto.EventResponseDTO;
import fer.hr.inverzni.dto.ReportDetailsDTO;
import fer.hr.inverzni.dto.TripDTO;
import fer.hr.inverzni.dto.TripResponseDTO;
import fer.hr.inverzni.dto.UserDetailsDTO;
import fer.hr.inverzni.dto.UserProfileDTO;
import fer.hr.inverzni.exception.TripNotFoundException;
import fer.hr.inverzni.exception.UserNotFoundException;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.service.ErrorReportService;
import fer.hr.inverzni.service.EventService;
import fer.hr.inverzni.service.TripService;
import fer.hr.inverzni.service.UserService;
import fer.hr.inverzni.specification.SearchPeopleSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final EventService eventService;
    private final TripService tripService;
    private final ErrorReportService errorReportService;

    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService, EventService eventService,
        TripService tripService, ErrorReportService errorReportService) {
        this.userService = userService;
        this.eventService = eventService;
        this.tripService = tripService;
        this.errorReportService = errorReportService;
    }

    @GetMapping("")
    public UserDetailsDTO getCurrentUser(@AuthenticationPrincipal User user) {
        return user.toUserDetailsDTO();
    }

    @GetMapping("/myProfile")
    public UserProfileDTO getCurrentUserProfile(@AuthenticationPrincipal User user) {
        return userService.getUserById(user.getId());
    }

    @GetMapping("/onDutyStatus")
    public Boolean getCurrentUserOnDutyStatus(@AuthenticationPrincipal User user) {
        return userService.getCurrentUserOnDutyStatus(user.getId());
    }

    @GetMapping("/profile/")
    public UserProfileDTO getUserProfile(@RequestParam Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/reports")
    public List<ReportDetailsDTO> getUserReports(@RequestParam Long id) {
        return errorReportService.getUserReports(id);
    }

    @DeleteMapping("/removeReport")
    public ReportDetailsDTO removeReport(@RequestParam Long id) {
        return errorReportService.removeReport(id).toErrorReportDetailsDTO();
    }

    @GetMapping("/addPendingFriend/")
    public UserProfileDTO addPendingFriend(@RequestParam Long userId, @RequestParam Long friendId) {
        try {
            return userService.addPendingFriend(userId, friendId);
        } catch (UserNotFoundException e) {
            return null;
        }
    }

    @GetMapping("/makeFriends/")
    public UserProfileDTO makeFriends(@RequestParam Long firstUserId, @RequestParam Long secondUserId) {
        try {
            return userService.makeFriends(firstUserId, secondUserId);
        } catch (UserNotFoundException e) {
            return null;
        }
    }

    @GetMapping("/filter")
    public Page<UserProfileDTO> filter(@RequestParam String keyWords, @RequestParam int page, @RequestParam int size) {
        SearchPeopleSpecification specification = new SearchPeopleSpecification(keyWords);
        Page<User> users =
            userService.findAllPeoplePaginatedWithSearch(specification, PageRequest.of(page - 1, size * 2, Sort
                .by(Sort.Direction.ASC, "id")));
        Set<UserProfileDTO> usersSet = users.stream()
            .map(User::toUserProfileDTO)
            .collect(Collectors.toCollection(LinkedHashSet::new));
        LOG.info(usersSet.toString());
        return new PageImpl<>(List.copyOf(usersSet));
    }

    @GetMapping("/getFavouriteTrips")
    public Long[] addRemoveFromFavourites(@AuthenticationPrincipal User user) {
        try {
            return userService.getFavouriteTrips(user.getId()).toArray(Long[]::new);
        } catch (UserNotFoundException | TripNotFoundException userNotFoundException) {
            return null;
        }
    }

    @GetMapping("/addToFavourites")
    public Long[] addToFavourites(@AuthenticationPrincipal User user, @RequestParam Long tripId) {
        try {
            return userService.addToFavourites(user.getId(), tripId).toArray(Long[]::new);
        } catch (UserNotFoundException | TripNotFoundException userNotFoundException) {
            return null;
        }
    }

    @GetMapping("/removeFromFavourites")
    public Long[] removeFromFavourites(@AuthenticationPrincipal User user, @RequestParam Long tripId) {
        try {
            return userService.removeFromFavourites(user.getId(), tripId).toArray(Long[]::new);
        } catch (UserNotFoundException | TripNotFoundException userNotFoundException) {
            return null;
        }
    }

    @GetMapping("/getBadges")
    public List<BadgeResponseDTO> getFriendBadges(@AuthenticationPrincipal User user) {
        return userService.getFriendBadges(user.getId());
    }

    @GetMapping("/getEvents")
    public List<EventResponseDTO> getFriendEvents(@AuthenticationPrincipal User user) {
        return eventService.getFriendEvents(user.getId());
    }

    @GetMapping("/getTrips")
    public List<TripResponseDTO> getFriendTrips(@AuthenticationPrincipal User user) {
        return tripService.getFriendTrips(user.getId());
    }

    @GetMapping("/getFavouriteTripsDetailed")
    public TripDTO[] getFavouriteTripsDetailed(@AuthenticationPrincipal User user) {
        try {
            return userService.getFavouriteTripsDetails(user.getId()).stream().map(Trip::tripToTripDTO).collect(Collectors.toList()).toArray(TripDTO[]::new);
        } catch (UserNotFoundException | TripNotFoundException userNotFoundException) {
            return null;
        }
    }

    @GetMapping("/getArchivedTrips")
    public List<TripDTO> getArchivedTrips(@AuthenticationPrincipal User user) {
        return userService.getArchivedTrips(user.getId());
    }

    @GetMapping("/addToArchivedTrips/")
    public List<TripDTO> addToArchivedTrips(@AuthenticationPrincipal User user, @RequestParam Long tripId) {
        return userService.addToArchivedTrips(user.getId(), tripId);
    }

    @GetMapping("/removeFromArchivedTrips/")
    public List<TripDTO> removeFromArchivedTrips(@AuthenticationPrincipal User user, @RequestParam Long tripId) {
        return userService.removeFromArchivedTrips(user.getId(), tripId);
    }



}
