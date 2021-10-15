package fer.hr.inverzni.specification;

import fer.hr.inverzni.model.Area;
import fer.hr.inverzni.model.Trip;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class SearchSpecification implements Specification<Trip> {

    private       Long   minimalDuration;
    private       Long   maximalDuration;
    private       Long   minimalDifficulty;
    private       Long   maximalDifficulty;
    private       String keyWord;
    private final String keyWordEmpty = "%UNDEFINED%";

    private static final Logger LOG = LoggerFactory.getLogger(SearchSpecification.class);

    public SearchSpecification(Long minimalDuration, Long maximalDuration,
        Long minimalDifficulty, Long maximalDifficulty, String keyWord) {
        this.minimalDuration = minimalDuration;
        this.maximalDuration = maximalDuration;
        this.minimalDifficulty = minimalDifficulty;
        this.maximalDifficulty = maximalDifficulty;
        this.keyWord = (keyWord == null || keyWord.equals("")) ? "%%" : "%" + keyWord.toUpperCase() + "%";
    }

    @Override
    public Predicate toPredicate(Root<Trip> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (!keyWord.equals(keyWordEmpty)) {
            return getKeyWordPredicate(root, criteriaBuilder);
        } else {
            return criteriaBuilder.and(getDifficultyPredicate(root, criteriaBuilder),
                getDurationPredicate(root, criteriaBuilder));
        }
    }

    private Predicate getDurationPredicate(Root<Trip> root, CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.between(root.get("duration"), minimalDuration, maximalDuration);
    }

    private Predicate getDifficultyPredicate(Root<Trip> root, CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.between(root.get("difficulty"), minimalDifficulty, maximalDifficulty);
    }

    private Predicate getKeyWordPredicate(Root<Trip> root, CriteriaBuilder criteriaBuilder) {
        Join<Area, Trip> joinArea = root.join("area", JoinType.LEFT);
        Predicate areaTripPredicate = criteriaBuilder.like(criteriaBuilder.upper(joinArea.get("name")), keyWord);
        Predicate predicate = criteriaBuilder.or(
            criteriaBuilder.like(criteriaBuilder.upper(root.get("peak")), keyWord),
            criteriaBuilder.like(criteriaBuilder.upper(root.get("description")), keyWord),
            areaTripPredicate);
        LOG.info(predicate.getExpressions().toString());
        return predicate;
    }

}
