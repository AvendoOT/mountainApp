package fer.hr.inverzni.service;

import fer.hr.inverzni.dto.BadgeResponseDTO;
import fer.hr.inverzni.dto.CreateUserDTO;
import fer.hr.inverzni.dto.TripDTO;
import fer.hr.inverzni.dto.UserDetailsDTO;
import fer.hr.inverzni.dto.UserProfileDTO;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService, PagingServicePeople<User> {

    UserDetailsDTO registerUser(CreateUserDTO userDTO);

    boolean checkIfUsernameExists(String username);

    String passwordEncoder(String password);

    UserProfileDTO getUserById(Long id);

    UserProfileDTO addPendingFriend(Long userId, Long friendId);

    UserProfileDTO makeFriends(Long firstUserId, Long secondUserId);

    List<Long> getFavouriteTrips(Long userId);

    List<Long> addToFavourites(Long userId, Long tripId);

    List<Long> removeFromFavourites(Long userId, Long tripId);

    User findById(Long id);

    void visitedTrip(Trip trip, User user);

    //void promoteToHiker(Long userID);
    Boolean getCurrentUserOnDutyStatus(Long userID);

    List<BadgeResponseDTO> getFriendBadges(Long id);

    List<Trip> getFavouriteTripsDetails(Long userId);

    List<TripDTO> getArchivedTrips(Long userId);

    List<TripDTO> addToArchivedTrips(Long userId, Long tripId);

    List<TripDTO> removeFromArchivedTrips(Long userId, Long tripId);


}
