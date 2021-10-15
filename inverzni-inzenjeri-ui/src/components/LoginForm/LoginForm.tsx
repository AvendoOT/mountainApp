import React, { useState } from "react";
import "./LoginForm.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { authenticationActions } from "../../store/authentication.slice";
import { Field, Form, Formik } from "formik";
import {
  LoginFormValues,
  loginFormValuesToCredentials,
} from "./LoginFormValues";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [submitClicked, setSubmitClicked] = useState(false);

  const { isLoggedIn, badCredentials } = useSelector(
    (state: RootState) => state.authentication
  );

  const submit = (values: LoginFormValues) => {
    setSubmitClicked(true);
    const credentials = loginFormValuesToCredentials(values);
    dispatch(authenticationActions.login(credentials));
  };

  if (isLoggedIn) {
    history.push("/");
  }
  return (
    <div className="center">
      <div id={"loginText"}>
        <h2>Prijava korisnika</h2>
      </div>
      <Formik initialValues={{} as LoginFormValues} onSubmit={submit}>
        {() => {
          return (
            <Form>
              <div>
                <div className="elem">
                  <Field
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Korisničko ime"
                    className="txtField"
                  />
                </div>
                <div className="elem">
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Lozinka"
                    className="txtField"
                  />
                </div>
                {submitClicked && (
                  <div className="mr-3">
                    {badCredentials && (
                      <span style={{ color: "red" }}>
                        Neispravni korisnički podaci! Pokušajte ponovno.
                      </span>
                    )}
                  </div>
                )}
                <div className={"elem"}>
                  <Field
                    type={"checkbox"}
                    name={"rememberMe"}
                    className={"checkbox"}
                  />
                  <span className={"greySpan"}>Zapamti me</span>
                </div>
                <div className="elem">
                  <div className="centeredContainer">
                    <Field type="submit" value={"Prijava"} id={"login"} />
                  </div>
                </div>
                <div className={"smallerFont"}>
                  Nemate račun? Registrirajte se{" "}
                  <Link to={"/registration"}>ovdje</Link>.
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
