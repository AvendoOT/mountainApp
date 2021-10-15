import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TripFilterValues } from "../../../models/TripFilterValues";
import { useDispatch } from "react-redux";
import "./TripFilter.css";
import Collapsible from "react-collapsible";
import * as Yup from "yup";
import {searchActions} from "../../../store/search.slice";
import {useHistory} from "react-router";

function addError(id: string) {
    let element = document.getElementById(id);
    if (element !== null) {
        element.classList.add("error-border");
    }
}

function removeError(id: string) {
    let element = document.getElementById(id);
    if (element !== null) {
        element.classList.remove("error-border");
    }
}

export default function TripFilter() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [submitClicked, setSubmitClicked] = useState(false);

    const initialValues = {
        minimalDuration: "",
        minimalDifficulty: "",
        minimalGrade: "",
        maximalDuration: "",
        maximalDifficulty: "",
        maximalGrade: "",
    } as TripFilterValues;

    const submit = (values) => {
        let flag: boolean[] = [false, false, false];
        checkValues(values, flag);
        dispatch(searchActions.postFilter(values));
        if (flag) {
            returnToInitialValues(flag, values);
        }
        history.push("/trips/search");
    };

    const checkValues = (values: TripFilterValues, flag: boolean[]) => {
        if (Number(values.maximalDifficulty) === 0) {
            values.maximalDifficulty = '5';
            flag[0] = true;
        }
        if (Number(values.maximalDuration) === 0) {
            values.maximalDuration = '10000';
            flag[1] = true;
        }
        if (Number(values.maximalGrade) === 0) {
            values.maximalGrade = '10';
            flag[2] = true;
        }
    }

    const returnToInitialValues = (flags: boolean[], values: TripFilterValues) => {
        if (flags[0]) {
            values.maximalDifficulty = "";
        }
        if (flags[1]) {
            values.maximalDuration = "";
        }
        if (flags[2]) {
            values.maximalGrade = "";
        }
    }

    const validationSchema = Yup.object().shape({
        keyWords: Yup.string(),
        minimalDifficulty: Yup.number()
            .integer()
            .min(1, "Težina se ocjenjuje od 1 do 5")
            .max(5, "Težina se ocjenjuje od 1 do 5"),
        maximalDifficulty: Yup.number()
            .integer()
            .min(1, "Težina se ocjenjuje od 1 do 5")
            .max(5, "Težina se ocjenjuje od 1 do 5"),
        minimalGrade: Yup.number()
            .integer()
            .min(0, "Ocjena može biti od 0 do 10")
            .max(10, "Ocjena može biti od 0 do 10"),
        maximalGrade: Yup.number()
            .integer()
            .min(0, "Ocjena može biti od 0 do 10")
            .max(10, "Ocjena može biti od 0 do 10"),
    });

  return (
    <Collapsible trigger={"Filter"}>
      <div className={""}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          {({ errors, touched, handleChange }) => {
            return (
              <Form>
                <div>
                  <Field
                    id="keyWords"
                    type="text"
                    name="keyWords"
                    placeholder="Tražilica"
                    className="textField"
                  />
                  <Field
                    id="minimalDuration"
                    type="number"
                    name="minimalDuration"
                    placeholder="Trajanje od"
                    className="numberBar from"
                    min="1"
                  />
                  <Field
                    id="maximalDuration"
                    type={"number"}
                    name="maximalDuration"
                    placeholder="Trajanje do"
                    className={"numberBar"}
                    min="1"
                  />
                  <Field
                    id="minimalDifficulty"
                    type="number"
                    name="minimalDifficulty"
                    placeholder="Težina od"
                    className="numberBar from"
                    min="1"
                    max="5"
                  />
                  <Field
                    id="maximalDifficulty"
                    type="number"
                    name="maximalDifficulty"
                    placeholder="Težina do"
                    className={"numberBar"}
                    min="1"
                    max="5"
                  />
                  <Field
                    id="minimalGrade"
                    type="number"
                    name="minimalGrade"
                    placeholder="Ocjena od"
                    className="numberBar from"
                    min="0"
                    max="10"
                  />
                  <Field
                    id="maximalGrade"
                    type="number"
                    name="maximalGrade"
                    placeholder="Ocjena do"
                    className={"numberBar"}
                    min="0"
                    max="10"
                  />
                  <Field type="submit" value={"Primijeni"} id={"submit"} />
                  {errors.minimalDifficulty && touched.minimalDifficulty ? (
                    <div className="error">{errors.minimalDifficulty}</div>
                  ) : null}
                  {errors.maximalDifficulty && touched.maximalDifficulty ? (
                    <div className="error">{errors.maximalDifficulty}</div>
                  ) : null}
                  {errors.minimalGrade && touched.minimalGrade ? (
                    <div className="error">{errors.minimalGrade}</div>
                  ) : null}
                  {errors.maximalGrade && touched.maximalGrade ? (
                    <div className="error">{errors.maximalGrade}</div>
                  ) : null}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Collapsible>
  );
}
