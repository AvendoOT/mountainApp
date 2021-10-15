package fer.hr.inverzni.controller;

import fer.hr.inverzni.dto.HikerAcceptedRequestDTO;
import fer.hr.inverzni.dto.HikerRequestDTO;
import fer.hr.inverzni.dto.HikerRequestOtherDTO;
import fer.hr.inverzni.dto.TripDTO;
import fer.hr.inverzni.model.HikerRequest;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.TripRequest;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.service.HikerRequestService;
import fer.hr.inverzni.service.TripRequestService;
import fer.hr.inverzni.service.TripService;
import fer.hr.inverzni.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tripRequest")
public class TripRequestController {

    private static final Logger LOG = LoggerFactory.getLogger(TripRequestController.class);

    private final TripService         tripService;
    private final UserService         userService;
    private final TripRequestService tripRequestService;

    @Autowired
    public TripRequestController(TripService tripService, UserService userService,
                                  TripRequestService tripRequestService) {
        this.userService = userService;
        this.tripService = tripService;
        this.tripRequestService = tripRequestService;
    }

    @GetMapping("/get")
    public List<HikerRequestOtherDTO> listRequests(@AuthenticationPrincipal User user) {
        List<HikerRequestOtherDTO> requestDTOList = tripRequestService.listAll();
        List<HikerRequestOtherDTO> newRequestDTOList = new ArrayList<>();
        for (HikerRequestOtherDTO h : requestDTOList) {
            if(h.getTrip().getHikerOnCallId() == user.getId()){//
                newRequestDTOList.add(h);
                LOG.info("------------> Ids: " + h.getUserID() + h.getUserID() + h.getTrip().toString());
            }
        }
        return newRequestDTOList;
    }

    @PostMapping("/accept")
    public ResponseEntity approveTrip(@ModelAttribute HikerAcceptedRequestDTO hikerAcceptedRequestDTO,
                                      HttpServletRequest request, Errors errors) throws ServletException {
        LOG.info("------------> uslo u funkciju " + hikerAcceptedRequestDTO.isAccepted());
        try {
            if(hikerAcceptedRequestDTO.isAccepted()){
                Trip trip = tripService.findById(hikerAcceptedRequestDTO.getTripID());
                User user = userService.findById(hikerAcceptedRequestDTO.getUserID());
                userService.visitedTrip(trip, user);
            }
            tripRequestService.rejectRequest(hikerAcceptedRequestDTO.getRequestID());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/send")
    public ResponseEntity<TripRequest> addRequest(@ModelAttribute HikerRequestDTO hikerRequestDTO,
                                                   HttpServletRequest request, Errors errors) throws ServletException {

        LOG.info("Trip Request Controller above -> " + hikerRequestDTO.getTripID() + hikerRequestDTO.getUserID());
        TripRequest tripRequest = new TripRequest(userService.findById(hikerRequestDTO.getUserID()),
                tripService.findById(hikerRequestDTO.getTripID()));
        LOG.info(
                "Trip Request Controller -> " + tripRequest.getTrip().getId() + tripRequest.getUser().getUsername());
        TripRequest newRequest;
        try {
            newRequest = tripRequestService.createRequest(tripRequest);
        } catch (Exception e) {
            LOG.info("Failed to make trip request");
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(newRequest);
    }

}
