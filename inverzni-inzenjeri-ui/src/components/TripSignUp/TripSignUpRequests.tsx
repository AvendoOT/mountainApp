import React, { useEffect } from "react";
import "./TripSignUpRequests.css";
import { Scrollbars } from "rc-scrollbars";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducer";
import { TripSignUpRequestCard } from "./TripSignUpRequestCard/TripSignUpRequestCard";
import { authenticationActions } from "../../store/authentication.slice";
import { onDutyActions } from "../../store/onDutySignUp.slice";

export const TripSignUpRequests = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userDetails, userProfileDetails } = useSelector(
    (state: RootState) => state.authentication
  );
  const { requestsResponse, getStatus } = useSelector(
    (state: RootState) => state.onDutySignUp
  );
  useEffect(() => {
    dispatch(authenticationActions.getLoggedInUserDetails());
    dispatch(onDutyActions.onDutySignUpRequests());
  }, [dispatch]);

  if (!isLoggedIn || userDetails.userRole !== "ADMIN") {
    return <div></div>;
  }
  return (
    <div className={"tripSignUpRequestsCenter"}>
      <div className={"tripSignUpRequestsLabel"}>Potvrda dežurstva</div>
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
        {requestsResponse.map((t) => (
          <TripSignUpRequestCard request={t} />
        ))}
      </Scrollbars>
    </div>
  );
};
