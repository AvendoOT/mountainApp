package fer.hr.inverzni.repository;

import fer.hr.inverzni.model.ErrorReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ErrorReportRepository extends JpaRepository<ErrorReport, Long> {

    @Override
    Optional<ErrorReport> findById(Long aLong);

    @Query("select e from ErrorReport e where e.trip.creator.id = ?1")
    List<ErrorReport> findAllByCreatorId(Long id);

    @Query("select e from ErrorReport e where e.trip.id = ?1")
    List<ErrorReport> findAllByTripId(Long id);

}
