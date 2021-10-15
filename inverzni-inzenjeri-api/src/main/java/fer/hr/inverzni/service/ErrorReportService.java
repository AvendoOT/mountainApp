package fer.hr.inverzni.service;

import fer.hr.inverzni.dto.ErrorReportDTO;
import fer.hr.inverzni.dto.ReportDetailsDTO;
import fer.hr.inverzni.model.ErrorReport;

import java.util.List;

public interface ErrorReportService {

    ErrorReport addReport(ErrorReportDTO errorReportDTO);

    List<ReportDetailsDTO> getUserReports(Long id);

    List<ReportDetailsDTO> getTripReports(Long id);

    ErrorReport removeReport(Long id);

}
