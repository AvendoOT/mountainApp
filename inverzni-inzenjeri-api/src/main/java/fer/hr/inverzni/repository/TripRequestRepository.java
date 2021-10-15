package fer.hr.inverzni.repository;

import fer.hr.inverzni.model.TripRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRequestRepository extends JpaRepository<TripRequest, Long> {
}
