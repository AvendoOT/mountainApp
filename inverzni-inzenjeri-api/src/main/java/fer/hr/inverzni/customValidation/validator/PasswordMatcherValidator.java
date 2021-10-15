package fer.hr.inverzni.customValidation.validator;

import fer.hr.inverzni.customValidation.PasswordMatcher;
import fer.hr.inverzni.dto.CreateUserDTO;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Class that implemnts constraint validator interface from javax.validation and check whether the password and its
 * repeated value is the same
 */
public class PasswordMatcherValidator implements ConstraintValidator<PasswordMatcher, Object> {

    @Override
    public void initialize(PasswordMatcher constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        CreateUserDTO userDTO = (CreateUserDTO) value;
        if (userDTO.getPassword() == null || userDTO.getMatchingPassword() == null) {
            return false;
        }
        return userDTO.getPassword().equals(userDTO.getMatchingPassword());
    }

}