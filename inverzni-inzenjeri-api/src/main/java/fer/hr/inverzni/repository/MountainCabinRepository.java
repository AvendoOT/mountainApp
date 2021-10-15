package fer.hr.inverzni.repository;

import fer.hr.inverzni.model.MountainCabin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MountainCabinRepository extends JpaRepository<MountainCabin, Long> {

    MountainCabin findByName(String name);

    MountainCabin findMountainCabinByNameAndEatAndPowerAndSleepAndWater(String name, Boolean eat, Boolean power, Boolean sleep, Boolean water);
}
