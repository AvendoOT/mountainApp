import { TripDTO } from "../TripDTO";

export interface OnDutySignUpRequestDTO {
  requestID: number;
  trip: TripDTO;
  userID: number;
}
