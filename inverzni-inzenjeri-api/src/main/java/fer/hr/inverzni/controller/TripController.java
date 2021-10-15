package fer.hr.inverzni.controller;

import fer.hr.inverzni.dto.ApproveTripDTO;
import fer.hr.inverzni.dto.ErrorReportDTO;
import fer.hr.inverzni.dto.GradeDTO;
import fer.hr.inverzni.dto.GradeDetailsDTO;
import fer.hr.inverzni.dto.ReportDetailsDTO;
import fer.hr.inverzni.dto.TripDTO;
import fer.hr.inverzni.exception.TripNotFoundException;
import fer.hr.inverzni.model.Grade;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.service.ErrorReportService;
import fer.hr.inverzni.service.GradeService;
import fer.hr.inverzni.service.TripService;
import fer.hr.inverzni.service.UserService;
import fer.hr.inverzni.specification.SearchSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;
    private final ErrorReportService errorReportService;
    private final GradeService gradeService;
    private final UserService userService;

    @Autowired
    public TripController(TripService tripService, ErrorReportService errorReportService,
        GradeService gradeService, UserService userService) {
        this.tripService = tripService;
        this.errorReportService = errorReportService;
        this.gradeService = gradeService;
        this.userService = userService;
    }

    @GetMapping("/availableForDuty")
    public List<TripDTO> listTripsAvailableForDuty() {
        return tripService.listAvailableForDuty();
    }

    @GetMapping("/getNotPendingConfirmation")
    public List<TripDTO> listTripsNotPendingConfirmation(@AuthenticationPrincipal User user) {
        return tripService.listNotPendingConfirmation(userService.findById(user.getId()));
    }

    @GetMapping("")
    public List<TripDTO> listTrips() {
        return tripService.listAll();
    }

    @GetMapping("/search/")
    public Page<TripDTO> getSearchedTrips(@RequestParam(required = false) Long minimalDuration,
        @RequestParam(required = false) Long maximalDuration, @RequestParam(required = false) Long minimalDifficulty,
        @RequestParam(required = false) Long maximalDifficulty, @RequestParam(required = false) Long minimalGrade,
        @RequestParam(required = false) Long maximalGrade, @RequestParam(required = false) String keyWords,
        @RequestParam int page, @RequestParam int size) {
        SearchSpecification spec =
            new SearchSpecification(minimalDuration, maximalDuration, minimalDifficulty, maximalDifficulty, keyWords);
        Page<Trip> trips = tripService.findAllPaginatedWithSearch(spec, PageRequest.of(page - 1, size * 2,
            Sort.by(Sort.Direction.DESC, "id"))
            , minimalGrade, maximalGrade);
        Set<TripDTO> tripsSet = trips.stream()
            .map(Trip::tripToTripDTO)
            .collect(Collectors.toCollection(LinkedHashSet::new));
        return new PageImpl<>(List.copyOf(tripsSet));
    }

    @PostMapping("/createTrip")
    public ResponseEntity<Trip> addTrip(@RequestBody TripDTO tripDTO,
        HttpServletRequest request, Errors errors) throws ServletException {

        Trip newTrip = tripService.addTrip(tripDTO);
        return ResponseEntity.ok().body(newTrip);
    }

    @PostMapping("/errorReport")
    public ResponseEntity<ErrorReportDTO> reportError(@RequestBody ErrorReportDTO errorReportDTO,
        HttpServletRequest request, Errors errors) throws ServletException {
        try {
            errorReportService.addReport(errorReportDTO);
            return ResponseEntity.ok().body(errorReportDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/gradeTrip")
    public ResponseEntity<Grade> gradeTrip(@RequestBody GradeDTO gradeDTO,
        HttpServletRequest request, Errors errors) throws ServletException {
        try {
            Grade grade = gradeService.addGrade(gradeDTO);
            return ResponseEntity.ok().body(grade);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getGrades")
    public List<GradeDetailsDTO> getGrades(@RequestParam Long id) {
        System.out.println("GETGRADEES");
        return gradeService.getGrades(id);
    }

    @PostMapping("/approve")
    public void approveTrip(@RequestBody ApproveTripDTO approveTripDTO) {
        tripService.approveTrip(approveTripDTO.getTripId(), approveTripDTO.getUserIds());
    }

    @GetMapping("/get/")
    public TripDTO getTrip(@RequestParam Long tripId) {
        try {
            return tripService.getTripById(tripId).tripToTripDTO();
        } catch (TripNotFoundException e) {
            return null;
        }
    }

    @GetMapping("/errorReports/")
    public List<ReportDetailsDTO> getErrorReportsByTripId(@RequestParam Long tripId) {
        return errorReportService.getTripReports(tripId);
    }

    @GetMapping("/getCreatedByUser/")
    public List<TripDTO> getTripsCreatedByUser(@RequestParam Long userId) {
        return tripService.getTripsCreatedByUser(userId);
    }

    @GetMapping("/getReviewers")
    public List<Long> getTripReviewers(@RequestParam Long id) {
        return tripService.getTripReviewers(id);
    }

    @PostMapping("/editTrip")
    public ResponseEntity<Trip> editTrip(@RequestBody TripDTO tripDTO,
        HttpServletRequest request, Errors errors) throws ServletException {

        Trip newTrip = tripService.editTrip(tripDTO);
        return ResponseEntity.ok().body(newTrip);
    }
}
