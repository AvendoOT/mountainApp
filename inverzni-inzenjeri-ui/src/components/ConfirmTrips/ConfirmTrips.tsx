import React, { useEffect } from "react";
import { ConfirmTripCard } from "./ConfirmTripCard/ConfirmTripCard";
import "./ConfirmTrips.css";
import { Scrollbars } from "rc-scrollbars";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { authenticationActions } from "../../store/authentication.slice";
import { confirmTripActions } from "../../store/confirmTrips.slice";

export const ConfirmTrips = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(
    (state: RootState) => state.authentication
  );
  const { requestsResponseConfirmTrip } = useSelector(
    (state: RootState) => state.confirmTrip
  );

  useEffect(() => {
    dispatch(confirmTripActions.confirmTripRequests());
  }, [dispatch]);
  if (!isLoggedIn) {
    return <div></div>;
  }

  return (
    <div className={"confirmTripsCenter"}>
      <div className={"confirmTripsLabel"}>Potvrda izleta</div>
      <Scrollbars
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid grey",
          display: "inline-block",
          borderRadius: "4px",
          borderColor: "#2e82f4",
        }}
      >
        {requestsResponseConfirmTrip.map((t) => (
          <ConfirmTripCard request={t} />
        ))}
      </Scrollbars>
    </div>
  );
};
