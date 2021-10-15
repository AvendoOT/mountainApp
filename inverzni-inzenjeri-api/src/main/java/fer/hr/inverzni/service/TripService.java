package fer.hr.inverzni.service;

import fer.hr.inverzni.dto.TripDTO;
import fer.hr.inverzni.dto.TripResponseDTO;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.User;

import java.util.List;

public interface TripService extends PagingService<Trip> {

    List<TripDTO> listAll();

    Trip addTrip(TripDTO tripDTO);

    void approveTrip(Long tripId, List<Long> approvedHikersIds);

    Trip getTripById(Long tripId);

    List<TripDTO> listAvailableForDuty();

    List<TripDTO> listNotPendingConfirmation(User user);

    List<TripDTO> getTripsCreatedByUser(Long userId);

    Trip findById(Long id);

    void putHikerOnCall(Long tripID, Long userID);

    List<TripResponseDTO> getFriendTrips(Long id);

    List<Long> getTripReviewers(Long id);

    Trip editTrip(TripDTO tripDTO);
}
