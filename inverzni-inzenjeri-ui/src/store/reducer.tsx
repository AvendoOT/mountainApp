import { combineReducers } from "@reduxjs/toolkit";
import { registerUser } from "./registerUser.slice";
import { authentication } from "./authentication.slice";
import { tripList } from "./trips.slice";
import { search } from "./search.slice";
import { createTrip } from "./createTrip.slice";
import { errorReports } from "./errorReports.slice";
import { friendRequest } from "./userFriends.slice";
import { searchPeople } from "./PeopleSearch.slice";
import { getFavTrips } from "./getFavouriteTrips.slice";
import { notification } from "./notification.slice";
import { grades } from "./grade.slice";
import { onDutySignUp } from "./onDutySignUp.slice";
import { createEvent } from "./createEvent.slice";
import { confirmTrip } from "./confirmTrips.slice";
import { homepage } from "./homepage.slice";
import { event } from "./event.slice";
import { getArchiveTrips } from "./getArchivedTrips.slice";

export const rootReducer = combineReducers({
  registerUser,
  authentication,
  tripList,
  search,
  createTrip,
  errorReports,
  friendRequest,
  searchPeople,
  createEvent,
  getFavTrips,
  notification,
  grades,
  onDutySignUp,
  confirmTrip,
  homepage,
  event,
  getArchiveTrips,
});

export type RootState = ReturnType<typeof rootReducer>;
