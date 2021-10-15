package fer.hr.inverzni.service.impl;

import fer.hr.inverzni.dto.ErrorReportDTO;
import fer.hr.inverzni.dto.ReportDetailsDTO;
import fer.hr.inverzni.model.ErrorReport;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.repository.ErrorReportRepository;
import fer.hr.inverzni.repository.TripRepository;
import fer.hr.inverzni.repository.UserRepository;
import fer.hr.inverzni.service.ErrorReportService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ErrorReportServiceImpl implements ErrorReportService {

    private final ErrorReportRepository errorReportRepository;
    private final TripRepository        tripRepository;
    private final UserRepository        userRepository;

    public ErrorReportServiceImpl(ErrorReportRepository errorReportRepository,
        TripRepository tripRepository, UserRepository userRepository) {
        this.errorReportRepository = errorReportRepository;
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ErrorReport addReport(ErrorReportDTO errorReportDTO) {
        Trip trip = tripRepository.findById(errorReportDTO.getTripId()).get();
        User reporter = userRepository.findById(errorReportDTO.getReporterId()).get();

        ErrorReport errorReport = new ErrorReport(reporter, trip, errorReportDTO.getExplanation());

        User creator = trip.getCreator();                   //Get trip creator
        if (creator == null) {
            creator = userRepository.findById(1L)
                .get();    //If creator does not exist (deleted account), add report to admin (assuming that admin has ID == 1)
        }
        creator.addReport(errorReport);                     //Add new report in list

        return errorReportRepository.save(errorReport);
    }

    @Override
    public List<ReportDetailsDTO> getUserReports(Long id) {
        List<ErrorReport> reports = errorReportRepository.findAllByCreatorId(id);

        List<ReportDetailsDTO> reportDetailsDTOS = new ArrayList<>();
        for (ErrorReport t : reports) {
            reportDetailsDTOS.add(t.toErrorReportDetailsDTO());
        }

        return reportDetailsDTOS;
    }

    @Override
    public ErrorReport removeReport(Long id) {
        ErrorReport report = errorReportRepository.findById(id).get();
        User receiver = report.getTrip().getCreator();
        receiver.removeReport(report);

        errorReportRepository.deleteById(id);
        return report;
    }

    @Override
    public List<ReportDetailsDTO> getTripReports(Long id) {
        return errorReportRepository.findAllByTripId(id).stream().map(ErrorReport::toErrorReportDetailsDTO).collect(
            Collectors.toList());
    }

}
