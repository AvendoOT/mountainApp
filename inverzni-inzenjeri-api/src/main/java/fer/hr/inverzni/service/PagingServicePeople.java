package fer.hr.inverzni.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface PagingServicePeople<T> {

    Page<T> findAllPeoplePaginatedWithSearch(Specification<T> specification, Pageable pageable);

}
