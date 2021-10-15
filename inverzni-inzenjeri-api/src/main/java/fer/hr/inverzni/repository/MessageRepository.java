package fer.hr.inverzni.repository;

import fer.hr.inverzni.model.Message;
import fer.hr.inverzni.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    Integer countByToAndSeen(User to, boolean seen);

    List<Message> getAllByTo(User to);

}
