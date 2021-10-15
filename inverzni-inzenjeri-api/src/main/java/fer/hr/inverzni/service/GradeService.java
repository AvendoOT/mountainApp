package fer.hr.inverzni.service;

import fer.hr.inverzni.dto.GradeDTO;
import fer.hr.inverzni.dto.GradeDetailsDTO;
import fer.hr.inverzni.model.Grade;

import java.util.List;

public interface GradeService {

    public Grade addGrade(GradeDTO gradeDTO);

    public List<GradeDetailsDTO> getGrades(Long id);

}
