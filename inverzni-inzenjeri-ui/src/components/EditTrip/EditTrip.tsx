import React, { useEffect, useState } from "react";
import { actions } from "../../store/createTrip.slice";
import { TripDTO } from "../../models/TripDTO";
import { RootState } from "../../store/reducer";
import { Redirect } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import {
  Field,
  Form,
  Formik,
  FieldArray,
  ErrorMessage,
  FormikValues,
} from "formik";
import * as Yup from "yup";
import { Cabin } from "../../models/Cabin";
import { authenticationActions } from "../../store/authentication.slice";
import { TripCard } from "../TripCard/TripCard";
import getTimeInHHMM from "./getTimeInHHMM";
import { tripsActions } from "../../store/trips.slice";
import { LoadingIcon } from "../../util/LoadingIcon";

const validationSchema = Yup.object({
  peak: Yup.string()
    .required("Obavezno")
    .max(255, "Može imati maksimalno 255 zakova")
    .matches(/[^\s-]/, "Mora sadržavati slova, brojeve,..."),
  area: Yup.string()
    .required("Obavezno")
    .max(255, "Može imati maksimalno 255 zakova")
    .matches(/[^\s-]/, "Mora sadržavati slova, brojeve,..."),
  length: Yup.number().required("Obavezno").min(1, "Minimalna vrijednost je 1"),
  difficulty: Yup.number()
    .required("Obavezno")
    .min(1, "Najmanja težina je 1")
    .max(5, "Najveća težina je 5"),
  duration: Yup.string()
    .required("Obavezno")
    .matches(
      /^([0-9]|[0-9][0-9]):([0-9]|[0-5][0-9])$/,
      "Oblik mora biti HH:MM"
    ),
  name: Yup.string().matches(/[^\s-]/, "Mora sadržavati slova, brojeve,..."),
});

const convertValues = (values: FormikValues): TripDTO => {
  return {
    id: values.id,
    duration: values.duration,
    difficulty: values.difficulty,
    description: values.description,
    peak: values.peak,
    area: values.area,
    length: values.length,
    cabins: values.cabins,
    creatorId: 0,
    local: values.local,
  } as TripDTO;
};

export const EditTrip = (props) => {
  const id: number = props.match.params.id;

  const dispatch = useDispatch();
  const { trip, getTripByIdStatus } = useSelector(
    (state: RootState) => state.tripList
  );

  useEffect(() => {
    dispatch(tripsActions.getTripById(id));
  }, [dispatch, id]);

  const cabinArr: Cabin[] = [];
  let initialValues;
  if (getTripByIdStatus == "success") {
    if (trip.cabins.length == 0) {
      cabinArr.push({
        name: "",
        water: false,
        food: false,
        power: false,
        sleep: false,
      } as Cabin);
    }

    for (let i = 0; i < trip.cabins.length; i++) {
      cabinArr.push(trip.cabins[i]);
    }

    initialValues = {
      id: trip.id,
      peak: trip.peak,
      area: trip.area,
      length: trip.length,
      difficulty: trip.difficulty,
      description: trip.description,
      local: trip.local,
      cabins: cabinArr,
      creatorId: trip.creatorId,
      duration: getTimeInHHMM(trip.duration),
    };
  }

  const { userDetails } = useSelector(
    (state: RootState) => state.authentication
  );

  const [submitClicked, setSubmitClicked] = useState(false);
  const { response, editStatus } = useSelector(
    (state: RootState) => state.createTrip
  );

  const onSubmit = (values: FormikValues) => {
    const time = values.duration.split(":");
    const durationInMins = Number(time[0]) * 60 + Number(time[1]);

    const tripDTO = convertValues(values) as TripDTO;
    tripDTO.duration = durationInMins;
    tripDTO.creatorId = userDetails.id;

    dispatch(actions.editTripAction(tripDTO));
    setSubmitClicked(true);
  };

  if (submitClicked && editStatus === "success") {
    if (response.ok) {
      return <Redirect to="/trips" />;
    }
  }
  if (getTripByIdStatus == "success") {
    return (
      <div className="createTripForm-newTripBody">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => {
            return (
              <div className="createTripForm-container">
                <div className="createTripForm-title">
                  <h2>Uredi izlet</h2>
                </div>

                <Form
                  className="createTripForm-addTripForm"
                  autoComplete={"off"}
                >
                  <div className={"createTripForm-formControl"}>
                    <Field
                      type="text"
                      name="peak"
                      placeholder="Vrh"
                      className={"createTripForm-textInput"}
                    />
                    <ErrorMessage name={"peak"} />
                    <Field
                      type="text"
                      name="area"
                      placeholder="Područje"
                      className={"createTripForm-textInput"}
                    />
                    <ErrorMessage name={"area"} />

                    <div className="createTripForm-subContainer">
                      <div className={"createTripForm-numericErrorWrapper"}>
                        <Field
                          type="number"
                          name="length"
                          placeholder="Duljina (km)"
                          className={"createTripForm-numberInput"}
                        />
                        <ErrorMessage name={"length"} />
                      </div>

                      <div className={"createTripForm-numericErrorWrapper"}>
                        <Field
                          type="text"
                          name="duration"
                          placeholder="Trajanje (HH:MM)"
                          className={"createTripForm-textInput"}
                        />
                        <ErrorMessage name={"duration"} />
                      </div>

                      <div className={"createTripForm-numericErrorWrapper"}>
                        <Field
                          type="number"
                          name="difficulty"
                          placeholder="Težina (1-5)"
                          className={"createTripForm-numberInput"}
                        />
                        <ErrorMessage name={"difficulty"} />
                      </div>
                    </div>
                  </div>
                  <div className="createTripForm-cabinFormsContainer">
                    <FieldArray name={"cabins"}>
                      {(fieldArrayProps) => {
                        const { insert, remove, form } = fieldArrayProps;
                        const { values } = form;
                        const { cabins } = values;

                        return (
                          <div>
                            {cabins.map((cabin, index) => (
                              <div key={index}>
                                <div className="createTripForm-cabinForm">
                                  <div className="createTripForm-cabinName">
                                    <Field
                                      type="text"
                                      name={`cabins[${index}].name`}
                                      placeholder="Ime doma"
                                      className="createTripForm-textInput"
                                    />
                                  </div>

                                  <div className="createTripForm-cabinInfo">
                                    <div className="createTripForm-propertyTab">
                                      <span>Voda:</span>
                                      <Field
                                        type="checkbox"
                                        name={`cabins[${index}].water`}
                                        disabled={cabin.name.length === 0}
                                      />
                                    </div>
                                    <div className="createTripForm-propertyTab">
                                      <span>Hrana:</span>
                                      <Field
                                        type="checkbox"
                                        name={`cabins[${index}].food`}
                                        disabled={cabin.name.length === 0}
                                      />
                                    </div>

                                    <div className="createTripForm-propertyTab">
                                      <span>Struja:</span>
                                      <Field
                                        type="checkbox"
                                        name={`cabins[${index}].power`}
                                        disabled={cabin.name.length === 0}
                                      />
                                    </div>
                                    <div className="createTripForm-propertyTab">
                                      <span>Noćenje:</span>
                                      <Field
                                        type="checkbox"
                                        name={`cabins[${index}].sleep`}
                                        disabled={cabin.name.length === 0}
                                      />
                                    </div>
                                  </div>

                                  <div className="createTripForm-buttonContainer">
                                    <button
                                      className="createTripForm-removeCabin"
                                      type="button"
                                      onClick={() => remove(index)}
                                      disabled={!(cabins.length > 1)}
                                    >
                                      -
                                    </button>
                                    <button
                                      className="createTripForm-addCabin"
                                      type="button"
                                      onClick={() =>
                                        insert(index + 1, {
                                          name: "",
                                          water: false,
                                          food: false,
                                          power: false,
                                          sleep: false,
                                        })
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>
                  <div className={"createTripForm-commentControl"}>
                    <Field
                      as="textarea"
                      className="createTripForm-comment"
                      name="description"
                      placeholder="Opis..."
                      rows={10}
                    />
                    <ErrorMessage name={"description"} />
                  </div>

                  <div className="createTripForm-confirmTab">
                    <div className="createTripForm-privateTab">
                      <span>Privatni:</span>
                      <Field type="checkbox" name="local" />
                    </div>
                    <button
                      className="createTripForm-submitButton"
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      Spremi
                    </button>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    );
  } else return <LoadingIcon />;
};
