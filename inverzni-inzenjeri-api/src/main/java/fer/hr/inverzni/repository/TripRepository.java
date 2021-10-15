package fer.hr.inverzni.repository;

import fer.hr.inverzni.model.Trip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long>, JpaSpecificationExecutor<Trip> {

    Page<Trip> findAll(Specification<Trip> specification, Pageable pageable);

    Optional<Trip> findByPeak(String peak);

    @Query("select e from Trip e where e.creator.id = ?1")
    List<Trip> findByCreatorId(Long userId);

}
