package fer.hr.inverzni.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface PagingService<T> {

    Page<T> findAllPaginatedWithSearch(Specification<T> specification, Pageable pageable,
        Long minimalGrade, Long maximalGrade);

}
