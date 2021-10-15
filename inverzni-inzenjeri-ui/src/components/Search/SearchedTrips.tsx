import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { TripCard } from "../TripCard/TripCard";
import { authenticationActions } from "../../store/authentication.slice";
import { getFavouriteTripsActions } from "../../store/getFavouriteTrips.slice";
import { LoadingIcon } from "../../util/LoadingIcon";

export const SearchedTrips = () => {
  const dispatch = useDispatch();
  const { searchedTrips, searchedTripsStatus } = useSelector(
    (state: RootState) => state.search
  );

  const { isLoggedIn } = useSelector(
    (state: RootState) => state.authentication
  );

  const { getFavouriteTripsStatus } = useSelector(
    (state: RootState) => state.getFavTrips
  );

  useEffect(() => {
    dispatch(getFavouriteTripsActions.getFavouriteTrips());
  }, [isLoggedIn, dispatch]);

  if (
    searchedTripsStatus === "success" &&
    searchedTrips.totalElements &&
    ((getFavouriteTripsStatus === "success" && isLoggedIn) || !isLoggedIn)
  ) {
    return (
      <div className={"Homepage-main"}>
        <div className={"Homepage-subContainer"}>
          <h3 className={"Homepage-subTitle"}>Izleti</h3>
          <div className={"Homepage-container"}>
            {searchedTrips.content.map((t) => (
              <div className={"Homepage-card"}>
                <TripCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={"Homepage-subContainer"}>
        <h2 className={"Homepage-subTitle"}>Nema izleta</h2>
      </div>
    );
  }
};
