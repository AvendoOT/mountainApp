import React, { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage, FormikValues } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { GradeDTO } from "../../models/GradeDTO";
import { gradesActions } from "../../store/grade.slice";
import { authenticationActions } from "../../store/authentication.slice";
import { Collapse, Box } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import "./CreateGradeForm.css";

const validationSchema = Yup.object({
  comment: Yup.string().max(255, "Može imati maksimalno 255 zakova"),
});

const initialValues = {
  grade: "",
  comment: "",
  creatorId: "",
  tripId: "",
};

export const CreateGradeForm = (tripId: any) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState<number | null>(0.5);
  const [hover, setHover] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { userDetails } = useSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    dispatch(authenticationActions.getLoggedInUserDetails());
  }, [dispatch]);

  const convertValues = (values: FormikValues): GradeDTO => {
    return {
      grade: Number(rating) * 2,
      comment: values.comment,
      creatorId: userDetails.id,
      tripId: tripId.tripId,
    } as GradeDTO;
  };

  const [submitClicked, setSubmitClicked] = useState(false);

  const { response, addStatus } = useSelector(
    (state: RootState) => state.grades
  );

  const onSubmit = (values: FormikValues) => {
    const gradeDTO = convertValues(values);
    dispatch(gradesActions.addGrade(gradeDTO));
    setSubmitClicked(true);
    console.log(rating);
  };

  if (submitClicked && addStatus === "success") {
    if (response.ok) {
      window.location.reload(false);
    }
  }

  const labels = {
    0.5: "1",
    1: "2",
    1.5: "3",
    2: "4",
    2.5: "5",
    3: "6",
    3.5: "7",
    4: "8",
    4.5: "9",
    5: "10",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <button className={"CreateGradeForm-toggleButton"} onClick={toggle}>
        Ocijeni izlet
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
                <div className={"CreateGradeForm-mainContainer"}>
                  <div className={"CreateGradeForm-gradeInput"}>
                    <Rating
                      name="hover-feedback"
                      value={rating}
                      precision={0.5}
                      size={"large"}
                      defaultValue={0.5}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                    />
                    {rating !== null && (
                      <Box style={{ color: "black" }} ml={2}>
                        {labels[hover !== -1 ? hover : rating]}
                      </Box>
                    )}
                  </div>

                  <div className={"CreateGradeForm-textArea"}>
                    <Field
                      as="textarea"
                      name="comment"
                      placeholder="Komentar..."
                      rows={5}
                      style={{ margin: 5 }}
                    />
                    <ErrorMessage name={"comment"} />
                  </div>
                </div>
                <button
                  className={"CreateGradeForm-submitButton"}
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Ocijeni
                </button>
              </Form>
            );
          }}
        </Formik>
      </Collapse>
    </div>
  );
};
