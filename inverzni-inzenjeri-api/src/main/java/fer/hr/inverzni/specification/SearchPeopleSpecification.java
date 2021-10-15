package fer.hr.inverzni.specification;

import fer.hr.inverzni.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class SearchPeopleSpecification implements Specification<User> {

    private static final Logger LOG = LoggerFactory.getLogger(SearchPeopleSpecification.class);

    private String keyWords;

    public SearchPeopleSpecification(String keyWords) {
        this.keyWords = "%" + keyWords.toUpperCase() + "%";
    }

    @Override
    public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        return getKeyWordPredicate(root, criteriaBuilder);
    }

    private Predicate getKeyWordPredicate(Root<User> root, CriteriaBuilder criteriaBuilder) {
        final String[] stringList = keyWords.split(" ");
        if (stringList.length == 2) {
            return criteriaBuilder.and(
                criteriaBuilder.like(criteriaBuilder.upper(root.get("firstName")), stringList[0]),
                criteriaBuilder.like(criteriaBuilder.upper(root.get("lastName")), stringList[1])
            );
        } else if (stringList.length == 3) {
            return criteriaBuilder.or(
                criteriaBuilder.and(criteriaBuilder.like(criteriaBuilder.upper(root.get("firstName")), stringList[0]),
                    criteriaBuilder
                        .like(criteriaBuilder.upper(root.get("lastName")), stringList[1] + " " + stringList[2]),
                    criteriaBuilder.and(criteriaBuilder
                            .like(criteriaBuilder.upper(root.get("firstName")), stringList[0] + " " + stringList[1]),
                        criteriaBuilder.like(criteriaBuilder.upper(root.get("lastName")), stringList[2]))));

        } else {
            LOG.info(keyWords);
            Predicate predicate = criteriaBuilder.or(
                criteriaBuilder.like(criteriaBuilder.upper(root.get("firstName")), keyWords),
                criteriaBuilder.like(criteriaBuilder.upper(root.get("lastName")), keyWords)
            );
            LOG.info(predicate.getExpressions().toString());
            return predicate;
        }
    }

}
