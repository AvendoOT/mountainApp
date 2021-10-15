package fer.hr.inverzni.service;

import fer.hr.inverzni.dto.HikerRequestOtherDTO;
import fer.hr.inverzni.model.HikerRequest;
import fer.hr.inverzni.model.TripRequest;

import java.util.List;

public interface TripRequestService {

    TripRequest createRequest(TripRequest event);

    List<HikerRequestOtherDTO> listAll();

    void rejectRequest(Long requestId);
}
