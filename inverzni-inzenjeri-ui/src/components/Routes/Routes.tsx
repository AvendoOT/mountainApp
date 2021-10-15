import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";
import { LoginForm } from "../LoginForm/LoginForm";
import { TripList } from "../TripList/TripList";
import TripFilter from "../Filters/TripFilter/TripFilter";
import { Header } from "./Header";
import { SearchedTrips } from "../Search/SearchedTrips";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { Logout } from "../LoginLogoutButton/Logout";
import { Redirect } from "react-router";
import { CreateEvent } from "../CreateEvent/CreateEvent";
import Profile from "../Profile/Profile";
import OthersProfile from "../Profile/OthersProfile/OthersProfile";
import { CreateTripForm } from "../CreateTripForm/CreateTripForm";
import { ErrorReportsList } from "../ErrorReportsList/ErrorReportsList";
import { CreateErrorReport } from "../CreateErrorReport/CreateErrorReport";
import { SearchedPeople } from "../Search/SearchedPeople";
import PeopleFilter from "../Filters/PeopleFilter/PeopleFilter";
import { NotificationList } from "../Notification/NotificationList";
import { ConfirmTrips } from "../ConfirmTrips/ConfirmTrips";
import { TripSignUp } from "../TripSignUp/TripSignUp";
import Trip from "../Trip/Trip";
import { TripSignUpRequests } from "../TripSignUp/TripSignUpRequests";
import { ConfirmTripRequest } from "../ConfirmTrips/ConfirmTripRequest";
import Event from "../Event/Event";
import { Homepage } from "../Homepage/Homepage";
import { authenticationActions } from "../../store/authentication.slice";
import { EditTrip } from "../EditTrip/EditTrip";

export const Routes = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, userDetails, loginStatus } = useSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    dispatch(authenticationActions.getLoggedInUserDetails());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Route path={"/"} exact={true}>
        {isLoggedIn ? <PeopleFilter /> : null}
        <Homepage />
      </Route>
      <Route path={"/registration"} exact={true}>
        <RegistrationForm />
      </Route>
      <Route path={"/login"} exact={true}>
        <LoginForm />
      </Route>
      <Route path={"/trips"} exact={true}>
        {/*<Header />*/}
        <TripFilter />
        <TripList />
      </Route>
      <Route path={"/trips/search"} exact={true}>
        {/*<Header/>*/}
        <TripFilter />
        <SearchedTrips />
      </Route>
      <Route path={"/users/search"} exact={true}>
        <SearchedPeople />
      </Route>
      <Route path="/logout" exact={true}>
        {isLoggedIn ? <Logout /> : <Redirect to={"/"} />}
      </Route>
      <Route path={"/myProfile"} exact={true}>
        <Profile />
      </Route>
      <Route path="/events/create" exact={true}>
        {/*<Header/>*/}
        <CreateEvent />
      </Route>
      <Route
        path={"/profile/:id"}
        exact={true}
        render={(props) => (
          <OthersProfile {...props} key={props.location.key} />
        )}
      />
      <Route
        path={"/trip/:id"}
        exact={true}
        render={(props) => <Trip {...props} key={props.location.key} />}
      />
      <Route path={"/createTrip"} exact={true}>
        <CreateTripForm />
      </Route>

      <Route path={"/reports"} exact={true}>
        <ErrorReportsList />
      </Route>
      <Route path={"/createReport"} exact={true}>
        <CreateErrorReport />
      </Route>
      {/*<Route path="/notification" exact={true}>*/}
      {/*  <NotificationList />*/}
      {/*</Route>*/}
      <Route path={"/confirmTrips"} exact={true}>
        <ConfirmTrips />
      </Route>
      <Route path={"/confirmTrips/send"}>
        <ConfirmTripRequest />
      </Route>
      <Route path={"/tripSignUp/requests"} exact={true}>
        <TripSignUpRequests />
      </Route>
      <Route path={"/tripSignUp"} exact={true}>
        <TripSignUp />
      </Route>
      <Route
        path={"/event/:id"}
        exact={true}
        render={(props) => <Event {...props} key={props.location.key} />}
      />

      <Route
        path={"/edit/trip/:id"}
        exact={true}
        render={(props) => <EditTrip {...props} key={props.location.key} />}
      />
    </Router>
  );
};
