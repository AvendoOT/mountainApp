package fer.hr.inverzni.controller;

import fer.hr.inverzni.dto.CreateUserDTO;
import fer.hr.inverzni.dto.UserDetailsDTO;
import fer.hr.inverzni.exception.UserExistsException;
import fer.hr.inverzni.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/register")
public class UserRegistrationController {

    private static final Logger LOG = LoggerFactory.getLogger(UserRegistrationController.class);

    private final UserService userService;

    @Autowired
    public UserRegistrationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserDetailsDTO> registerUser(@ModelAttribute CreateUserDTO userDTO,
        HttpServletRequest request, Errors errors) throws ServletException {
        UserDetailsDTO register;
        try {
            userService.checkIfUsernameExists(userDTO.getUsername());
            // user given password before bcrypt - required for functional auto login
            // if registration was successful
            userDTO.setPassword(userService.passwordEncoder(userDTO.getPassword()));
            register = userService.registerUser(userDTO);
        } catch (UserExistsException e) {
            LOG.error("User already exists");
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(register);
    }

}
