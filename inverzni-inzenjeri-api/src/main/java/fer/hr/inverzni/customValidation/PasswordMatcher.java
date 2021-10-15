package fer.hr.inverzni.customValidation;

import fer.hr.inverzni.customValidation.validator.PasswordMatcherValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.TYPE, ElementType.ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordMatcherValidator.class)
@Documented
public @interface PasswordMatcher {

    String message() default "Incorrect password";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
