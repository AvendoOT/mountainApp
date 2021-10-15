package fer.hr.inverzni.service.impl;

import fer.hr.inverzni.dto.CabinDTO;
import fer.hr.inverzni.dto.TripDTO;
import fer.hr.inverzni.dto.TripResponseDTO;
import fer.hr.inverzni.exception.TripNotFoundException;
import fer.hr.inverzni.model.Area;
import fer.hr.inverzni.model.BadgeLevel;
import fer.hr.inverzni.model.Grade;
import fer.hr.inverzni.model.HikerRequest;
import fer.hr.inverzni.model.MountainCabin;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.repository.AreaRepository;
import fer.hr.inverzni.repository.HikerRequestRepository;
import fer.hr.inverzni.repository.MountainCabinRepository;
import fer.hr.inverzni.repository.TripRepository;
import fer.hr.inverzni.repository.TripRequestRepository;
import fer.hr.inverzni.repository.UserRepository;
import fer.hr.inverzni.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TripServiceImpl implements TripService {

    private final TripRepository          tripRepository;
    private final AreaRepository          areaRepository;
    private final MountainCabinRepository mountainCabinRepository;
    private final UserRepository          userRepository;
    private       HikerRequestRepository  hikerRequestRepository;
    private       TripRequestRepository   tripRequestRepository;

    @Autowired
    public TripServiceImpl(TripRepository tripRepository, AreaRepository areaRepository,
        MountainCabinRepository mountainCabinRepository, UserRepository userRepository,
        HikerRequestRepository hikerRequestRepository, TripRequestRepository tripRequestRepository) {
        this.tripRepository = tripRepository;
        this.areaRepository = areaRepository;
        this.mountainCabinRepository = mountainCabinRepository;
        this.userRepository = userRepository;
        this.hikerRequestRepository = hikerRequestRepository;
        this.tripRequestRepository = tripRequestRepository;

    }

    @Override
    public List<TripDTO> listAll() {
        List<Trip> trips = tripRepository.findAll();
        List<TripDTO> tripDTOS = new ArrayList<>();
        for (Trip t : trips) {
            tripDTOS.add(t.tripToTripDTO());
        }
        return
            tripDTOS;
    }

    @Override
    public List<TripDTO> listAvailableForDuty() {
        List<Trip> trips = tripRepository.findAll();
        List<TripDTO> tripDTOS = new ArrayList<>();
        List<HikerRequest> hikerRequests = hikerRequestRepository.findAll();
        List<Long> existingTripRequests =
            hikerRequests.stream().map((HikerRequest r) -> r.getTrip().getId()).collect(Collectors.toList());
        for (Trip t : trips) {
            if (t.getHikerOnCall() == null && !existingTripRequests.contains(t.getId())) {
                tripDTOS.add(t.tripToTripDTO());
            }
        }
        return
            tripDTOS;
    }

    @Override
    public List<TripDTO> listNotPendingConfirmation(User user) {
        List<Trip> trips = tripRepository.findAll();
        List<Trip> visitedTrips = user.getVisitedTrips();
        List<Long> pendingTrips = tripRequestRepository
            .findAll()
            .stream()
            .filter(tripRequest -> tripRequest.getUser().getId() == user.getId())
            .map(tripRequest -> tripRequest.getTrip().getId()
            ).collect(Collectors.toList());
        List<TripDTO> tripDTOS = new ArrayList<>();
        for (Trip t : trips) {
            if (!(visitedTrips.contains(t) || pendingTrips.contains(t.getId()))) {
                tripDTOS.add(t.tripToTripDTO());
            }
        }
        return
            tripDTOS;
    }

    @Override
    public Trip addTrip(TripDTO tripDTO) {
        Trip trip = tripDTO.toTrip();
        List<MountainCabin> mountainCabinList = new ArrayList<>();
        String areaName = tripDTO.getArea().trim();
        MountainCabin mountainCabin;

        Area area = areaRepository.findByName(areaName); //Check if area already exists
        if (area == null) {
            area = areaRepository.save(new Area(areaName));
        }

        for (CabinDTO cabin : tripDTO.getCabins()) {
            if (cabin.getName().trim()
                .isEmpty()) {       //Check if cabinName is only whitespaces, if true, continue
                continue;
            }

            mountainCabin = mountainCabinRepository
                .findMountainCabinByNameAndEatAndPowerAndSleepAndWater(cabin.getName(), cabin.getFood(), cabin.getPower(), cabin.getSleep(),
                    cabin.getWater());

            if (mountainCabin == null) {
                mountainCabin = mountainCabinRepository.save(cabin.toMountainCabin());
            }
            mountainCabinList.add(mountainCabin);
        }

        Optional<User> creator = userRepository.findById(tripDTO.getCreatorId());
        trip.setCreator(creator.get());
        trip.setArea(area);
        trip.setMountainCabins(mountainCabinList);

        return tripRepository.save(trip);
    }

    @Override
    public Page<Trip> findAllPaginatedWithSearch(Specification<Trip> specification, Pageable pageable,
        Long minimalGrade, Long maximalGrade) {
        Page<Trip> trips = tripRepository.findAll(specification, pageable);
        Set<Trip> uniqueTrips = new HashSet<>();
        for (Trip t : trips) {
            Long averageGrade = t.getGrades().stream().mapToLong(Grade::getGrade).sum();
            if (t.getGrades().isEmpty()) {
                averageGrade = (long) 1;
            } else {
                averageGrade = getAverageGrade(averageGrade, t.getGrades());
            }
            if (averageGrade >= minimalGrade && averageGrade <= maximalGrade) {
                uniqueTrips.add(t);
            }
        }
        return new PageImpl<>(List.copyOf(uniqueTrips));
    }

    @Override
    public void approveTrip(Long tripId, List<Long> approvedHikersIds) {
        Trip trip = tripRepository.findById(tripId).get();
        List<User> approvedHikers = new LinkedList<>();
        for (Long hikerId : approvedHikersIds) {
            approvedHikers.add(userRepository.findById(hikerId).get());
        }
        for (User approvedHiker : approvedHikers) {
            for (User hiker : trip.getHikers()) {
                if (approvedHiker.equals(hiker)) {
                    hiker.getVisitedTrips().add(trip);
                    updateBadge(hiker);
                    userRepository.save(hiker);
                }
            }
        }
    }

    @Override
    public Trip getTripById(Long tripId) {
        Optional<Trip> trip = tripRepository.findById(tripId);
        if (trip.isEmpty()) {
            throw new TripNotFoundException("Trip with id " + tripId + "does not exist.");
        }
        return trip.get();
    }

    @Override
    public List<TripDTO> getTripsCreatedByUser(Long userId) {
        return tripRepository.findByCreatorId(userId).stream().map(Trip::tripToTripDTO).collect(Collectors.toList());
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

    @Override
    public Trip findById(Long id) {
        Optional<Trip> trip = tripRepository.findById(id);
        if (trip.isEmpty()) {
            throw new TripNotFoundException("Trip with id " + id + " is not found.");
        }
        return trip.get();
    }

    @Override
    public void putHikerOnCall(Long tripID, Long userID) {
        if (tripRepository.existsById(tripID) && userRepository.existsById(userID)) {
            Trip trip = tripRepository.findById(tripID).get();
            User user = userRepository.findById(userID).get();
            trip.setHikerOnCall(user);
            tripRepository.save(trip);
        } else {
            throw new TripNotFoundException("Trip or User with IDs of " + tripID + ", " + userID + " not found");
        }
    }

    @Override
    public List<Long> getTripReviewers(Long id) {
        Trip trip = tripRepository.findById(id).get();
        List<Long> reviewerIds = new LinkedList<>();

        for (User user : trip.getReviewers()) {
            reviewerIds.add(user.getId());
        }

        return reviewerIds;
    }

    public List<TripResponseDTO> getFriendTrips(Long id) {
        final Optional<User> user = userRepository.findById(id);
        final List<TripResponseDTO> tripResponseDTOS = new LinkedList<>();
        final List<Trip> trips = tripRepository.findAll();
        for (final Trip trip : trips) {
            for (final User friend : user.get().getFriends()) {
                if (trip.getCreator().equals(friend)) {
                    tripResponseDTOS.add(new TripResponseDTO(
                        friend.getFirstName() + " " +
                            friend.getLastName(), trip.getId(),
                        trip.getPeak(), trip.getArea().getName()
                    ));
                }
            }
        }
        return tripResponseDTOS;
    }

    private Long getAverageGrade(Long gradeSum, List<Grade> grades) {

        if (grades.size() == 0) {
            return 0L;
        } else {
            return gradeSum / grades.size();
        }
    }

    @Override
    public Trip editTrip(TripDTO tripDTO) {
        Trip trip = tripDTO.toTrip();

        List<Grade> grades = tripRepository.findById(tripDTO.getId()).get().getGrades();

        List<MountainCabin> mountainCabinList = new ArrayList<>();
        String areaName = tripDTO.getArea().trim();
        MountainCabin mountainCabin;

        Area area = areaRepository.findByName(areaName); //Check if area already exists
        if (area == null) {
            area = areaRepository.save(new Area(areaName));
        }

        for (CabinDTO cabin : tripDTO.getCabins()) {
            if (cabin.getName().trim()
                .isEmpty()) {       //Check if cabinName is only whitespaces, if true, continue
                continue;
            }
            mountainCabin = mountainCabinRepository
                .findMountainCabinByNameAndEatAndPowerAndSleepAndWater(cabin.getName(), cabin.getFood(), cabin.getPower(), cabin.getSleep(),
                    cabin.getWater());

            if (mountainCabin == null) {
                mountainCabin = mountainCabinRepository.save(cabin.toMountainCabin());
            }

            mountainCabinList.add(mountainCabin);
        }

        Optional<User> creator = userRepository.findById(tripDTO.getCreatorId());
        trip.setCreator(creator.get());
        trip.setArea(area);
        trip.setMountainCabins(mountainCabinList);
        trip.setGrades(grades);
        trip.setId(tripDTO.getId());
        return tripRepository.save(trip);
    }

}
