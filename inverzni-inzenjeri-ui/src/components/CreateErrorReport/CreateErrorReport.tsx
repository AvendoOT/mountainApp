import React, { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage, FormikValues } from "formik";
import { ErrorReportDTO } from "../../models/ErrorReportDTO";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { Collapse } from "@material-ui/core";
import { errorReportsActions } from "../../store/errorReports.slice";
import "./CreateErrorReport.css";

const validationSchema = Yup.object({
  explanation: Yup.string()
    .max(255, "Može imati maksimalno 255 zakova")
    .min(10, "Mora imati minimalno 10 znakova")
    .required("Obavezno"),
});

const initialValues = {
  tripId: "",
  reporterId: "",
  explanation: "",
};

export const CreateErrorReport = (tripId: any) => {
  const dispatch = useDispatch();

  const { userDetails } = useSelector(
    (state: RootState) => state.authentication
  );

  const convertValues = (values: FormikValues): ErrorReportDTO => {
    return {
      tripId: tripId.tripId,
      reporterId: userDetails.id,
      explanation: values.explanation,
    } as ErrorReportDTO;
  };

  const [submitClicked, setSubmitClicked] = useState(false);
  const { response, addStatus } = useSelector(
    (state: RootState) => state.errorReports
  );

  const onSubmit = (values: FormikValues) => {
    const errorReportDTO = convertValues(values);
    dispatch(errorReportsActions.createErrorReport(errorReportDTO));
    setSubmitClicked(true);
  };

  if (submitClicked && addStatus === "success") {
    if (response.ok) {
      window.location.reload(false);
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <button className={"CreateErrorReport-toggleButton"} onClick={toggle}>
        Prijavi grešku
      </button>

      <Collapse in={isOpen}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => {
            return (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: "red",
                }}
              >
                <div className={"CreateErrorReport-mainContainer"}>
                  <div className={"CreateErrorReport-textArea"}>
                    <Field
                      as="textarea"
                      name="explanation"
                      placeholder="Obrazloženje..."
                      rows={5}
                    />
                    <ErrorMessage name={"explanation"} />
                  </div>
                </div>
                <button
                  className={"CreateErrorReport-submitButton"}
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Prijavi
                </button>
              </Form>
            );
          }}
        </Formik>
      </Collapse>
    </div>
  );
};
