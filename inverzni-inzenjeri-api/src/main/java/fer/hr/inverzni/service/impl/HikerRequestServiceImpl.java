package fer.hr.inverzni.service.impl;

import fer.hr.inverzni.dto.HikerRequestOtherDTO;
import fer.hr.inverzni.model.HikerRequest;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.TripRequest;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.repository.HikerRequestRepository;
import fer.hr.inverzni.service.HikerRequestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HikerRequestServiceImpl implements HikerRequestService {

    private static final Logger                 LOG = LoggerFactory.getLogger(EventServiceImpl.class);
    private              HikerRequestRepository hikerRequestRepository;

    @Autowired
    public HikerRequestServiceImpl(HikerRequestRepository hikerRequestRepository) {
        this.hikerRequestRepository = hikerRequestRepository;
    }

    @Override
    public HikerRequest createRequest(HikerRequest hikerRequest) {
        try {
            LOG.info("Creating request service -> " + hikerRequest);
            HikerRequest newHikerRequest = hikerRequestRepository.save(hikerRequest);
            return newHikerRequest;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<HikerRequestOtherDTO> listAll() {
        List<HikerRequest> hikerRequestList = hikerRequestRepository.findAll();
        List<HikerRequestOtherDTO> hikerRequestOtherDTOList = new ArrayList<>();
        for (HikerRequest t : hikerRequestList) {
            hikerRequestOtherDTOList.add(t.hikerRequestToOtherHikerRequestDTO());
        }
        return
            hikerRequestOtherDTOList;
    }

    @Override
    public void rejectRequest(Long requestId) {
        hikerRequestRepository.deleteById(requestId);
    }

}
