import React, { useEffect, useState } from "react";
import "./CreateTripForm.css";
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
});

const initialValues = {
  peak: "",
  area: "",
  length: "",
  duration: "",
  difficulty: "",
  description: "",
  local: false,
  cabins: [
    {
      name: "",
      water: false,
      food: false,
      power: false,
      sleep: false,
    },
  ] as Cabin[],
  creatorId: "",
};

const convertValues = (values: FormikValues): TripDTO => {
  return {
    duration: values.duration,
    difficulty: values.difficulty,
    description: values.description,
    peak: values.peak,
    area: values.area,
    length: values.length,
    rate: 0,
    cabins: values.cabins,
    creatorId: 0,
    local: values.local,
  } as TripDTO;
};

export const CreateTripForm = () => {
  const dispatch = useDispatch();

  const { userDetails } = useSelector(
    (state: RootState) => state.authentication
  );

  const [submitClicked, setSubmitClicked] = useState(false);
  const { response, addStatus } = useSelector(
    (state: RootState) => state.createTrip
  );

  const onSubmit = (values: FormikValues) => {
    const time = values.duration.split(":");
    const durationInMins = Number(time[0]) * 60 + Number(time[1]);

    const tripDTO = convertValues(values) as TripDTO;
    tripDTO.duration = durationInMins;
    tripDTO.creatorId = userDetails.id;

    dispatch(actions.createTripAction(tripDTO));
    setSubmitClicked(true);
  };

  if (submitClicked && addStatus === "success") {
    if (response.ok) {
      return <Redirect to="/trips/" />;
    }
  }

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
                <h2>Kreiraj novi izlet</h2>
              </div>

              <Form className="createTripForm-addTripForm" autoComplete={"off"}>
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
};
