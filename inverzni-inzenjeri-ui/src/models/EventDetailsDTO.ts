import { TripDTO } from "./TripDTO";
import { UserDetails } from "./UserDetails";

export interface EventDetailsDTO {
  id: number;
  name: string;
  description: string;
  date: string;
  trip: TripDTO;
  creator: UserDetails; //creator of event
  invitedUsers: UserDetails[];
  acceptedUsers: UserDetails[];
}
