import { TripDTO } from "./TripDTO";
import { UserDetails } from "./UserDetails";

export interface UserProfileDetails {
  id: number;
  username: string;
  userRole: string;
  firstName: string;
  lastName: string;
  badge: string;
  email: string;
  visitedTrips: TripDTO[];
  friends: UserDetails[];
  pendingFriends: UserDetails[];
  favouriteTrips: TripDTO[];
}
