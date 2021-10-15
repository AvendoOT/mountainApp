package fer.hr.inverzni.service.impl;

import fer.hr.inverzni.dto.BadgeResponseDTO;
import fer.hr.inverzni.dto.CreateUserDTO;
import fer.hr.inverzni.dto.TripDTO;
import fer.hr.inverzni.dto.UserDetailsDTO;
import fer.hr.inverzni.dto.UserProfileDTO;
import fer.hr.inverzni.exception.TripNotFoundException;
import fer.hr.inverzni.exception.UserExistsException;
import fer.hr.inverzni.exception.UserNotFoundException;
import fer.hr.inverzni.model.BadgeLevel;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.repository.TripRepository;
import fer.hr.inverzni.repository.UserRepository;
import fer.hr.inverzni.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);
    private UserRepository userRepository;
    private TripRepository tripRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, TripRepository tripRepository) {
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetailsDTO registerUser(CreateUserDTO userDTO) {
        try {
            checkIfUsernameExists(userDTO.getUsername());
            LOG.info("User registration -> " + userDTO.getUsername());
            User user = userRepository.save(userDTO.toUser());
            return user.toUserDetailsDTO();
        } catch (UserExistsException e) {
            throw e;
        }
    }

    @Override
    public boolean checkIfUsernameExists(String username) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new UserExistsException("User with username " + username + " already exists");
        }
        return false;
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UserNotFoundException(username + " not found"));
        LOG.info("Loaded " + user.getUsername());
        return user;
    }

    @Override
    public String passwordEncoder(String password) {
        return passwordEncoder.encode(password);
    }

    @Override
    public UserProfileDTO getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get().toUserProfileDTO();
        } else {
            throw new UserNotFoundException("User with id " + id + " does not exist.");
        }
    }

    @Override
    public UserProfileDTO addPendingFriend(Long userId, Long friendId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<User> friend = userRepository.findById(friendId);
        if (user.isPresent() && friend.isPresent()) {
            List<User> pendingFriendsList = user.get().getPendingFriends();
            pendingFriendsList.add(friend.get());
            user.get().setPendingFriends(pendingFriendsList);
            User newUser = userRepository.save(user.get());
            return newUser.toUserProfileDTO();
        } else {
            throw new UserNotFoundException(
                "Either user with id " + friendId + " does not exist or user with id " + userId + "does not exist.");
        }
    }

    @Override
    public UserProfileDTO makeFriends(Long firstUserId, Long secondUserId) {
        Optional<User> firstUser = userRepository.findById(firstUserId);
        Optional<User> secondUser = userRepository.findById(secondUserId);
        if (firstUser.isPresent() && secondUser.isPresent()) {
            // remove from pending friends
            List<User> firstUserPendingFriendsList = firstUser.get().getPendingFriends();
            List<User> secondUserPendingFriendsList = secondUser.get().getPendingFriends();
            firstUserPendingFriendsList.remove(secondUser.get());
            secondUserPendingFriendsList.remove(firstUser.get());
            firstUser.get().setPendingFriends(firstUserPendingFriendsList);
            secondUser.get().setPendingFriends(secondUserPendingFriendsList);

            // add to friends
            List<User> firstUserFriendsList = firstUser.get().getFriends();
            List<User> secondUserFriendsList = secondUser.get().getFriends();
            firstUserFriendsList.add(secondUser.get());
            secondUserFriendsList.add(firstUser.get());
            firstUser.get().setFriends(firstUserFriendsList);
            secondUser.get().setFriends(secondUserFriendsList);

            // modify in database
            User newFirstUser = userRepository.save(firstUser.get());
            User newSecondUser = userRepository.save(secondUser.get());
            return newFirstUser.toUserProfileDTO();
        } else {
            throw new UserNotFoundException(
                "Either user with id " + firstUserId + " does not exist or user with id " + secondUserId
                    + "does not exist.");
        }
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).get();
    }

    //    @Override
    //    public void promoteToHiker(Long userID) {
    //        if (userRepository.existsById(userID)) {
    //            User user = userRepository.findById(userID).get();
    //            user.setUserRole(UserRole.HIKER);
    //            userRepository.save(user);
    //        } else {
    //            throw new TripNotFoundException("User with ID of " + userID + " not found");
    //        }
    //    }

    @Override
    public void visitedTrip(Trip trip, User user) {
        List<Trip> visitedTrips = user.getVisitedTrips();
        visitedTrips.add(trip);
        user.setVisitedTrips(visitedTrips);
        updateBadge(user);
        User newUser = userRepository.save(user);
        LOG.info(newUser.getFirstName() + newUser.getLastName());
    }

    private void updateBadge(User user) {
        if (user.getVisitedTrips().size() == 1) {
            user.setBadge(BadgeLevel.BRONZE);
        } else if (user.getVisitedTrips().size() == 10) {
            user.setBadge(BadgeLevel.SILVER);
        } else if (user.getVisitedTrips().size() == 50) {
            user.setBadge(BadgeLevel.GOLD);
        } else if (user.getVisitedTrips().size() == 100) {
            user.setBadge(BadgeLevel.PLATINUM);
        } else if (user.getVisitedTrips().size() == 500) {
            user.setBadge(BadgeLevel.DIAMOND);
        }
    }

    public List<BadgeResponseDTO> getFriendBadges(Long id) {
        final Optional<User> user = userRepository.findById(id);
        final List<BadgeResponseDTO> badgeReponseDTOS = new LinkedList<>();
        if (user.isPresent()) {
            for (User friend : user.get().getFriends()) {
                String badge;
                if (friend.getBadge() == null) {
                    badge = BadgeLevel.NOTHING.name();
                } else {
                    badge = friend.getBadge().name();
                }
                badgeReponseDTOS.add(
                    new BadgeResponseDTO(friend.getFirstName() + " " + friend.getLastName(), badge,
                        friend.getId()));
            }
        }
        return badgeReponseDTOS;
    }

    @Override
    public Page<User> findAllPeoplePaginatedWithSearch(Specification<User> specification, Pageable pageable) {
        Page<User> users = userRepository.findAll(specification, pageable);
        Set<User> uniqueUsers = new HashSet<>();
        for (User u : users) {
            uniqueUsers.add(u);
            LOG.info(u.getFirstName());
        }
        return new PageImpl<>(List.copyOf(uniqueUsers));
    }

    @Override
    public List<Long> getFavouriteTrips(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User with id " + userId + "does not exist.");
        }
        return user.get().getFavouriteTrips().stream().map(Trip::getId).collect(Collectors.toList());
    }

    @Override
    public List<Long> addToFavourites(Long userId, Long tripId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Trip> trip = tripRepository.findById(tripId);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User with id " + userId + "does not exist.");
        }
        if (trip.isEmpty()) {
            throw new TripNotFoundException("Trip with id " + tripId + "does not exist.");
        }

        List<Trip> favTrips = user.get().getFavouriteTrips();
        favTrips.add(trip.get());
        user.get().setFavouriteTrips(favTrips);
        userRepository.save(user.get());
        return favTrips.stream().map(Trip::getId).collect(Collectors.toList());
    }

    @Override
    public List<Long> removeFromFavourites(Long userId, Long tripId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Trip> trip = tripRepository.findById(tripId);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User with id " + userId + "does not exist.");
        }
        if (trip.isEmpty()) {
            throw new TripNotFoundException("Trip with id " + tripId + "does not exist.");
        }

        List<Trip> favTrips = user.get().getFavouriteTrips();
        favTrips.remove(trip.get());
        user.get().setFavouriteTrips(favTrips);
        userRepository.save(user.get());
        return favTrips.stream().map(Trip::getId).collect(Collectors.toList());
    }

    @Override
    public Boolean getCurrentUserOnDutyStatus(Long userID) {
        List<Trip> trips = tripRepository.findAll();
        Boolean isOnDuty = false;
        for (Trip t : trips) {
            if (t.getHikerOnCall() != null && t.getHikerOnCall().getId() == userID) {
                isOnDuty = true;
            }
        }
        return isOnDuty;
    }

    @Override
    public List<Trip> getFavouriteTripsDetails(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User with id " + userId + "does not exist.");
        }
        return user.get().getFavouriteTrips();
    }

    @Override
    public List<TripDTO> getArchivedTrips(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User with id " + userId + "does not exist.");
        }
        List<Trip> archivedTrips = user.get().getArchivedTrips();
        if(archivedTrips != null && archivedTrips.size() > 0) {
            return archivedTrips.stream().map(Trip::tripToTripDTO).collect(Collectors.toList());
        }
        return new LinkedList<>();
    }


    @Override
    public List<TripDTO> addToArchivedTrips(Long userId, Long tripId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Trip> trip = tripRepository.findById(tripId);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User with id " + userId + "does not exist.");
        }
        if (trip.isEmpty()) {
            throw new TripNotFoundException("Trip with id " + userId + "does not exist.");
        }
        List<Trip> archivedTrips = user.get().getArchivedTrips();
        if(archivedTrips != null && archivedTrips.size() > 0) {
            archivedTrips.add(trip.get());
            user.get().setArchivedTrips(archivedTrips);
            userRepository.save(user.get());
            return archivedTrips.stream().map(Trip::tripToTripDTO).collect(Collectors.toList());
        }

        List<Trip> archived = new LinkedList<>();
        archived.add(trip.get());
        user.get().setArchivedTrips(archived);
        userRepository.save(user.get());
        return archived.stream().map(Trip::tripToTripDTO).collect(Collectors.toList());
    }

    @Override
    public List<TripDTO> removeFromArchivedTrips(Long userId, Long tripId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Trip> trip = tripRepository.findById(tripId);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User with id " + userId + "does not exist.");
        }
        if (trip.isEmpty()) {
            throw new TripNotFoundException("Trip with id " + userId + "does not exist.");
        }
        List<Trip> archivedTrips = user.get().getArchivedTrips();
        if(archivedTrips != null && archivedTrips.size() > 0) {
            archivedTrips.remove(trip.get());
            user.get().setArchivedTrips(archivedTrips);
            userRepository.save(user.get());
            return archivedTrips.stream().map(Trip::tripToTripDTO).collect(Collectors.toList());
        }

        return new LinkedList<>();
    }



}
