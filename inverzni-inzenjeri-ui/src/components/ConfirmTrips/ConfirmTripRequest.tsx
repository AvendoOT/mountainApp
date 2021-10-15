import React, { useEffect, useState } from "react";
import { RootState } from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../../store/authentication.slice";
import { tripsActions } from "../../store/trips.slice";
import { Field, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { Icon } from "semantic-ui-react";
import getHoursMinutes from "../TripCard/getHoursMinutes";
import "./ConfirmTripRequest.css";
import { Redirect, useHistory } from "react-router";
import { confirmTripActions } from "../../store/confirmTrips.slice";

const validationSchema = Yup.object().shape({
  confirmTripRequestSelector: Yup.string().required("Obavezno polje"),
});

export const ConfirmTripRequest = () => {
  const dispatch = useDispatch();
  const { tripsNotPendingConfirmation } = useSelector(
    (state: RootState) => state.tripList
  );
  const { userDetails, isLoggedIn } = useSelector(
    (state: RootState) => state.authentication
  );
  const [submitClicked, setSubmitClicked] = useState(false);
  const { response, addStatus } = useSelector(
    (state: RootState) => state.confirmTrip
  );
  useEffect(() => {
    dispatch(authenticationActions.getLoggedInUserDetails());
  }, [dispatch]);
  useEffect(() => {
    dispatch(tripsActions.getTripsNotPendingConfirmation());
  }, [dispatch]);

  const initalTrip = {
    id: null,
    duration: 0,
    difficulty: null,
    description: null,
    peak: null,
    area: null,
    length: null,
    rate: null,
    cabins: null,
  };

  const [selectedTrip, setSelectedTrip] = useState(initalTrip);
  const initialValues = {
    confirmTripRequestSelector: "",
  };

  const submit = (values: FormikValues) => {
    dispatch(
      confirmTripActions.confirmTripRequestAction({
        tripID: values.confirmTripRequestSelector,
        userID: userDetails.id,
      })
    );
    setSubmitClicked(true);
  };

  const showTrip = (e) => {
    let selected;
    selected = tripsNotPendingConfirmation.find((t) => t.id == e.target.value);
    setSelectedTrip(selected);
  };

  const tripDetails = () => {
    if (selectedTrip == undefined || selectedTrip.id == null) {
      return null;
    } else {
      return (
        <div className={"tripSignUp-tripDetails"}>
          <div className={"tripSignUp-tripDetail"}>
            <Icon name={"map marker alternate"} />

            {selectedTrip.area}
          </div>
          <div className={"tripSignUp-tripDetail"}>
            <Icon name={"clock"} />

            {getHoursMinutes(selectedTrip.duration)}
          </div>
          <div className={"tripSignUp-tripDetail"}>
            <Icon name={"chart line"} />
            {selectedTrip.difficulty}/5
          </div>
          <div className={"tripSignUp-tripDetail"}>
            <Icon name={"caret up"} />

            {selectedTrip.peak}
          </div>
          <div className={"tripSignUp-tripDetail"}>
            <Icon name={"resize horizontal"} />
            {selectedTrip.length} km
          </div>
          <div className={"tripSignUp-tripDetail"}>
            <Icon name={"star"} />
            {selectedTrip.rate}/10
          </div>
        </div>
      );
    }
  };

  if (!isLoggedIn) {
    return <div></div>;
  }

  if (submitClicked && addStatus === "success") {
    if (response.ok) {
      return <Redirect to="/" />;
    }
  }

  return (
    <div className={"confirmTripRequest-centered"}>
      <div className={"confirmTripRequest-label"}>Zahtjev za sudjelovanje</div>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        {({ handleChange, errors, touched }) => (
          <Form>
            <div>
              <div className={"confirmTripRequest-centeredDiv"}>
                <Field
                  id={"confirmTripRequestSelector"}
                  as={"select"}
                  name={"confirmTripRequestSelector"}
                  className={"confirmTripRequestSelector"}
                  onChange={(e) => {
                    handleChange(e);
                    showTrip(e);
                  }}
                >
                  <option value={""}>Odaberite izlet</option>
                  {tripsNotPendingConfirmation.map((t) => (
                    <option key={t.id} value={t.id}>
                      {"Izlet #" + t.id}
                    </option>
                  ))}
                </Field>
              </div>
              {tripDetails()}
              {errors.confirmTripRequestSelector &&
              touched.confirmTripRequestSelector ? (
                <div className="error confirmTripRequest-centeredDiv confirmTripRequest-error">
                  {errors.confirmTripRequestSelector}
                </div>
              ) : null}
            </div>
            <div
              className={
                "confirmTripRequest-centeredDiv confirmTripRequest-description"
              }
            >
              {selectedTrip == undefined ? null : selectedTrip.description}
            </div>
            <div className={"confirmTripRequest-centeredDiv"}>
              <Field
                className={"confirmTripRequest-button"}
                type="submit"
                value={"Pošalji prijavu"}
                id={"confirmTripRequestButton"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
