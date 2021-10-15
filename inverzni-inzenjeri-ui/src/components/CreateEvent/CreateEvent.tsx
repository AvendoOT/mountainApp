import React, { useEffect, useState } from "react";
import { Field, Form, Formik, FormikValues } from "formik";
import "./CreateEvent.css";
import { RootState } from "../../store/reducer";
import { tripsActions } from "../../store/trips.slice";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import getHoursMinutes from "../TripCard/getHoursMinutes";
import { UserDetails } from "../../models/UserDetails";
import { SelectFriends } from "./SelectFriends/SelectFriends";
import * as Yup from "yup";
import { EventDTO } from "../../models/EventDTO";
import { actions } from "../../store/createEvent.slice";
import { Redirect } from "react-router";
import { authenticationActions } from "../../store/authentication.slice";
import { LoadingIcon } from "../../util/LoadingIcon";

const validationSchema = Yup.object().shape({
  eventName: Yup.string().required("Obavezno polje"),
  eventDate: Yup.string().required("Obavezno polje"),
  tripSelector: Yup.string().required("Obavezno polje"),
  invitedFriends: Yup.array().min(1, "Odaberite najmanje jednog prijatelja"),
});

export const CreateEvent = () => {
  const dispatch = useDispatch();
  const { trips, getTripStatus } = useSelector(
    (state: RootState) => state.tripList
  );
  const [submitClicked, setSubmitClicked] = useState(false);
  const { response, addStatus } = useSelector(
    (state: RootState) => state.createEvent
  );
  const {
    userProfileDetails,
    getProfileDetailsStatus,
    userDetails,
  } = useSelector((state: RootState) => state.authentication);
  useEffect(() => {
    if (userDetails.id !== undefined) {
      dispatch(authenticationActions.getUserProfileDetails(userDetails.id));
    }
  }, [userDetails.id, dispatch]);
  useEffect(() => {
    dispatch(authenticationActions.getLoggedInUserDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(tripsActions.getTrips());
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

  if (getProfileDetailsStatus !== "success") {
    return <LoadingIcon />;
  }
  const friendOptions = userProfileDetails.friends.map((f) => ({
    value: f,
    label: f.firstName + " " + f.lastName,
  }));

  const tripDetails = () => {
    if (selectedTrip == undefined || selectedTrip.id == null) {
      return null;
    } else {
      return (
        <div className={"tripDetails"}>
          <div className={"tripDetail"}>
            <Icon name={"map marker alternate"} />

            {selectedTrip.area}
          </div>
          <div className={"tripDetail"}>
            <Icon name={"clock"} />

            {getHoursMinutes(selectedTrip.duration)}
          </div>
          <div className={"tripDetail"}>
            <Icon name={"chart line"} />
            {selectedTrip.difficulty}/5
          </div>
          <div className={"tripDetail"}>
            <Icon name={"caret up"} />

            {selectedTrip.peak}
          </div>
          <div className={"tripDetail"}>
            <Icon name={"resize horizontal"} />
            {selectedTrip.length} km
          </div>
          <div className={"tripDetail"}>
            <Icon name={"star"} />
            {selectedTrip.rate}/10
          </div>
        </div>
      );
    }
  };

  const showTrip = (e) => {
    let selected;
    selected = trips.find((t) => t.id == e.target.value);
    setSelectedTrip(selected);
  };

  const submit = (values: FormikValues) => {
    const eventDTO = convertValues(values) as EventDTO;
    eventDTO["creatorID"] = userDetails.id;
    dispatch(actions.createEventAction(eventDTO));
    setSubmitClicked(true);
  };

  const mainSubmit = (values: FormikValues) => {
    const eventDTO = convertValues(values) as EventDTO;
    eventDTO["creatorID"] = userDetails.id;
    alert(JSON.stringify(eventDTO, null, 2));
  };

  const initialValues = {
    eventName: "",
    eventDate: "",
    tripSelector: "",
    eventDescription: "",
    invitedFriends: [],
  };

  if (submitClicked && addStatus === "success") {
    if (response.ok) {
      return <Redirect to="/" />;
    }
  }

  return (
    <div id="createEvent" className="center-event">
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        {({ handleChange, errors, touched }) => (
          <Form autoComplete={"off"}>
            <div className={""}>
              <h2>Kreiranje događaja</h2>
            </div>
            <div className={"event-elem"}>
              <div className={"event-fieldName"}>Odaberite izlet</div>
              <div>
                <Field
                  id={"tripSelector"}
                  as={"select"}
                  name={"tripSelector"}
                  className={"tripSelector"}
                  onChange={(e) => {
                    handleChange(e);
                    showTrip(e);
                  }}
                >
                  <option value={""}>Odaberite izlet</option>
                  {trips.map((t) => (
                    <option key={t.id} value={t.id}>
                      {"Izlet #" + t.id}
                    </option>
                  ))}
                </Field>
                <a href={"/createTrip"}>
                  <button type="button" className={"event-button"}>
                    Kreiraj novi izlet
                  </button>
                </a>
              </div>
              {tripDetails()}
              {errors.tripSelector && touched.tripSelector ? (
                <div className="selectError error">{errors.tripSelector}</div>
              ) : null}
            </div>
            <div className={"event-elem"}>
              <div className={"event-fieldName"}>Naslov</div>
              <Field
                id={"eventName"}
                type={"text"}
                name={"eventName"}
                placeholder={""}
                className={"eventName"}
              />
            </div>
            {errors.eventName && touched.eventName ? (
              <div className="eventError error">{errors.eventName}</div>
            ) : null}
            <div className={"event-elem"}>
              <div className={"event-fieldName"}>Datum</div>
              <Field
                id={"eventDate"}
                type={"date"}
                name={"eventDate"}
                className={"eventDate"}
              />
              {errors.eventDate && touched.eventDate ? (
                <div className="selectError error">{errors.eventDate}</div>
              ) : null}
            </div>
            <div className={"event-elem"}>
              <div className={"event-fieldName"}>Opis</div>
              <Field
                id={"eventDescription"}
                type={"textarea"}
                name={"eventDescription"}
                placeholder={"Unesite opis događaja..."}
                className={"eventDescription"}
                as={"textarea"}
              />
            </div>
            <div className={"event-elem"}>
              <div className={"event-fieldName"}>
                Odaberite prijatelje (najmanje jednog)
              </div>
              <Field
                name={"invitedFriends"}
                component={SelectFriends}
                options={friendOptions}
              />
              {errors.invitedFriends && touched.invitedFriends ? (
                <div className="selectError error">{errors.invitedFriends}</div>
              ) : null}
            </div>
            <div className={"event-elem"}>
              <Field
                className={"event-button no-margin"}
                type="submit"
                value={"Kreiraj događaj"}
                id={"createEvent"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const convertValues = (values: FormikValues): EventDTO => {
  return {
    name: values.eventName,
    description: values.eventDescription,
    date: values.eventDate,
    tripID: parseInt(values.tripSelector),
    creatorID: 0, //creator of event
    invitedUsersIDs: values.invitedFriends.map((friend) => friend.id),
  } as EventDTO;
};
