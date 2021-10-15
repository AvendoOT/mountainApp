package fer.hr.inverzni.service;

import fer.hr.inverzni.dto.HikerRequestOtherDTO;
import fer.hr.inverzni.model.HikerRequest;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.TripRequest;
import fer.hr.inverzni.model.User;

import java.util.List;

public interface HikerRequestService {

    HikerRequest createRequest(HikerRequest event);

    List<HikerRequestOtherDTO> listAll();

    void rejectRequest(Long requestId);
}
