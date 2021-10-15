import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./PeopleFilter.css";
import { useHistory } from "react-router";
import { Field, Form, Formik } from "formik";
import { PeopleFilterValues } from "../../../models/PeopleFilterValues";
import { searchActions } from "../../../store/PeopleSearch.slice";
import * as Yup from "yup";
import { Icon } from "semantic-ui-react";

export default function PeopleFilter() {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    keyWords: "",
  } as PeopleFilterValues;

  const submit = (values) => {
    dispatch(searchActions.peopleFilter(values));
    history.push("/users/search");
  };

  const validationSchema = Yup.object().shape({
    keyWords: Yup.string(),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        <Form>
          <div className={"peopleFilter-wrapper"}>
            <Field
              id={"peopleFilter-keyWords"}
              type={"text"}
              name={"keyWords"}
              placeholder={"Pretražite planinare po imenu i prezimenu"}
              className={"peopleFilter"}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
