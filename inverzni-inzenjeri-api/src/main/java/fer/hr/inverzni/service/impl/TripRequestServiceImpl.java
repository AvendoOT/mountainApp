package fer.hr.inverzni.service.impl;

import fer.hr.inverzni.dto.HikerRequestOtherDTO;
import fer.hr.inverzni.model.HikerRequest;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.TripRequest;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.repository.HikerRequestRepository;
import fer.hr.inverzni.repository.TripRequestRepository;
import fer.hr.inverzni.service.HikerRequestService;
import fer.hr.inverzni.service.TripRequestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TripRequestServiceImpl implements TripRequestService {

    private static final Logger                 LOG = LoggerFactory.getLogger(TripRequestServiceImpl.class);
    private              TripRequestRepository tripRequestRepository;

    @Autowired
    public TripRequestServiceImpl(TripRequestRepository tripRequestRepository) {
        this.tripRequestRepository = tripRequestRepository;
    }

    @Override
    public TripRequest createRequest(TripRequest tripRequest) {
        try {
            LOG.info("Creating request service -> " + tripRequest);
            TripRequest newTripRequest = tripRequestRepository.save(tripRequest);
            return newTripRequest;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<HikerRequestOtherDTO> listAll() {
        List<TripRequest> tripRequestList = tripRequestRepository.findAll();
        List<HikerRequestOtherDTO> hikerRequestOtherDTOList = new ArrayList<>();
        for (TripRequest t : tripRequestList) {
            hikerRequestOtherDTOList.add(t.tripRequestToOtherHikerRequestDTO());
        }
        return
                hikerRequestOtherDTOList;
    }

    @Override
    public void rejectRequest(Long requestId) {
        tripRequestRepository.deleteById(requestId);
    }

}
