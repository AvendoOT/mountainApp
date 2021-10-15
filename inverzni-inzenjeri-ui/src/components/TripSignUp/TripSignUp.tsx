import React, { useEffect, useState } from "react";
import { RootState } from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../../store/authentication.slice";
import { tripsActions } from "../../store/trips.slice";
import { Field, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { Icon } from "semantic-ui-react";
import getHoursMinutes from "../TripCard/getHoursMinutes";
import "./TripSignUp.css";
import { Redirect, useHistory } from "react-router";
import { onDutyActions } from "../../store/onDutySignUp.slice";

const validationSchema = Yup.object().shape({
  tripSignUpSelector: Yup.string().required("Obavezno polje"),
});

export const TripSignUp = () => {
  const dispatch = useDispatch();
  const { tripsAvailableForDuty, getTripsAvailableForDutyStatus } = useSelector(
    (state: RootState) => state.tripList
  );
  const { userDetails, isLoggedIn } = useSelector(
    (state: RootState) => state.authentication
  );
  const [submitClicked, setSubmitClicked] = useState(false);
  const { response, addStatus } = useSelector(
    (state: RootState) => state.onDutySignUp
  );
  useEffect(() => {
    dispatch(authenticationActions.getLoggedInUserDetails());
  }, [dispatch]);
  useEffect(() => {
    dispatch(tripsActions.getTripsAvailableForDuty());
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
    tripSignUpSelector: "",
  };

  const submit = (values: FormikValues) => {
    dispatch(
      onDutyActions.onDutySignUpAction({
        tripID: values.tripSignUpSelector,
        userID: userDetails.id,
      })
    );
    setSubmitClicked(true);
  };

  const showTrip = (e) => {
    let selected;
    selected = tripsAvailableForDuty.find((t) => t.id == e.target.value);
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
    <div className={"tripSignUp-centered"}>
      <div className={"tripSignUp-label"}>Prijava za dežurstvo</div>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        {({ handleChange, errors, touched }) => (
          <Form>
            <div>
              <div className={"TripSignUp-centeredDiv"}>
                <Field
                  id={"tripSignUpSelector"}
                  as={"select"}
                  name={"tripSignUpSelector"}
                  className={"tripSignUpSelector"}
                  onChange={(e) => {
                    handleChange(e);
                    showTrip(e);
                  }}
                >
                  <option value={""}>Odaberite izlet</option>
                  {tripsAvailableForDuty.map((t) => (
                    <option key={t.id} value={t.id}>
                      {"Izlet #" + t.id}
                    </option>
                  ))}
                </Field>
              </div>
              {tripDetails()}
              {errors.tripSignUpSelector && touched.tripSignUpSelector ? (
                <div className="error TripSignUp-centeredDiv tripSignUp-error">
                  {errors.tripSignUpSelector}
                </div>
              ) : null}
            </div>
            <div className={"TripSignUp-centeredDiv TripSignUp-description"}>
              {selectedTrip == undefined ? null : selectedTrip.description}
            </div>
            <div className={"TripSignUp-centeredDiv"}>
              <Field
                className={"tripSignUp-button"}
                type="submit"
                value={"Pošalji prijavu"}
                id={"signUpForTrip"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
