package fer.hr.inverzni.repository;

import fer.hr.inverzni.model.HikerRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HikerRequestRepository extends JpaRepository<HikerRequest, Long> {

}
