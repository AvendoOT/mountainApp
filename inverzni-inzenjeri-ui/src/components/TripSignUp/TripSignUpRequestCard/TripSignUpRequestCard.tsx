import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { authenticationActions } from "../../../store/authentication.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import { onDutyActions } from "../../../store/onDutySignUp.slice";
import { OnDutySignUpDecision } from "../../../models/OnDutySignUpModels/OnDutySignUpDecision";

export const TripSignUpRequestCard = (props) => {
  const dispatch = useDispatch();
  const [submitClicked, setSubmitClicked] = useState(false);
  const { userProfileDetails } = useSelector(
    (state: RootState) => state.authentication
  );
  useEffect(() => {
    dispatch(authenticationActions.getUserProfileDetails(props.request.userID));
  }, [props.request.userID, dispatch]);

  const handleClick = (event, accepted) => {
    const req = props.request;
    const reqDTO = {
      requestID: props.request.id,
      tripID: req.trip.id,
      userID: req.userID,
      accepted: accepted,
    } as OnDutySignUpDecision;
    dispatch(onDutyActions.onDutySignUpAccept(reqDTO));
    setSubmitClicked(true);
  };

  if (submitClicked) {
    return <div></div>;
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {userProfileDetails.firstName + " " + userProfileDetails.lastName}
        </Card.Header>
        <Card.Description>
          <strong>{"Izlet #" + props.request.trip.id}</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="green"
            onClick={(event) => {
              handleClick(event, true);
            }}
          >
            Approve
          </Button>
          <Button
            basic
            color="red"
            onClick={(event) => {
              handleClick(event, false);
            }}
          >
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};
