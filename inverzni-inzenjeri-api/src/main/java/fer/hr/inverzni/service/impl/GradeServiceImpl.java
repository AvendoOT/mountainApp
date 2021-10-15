package fer.hr.inverzni.service.impl;

import fer.hr.inverzni.dto.GradeDTO;
import fer.hr.inverzni.dto.GradeDetailsDTO;
import fer.hr.inverzni.model.Grade;
import fer.hr.inverzni.model.Trip;
import fer.hr.inverzni.model.User;
import fer.hr.inverzni.repository.ErrorReportRepository;
import fer.hr.inverzni.repository.GradeRepository;
import fer.hr.inverzni.repository.TripRepository;
import fer.hr.inverzni.repository.UserRepository;
import fer.hr.inverzni.service.GradeService;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class GradeServiceImpl implements GradeService {

    private final ErrorReportRepository errorReportRepository;
    private final TripRepository        tripRepository;
    private final UserRepository        userRepository;
    private final GradeRepository       gradeRepository;

    public GradeServiceImpl(ErrorReportRepository errorReportRepository,
        TripRepository tripRepository, UserRepository userRepository,
        GradeRepository gradeRepository) {
        this.errorReportRepository = errorReportRepository;
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
        this.gradeRepository = gradeRepository;
    }

    @Override
    public Grade addGrade(GradeDTO gradeDTO) {

        Trip trip = tripRepository.findById(gradeDTO.getTripId()).get();
        User creator = userRepository.findById(gradeDTO.getCreatorId()).get();

        Grade grade = new Grade(gradeDTO.getGrade(), gradeDTO.getComment(), creator);
        trip.addGrade(grade);

        trip.addNewReviewer(creator);   //Add this user to the list of reviewers

        return gradeRepository.save(grade);
    }

    @Override
    public List<GradeDetailsDTO> getGrades(Long id) {
        Trip trip = tripRepository.findById(id).get();
        List<GradeDetailsDTO> dtoList = new LinkedList<>();

        for (Grade grade : trip.getGrades()) {
            dtoList.add(grade.gradeToGradeDetailsDTO());
        }
        return dtoList;
    }

}
