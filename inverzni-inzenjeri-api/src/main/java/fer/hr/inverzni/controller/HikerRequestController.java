package fer.hr.inverzni.controller;

import fer.hr.inverzni.dto.HikerAcceptedRequestDTO;
import fer.hr.inverzni.dto.HikerRequestDTO;
import fer.hr.inverzni.dto.HikerRequestOtherDTO;
import fer.hr.inverzni.model.HikerRequest;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.TripRequest;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.service.HikerRequestService;
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
import java.util.List;

@RestController
@RequestMapping("/api/request")
public class HikerRequestController {

    private static final Logger LOG = LoggerFactory.getLogger(HikerRequestController.class);

    private final TripService         tripService;
    private final UserService         userService;
    private final HikerRequestService hikerRequestService;

    @Autowired
    public HikerRequestController(TripService tripService, UserService userService,
        HikerRequestService hikerRequestService) {
        this.userService = userService;
        this.tripService = tripService;
        this.hikerRequestService = hikerRequestService;
    }

    @GetMapping("/get")
    public List<HikerRequestOtherDTO> listRequests() {
        return hikerRequestService.listAll();
    }

    @PostMapping("/accept")
    public ResponseEntity approveTrip(@ModelAttribute HikerAcceptedRequestDTO hikerAcceptedRequestDTO,
        HttpServletRequest request, Errors errors) throws ServletException {
        LOG.info("------------> uslo u funkciju " + hikerAcceptedRequestDTO.isAccepted());
        try {
            if(hikerAcceptedRequestDTO.isAccepted()){
                //userService.promoteToHiker(hikerAcceptedRequestDTO.getUserID());
                tripService.putHikerOnCall(hikerAcceptedRequestDTO.getTripID(), hikerAcceptedRequestDTO.getUserID());
            }
            hikerRequestService.rejectRequest(hikerAcceptedRequestDTO.getRequestID());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/send")
    public ResponseEntity<HikerRequest> addRequest(@ModelAttribute HikerRequestDTO hikerRequestDTO,
        HttpServletRequest request, Errors errors) throws ServletException {

        LOG.info("Hiker Request Controller above -> " + hikerRequestDTO.getTripID() + hikerRequestDTO.getUserID());
        HikerRequest hikerRequest = new HikerRequest(userService.findById(hikerRequestDTO.getUserID()),
            tripService.findById(hikerRequestDTO.getTripID()));
        LOG.info(
            "Hiker Request Controller -> " + hikerRequest.getTrip().getId() + hikerRequest.getUser().getUsername());
        HikerRequest newRequest;
        try {
            newRequest = hikerRequestService.createRequest(hikerRequest);
        } catch (Exception e) {
            LOG.info("Failed to make hiker request");
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(newRequest);
    }

}
