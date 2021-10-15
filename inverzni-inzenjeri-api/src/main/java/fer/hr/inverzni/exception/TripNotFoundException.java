package fer.hr.inverzni.exception;

public class TripNotFoundException extends RuntimeException {

    public TripNotFoundException() {
    }

    public TripNotFoundException(String message) {
        super(message);
    }

}
