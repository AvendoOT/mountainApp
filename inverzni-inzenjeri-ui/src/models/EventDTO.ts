import { TripDTO } from "./TripDTO";
import { UserDetails } from "./UserDetails";

export interface EventDTO {
  name: string;
  description: string;
  date: string;
  tripID: number;
  creatorID: number; //creator of event
  invitedUsersIDs: number[];
}
