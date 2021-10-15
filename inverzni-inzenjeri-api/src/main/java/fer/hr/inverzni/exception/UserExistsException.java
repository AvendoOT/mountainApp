package fer.hr.inverzni.exception;

public class UserExistsException extends RuntimeException {

    public UserExistsException() {
    }

    public UserExistsException(String message) {
        super(message);
    }

}

