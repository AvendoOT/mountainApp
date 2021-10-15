import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { authenticationActions } from "../../store/authentication.slice";
import BasicProfileInformation from "./BasicProfileInformation/BasicProfileInformation";
import { TripCard } from "../TripCard/TripCard";
import FriendList from "./Friends/FriendList";
import { getFavouriteTripsActions } from "../../store/getFavouriteTrips.slice";
import "./Profile.css";
import { tripsActions } from "../../store/trips.slice";
import { useHistory } from "react-router";
import { onDutyActions } from "../../store/onDutySignUp.slice";
import { confirmTripActions } from "../../store/confirmTrips.slice";
import { LoadingIcon } from "../../util/LoadingIcon";
import { getArchivedTripsActions } from "../../store/getArchivedTrips.slice";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    userProfileDetails,
    getProfileDetailsStatus,
    userDetails,
    onDutyStatus,
  } = useSelector((state: RootState) => state.authentication);
  const { requestsResponse, getStatus } = useSelector(
    (state: RootState) => state.onDutySignUp
  );
  const { requestsResponseConfirmTrip } = useSelector(
    (state: RootState) => state.confirmTrip
  );
  const {
    getFavouriteTripsStatus,
    favouriteTripsDetailed,
    getFavouriteTripsDetailedStatus,
  } = useSelector((state: RootState) => state.getFavTrips);

  const { archivedTrips, getArchivedTripsStatus } = useSelector(
    (state: RootState) => state.getArchiveTrips
  );

  const { tripsCreatedByUser, getTripsCreatedByUserStatus } = useSelector(
    (state: RootState) => state.tripList
  );

  useEffect(() => {
    if (userDetails.id !== undefined) {
      dispatch(authenticationActions.getUserProfileDetails(userDetails.id));
      dispatch(getFavouriteTripsActions.getFavouriteTrips());
      dispatch(tripsActions.getCreatedTrips(userDetails.id));
      dispatch(onDutyActions.onDutySignUpRequests());
      dispatch(confirmTripActions.confirmTripRequests());
      dispatch(getFavouriteTripsActions.getFavouriteTripsDetails());
      dispatch(getArchivedTripsActions.getArchivedTrips());
    }
  }, [userDetails.id, dispatch]);
  useEffect(() => {
    dispatch(authenticationActions.getLoggedInUserDetails());
    dispatch(authenticationActions.getLoggedInUserProfileDetails());
    dispatch(authenticationActions.getOnDutyStatus());
  }, [dispatch]);

  if (
    getProfileDetailsStatus === "success" &&
    getFavouriteTripsStatus === "success" &&
    getArchivedTripsStatus === "success"
  ) {
    return (
      <div>
        <BasicProfileInformation
          id={userProfileDetails.id}
          firstName={userProfileDetails.firstName}
          lastName={userProfileDetails.lastName}
          username={userProfileDetails.username}
          userRole={userProfileDetails.userRole}
          email={userProfileDetails.email}
          badge={userProfileDetails.badge}
        />
        <br />
        <div className={"profileCenteredButton"}>
          {userDetails.userRole === "ADMIN" ? (
            <a href={"/tripSignUp/requests"}>
              <button type="button" className={"event-button"}>
                Zahtjeva za dežurstvo: {requestsResponse.length}
              </button>
            </a>
          ) : (
            <div></div>
          )}
          {onDutyStatus ? (
            <a href={"/confirmTrips"}>
              <button type="button" className={"event-button"}>
                Zahtjeva za pohađanje izleta:{" "}
                {requestsResponseConfirmTrip.length}
              </button>
            </a>
          ) : (
            <div></div>
          )}
        </div>
        {userProfileDetails.visitedTrips.length > 0 ? ( // if you have visited any trips, show all of them
          <div>
            <div
              style={{
                fontSize: "22px",
                textAlign: "center",
                color: "#2e82f4",
              }}
            >
              Do sad ste posjetili sljedeće izlete:
            </div>
            <div className={"Homepage-main"}>
              <div className={"Homepage-subContainer"}>
                <div
                  className={"Homepage-container"}
                  style={{
                    border: "1px solid grey",
                    padding: "2px",
                    borderRadius: "4px",
                    borderColor: "#2e82f4",
                  }}
                >
                  {userProfileDetails.visitedTrips.map((t) => (
                    <div className={"Homepage-card"}>
                      <TripCard t={t} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // else, say that you haven't yet visited any trips
          <div className={"friendListLabel"}>
            Do sad niste posjetili nijedan izlet.
          </div>
        )}
        <div
          className={"friendListLabel"}
          style={{ marginTop: "10px", marginBottom: "5px" }}
        >
          Lista prijatelja:
        </div>

        {userProfileDetails.friends.length > 0 ? ( // if you have at least one friend, show all of them
          <FriendList friends={userProfileDetails.friends} />
        ) : (
          // else say that you have no friends yet
          <div className={"friendListLabel"}>
            Nemate još nijednog prijatelja.
          </div>
        )}

        {getTripsCreatedByUserStatus === "success" &&
        tripsCreatedByUser.length > 0 ? (
          <div>
            <div className={"friendListLabel"} style={{ marginTop: "1em" }}>
              Izleti koje ste do sada stvorili:
            </div>

            <div className={"Homepage-main"}>
              <div className={"Homepage-subContainer"}>
                <div
                  className={"Homepage-container"}
                  style={{
                    border: "1px solid grey",
                    padding: "2px",
                  }}
                >
                  {tripsCreatedByUser.map((t) => (
                    <div className={"Homepage-card"}>
                      <TripCard t={t} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: 50,
              }}
            >
              <button
                className={"othersProfile-button"}
                onClick={(event) => history.push("/reports")}
              >
                Pogledaj prijave grešaka za svoje izlete
              </button>
            </div>
          </div>
        ) : (
          <div className={"friendListLabel"} style={{ marginTop: "1em" }}>
            Do sada niste stvorili niti jedan izlet.
          </div>
        )}

        {getFavouriteTripsDetailedStatus === "success" &&
        favouriteTripsDetailed.length > 0 ? (
          <div>
            <div
              style={{
                fontSize: "22px",
                textAlign: "center",
                color: "#2e82f4",
              }}
            >
              Vaši favoriti:
            </div>

            <div className={"Homepage-main"}>
              <div className={"Homepage-subContainer"}>
                <div
                  className={"Homepage-container"}
                  style={{
                    border: "1px solid grey",
                    padding: "2px",
                  }}
                >
                  {favouriteTripsDetailed.map((t) => (
                    <div className={"Homepage-card"}>
                      <TripCard t={t} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              fontSize: "22px",
              textAlign: "center",
              color: "#2e82f4",
            }}
          >
            Nemate još nijednog favorita.
          </div>
        )}

        {archivedTrips.length > 0 ? (
          <div>
            <div
              style={{
                fontSize: "22px",
                textAlign: "center",
                color: "#2e82f4",
                marginTop: "1em",
              }}
            >
              Vaši arhivirani izleti:
            </div>

            <div className={"Homepage-main"}>
              <div className={"Homepage-subContainer"}>
                <div
                  className={"Homepage-container"}
                  style={{
                    border: "1px solid grey",
                    padding: "2px",
                  }}
                >
                  {archivedTrips.map((t) => (
                    <div className={"Homepage-card"}>
                      <TripCard t={t} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              fontSize: "22px",
              textAlign: "center",
              color: "#2e82f4",
              marginTop: "1em",
            }}
          >
            Nemate nijedan arhiviran izlet.
          </div>
        )}
      </div>
    );
  } else {
    return <LoadingIcon />;
  }
}
