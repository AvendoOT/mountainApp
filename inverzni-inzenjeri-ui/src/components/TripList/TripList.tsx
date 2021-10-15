import React, { useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { tripsActions } from "../../store/trips.slice";
import { TripCard } from "../TripCard/TripCard";
import "./TripList.css";
import "../Homepage/Homepage.css";
import { getFavouriteTripsActions } from "../../store/getFavouriteTrips.slice";
import { LoadingIcon } from "../../util/LoadingIcon";

export const TripList = () => {
  const dispatch = useDispatch();
  const { trips, getTripStatus } = useSelector(
    (state: RootState) => state.tripList
  );
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.authentication
  );
  const { getFavouriteTripsStatus } = useSelector(
    (state: RootState) => state.getFavTrips
  );

  useEffect(() => {
    dispatch(tripsActions.getTrips());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getFavouriteTripsActions.getFavouriteTrips());
    }
  }, [isLoggedIn]);

  if (
    getTripStatus === "success" &&
    ((getFavouriteTripsStatus === "success" && isLoggedIn) || !isLoggedIn)
  ) {
    return (
      <div>
        {isLoggedIn && (
          <div className={"tripsCenteredButton"}>
            <a href={"/confirmTrips/send"}>
              <button type="button" className={"event-button"}>
                Potvrda za sudjelovanje
              </button>
            </a>
            <a href={"/tripSignUp"}>
              <button type="button" className={"event-button"}>
                Zahtjev za dežurstvo
              </button>
            </a>
          </div>
        )}
        <div className={"Homepage-main"}>
          <div className={"Homepage-subContainer"}>
            <h3 className={"Homepage-subTitle"}>Izleti</h3>
            <div className={"Homepage-container"}>
              {trips.map((t) => (
                <div className={"Homepage-card"}>
                  <TripCard t={t} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingIcon />;
  }
};
