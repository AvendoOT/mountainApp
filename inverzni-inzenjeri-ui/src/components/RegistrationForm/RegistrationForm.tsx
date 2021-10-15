import React, {useState} from "react";
import "./RegistrationForm.css";
import {Link} from "react-router-dom";
import {Field, Form, Formik, FormikValues} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducer";
import {UserRegistration} from "../../models/UserRegistration";
import {actions} from "../../store/registerUser.slice";
import * as Yup from "yup";
import {RedirectPage} from "../RedirectPage/RedirectPage";

const passwordRegexText =
    "Lozinka se sastoji od 8 do 30 znakova. Lozinka mora sadržavati barem jedan znak i barem jedno slovo.";

const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
};

let firstName = "";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Obavezno polje"),
    lastName: Yup.string().required("Obavezno polje"),
    username: Yup.string()
        .required("Obavezno polje")
        .min(5, "Korisničko ime treba imati barem 5 znakova"),
    email: Yup.string().email("Neispravan email").required("Obavezno polje"),
    password: Yup.string()
        .matches(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}/, passwordRegexText)
        .required("Obavezno polje"),
    repeatedPassword: Yup.string()
        .test("Ispravno", "Mora biti jednako polju lozinka", function (value) {
            return this.parent.password === value;
        })
        .required("Obavezno polje"),
});

export const RegistrationForm = () => {
    const dispatch = useDispatch();
    const [submitClicked, setSubmitClicked] = useState(false);
    const {response, addStatus} = useSelector(
        (state: RootState) => state.registerUser
    );

    const mainSubmit = (values: FormikValues) => {
        const registrationDTO = convertValues(values) as UserRegistration;
        firstName = registrationDTO.firstName.toString();
        dispatch(actions.createUser(registrationDTO));
        setSubmitClicked(true);
    };

    if (submitClicked && addStatus === "success") {
        if (response.ok) {
            return <RedirectPage/>;
        }
    }

    return (
        <div className={"center"}>
            {addStatus === "success" &&
            response.status >= 500 &&
            response.status <= 599 &&
            alert("Serverska greška")}
            <div id={"loginText"}>
                <h2>Registracija korisnika</h2>
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={mainSubmit}
                validationSchema={validationSchema}
            >
                {({errors, touched}) => (
                    <Form autoComplete={"off"}>
                        <div className={"heightElem elem"}>
                            <div className={"shortLeft"}>
                                <Field
                                    id={"firstName"}
                                    type={"text"}
                                    name={"firstName"}
                                    placeholder={"Ime"}
                                    className={"shortTextField"}
                                />
                                {errors.firstName && touched.firstName ? (
                                    <div className="error">{errors.firstName}</div>
                                ) : null}
                            </div>
                            <div className={"shortRight"}>
                                <Field
                                    id={"lastName"}
                                    type={"text"}
                                    name={"lastName"}
                                    placeholder={"Prezime"}
                                    className={"shortTextField"}
                                />
                                {errors.lastName && touched.lastName ? (
                                    <div className="error">{errors.lastName}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="elem">
                            <Field
                                type={"text"}
                                className={"txtField"}
                                name={"username"}
                                placeholder={"Korisničko ime"}
                            />
                            {addStatus === "success" && response.status === 400 ? (
                                <div className={"RegistrationForm-error"}>
                                    To korisničko ime se već koristi.
                                </div>
                            ) : null}
                            {errors.username && touched.username ? (
                                <div className="RegistrationForm-error">{errors.username}</div>
                            ) : null}
                        </div>
                        <div className="elem">
                            <Field
                                type={"mail"}
                                className={"txtField"}
                                name={"email"}
                                placeholder={"E-mail"}
                            />
                            {errors.email && touched.email ? (
                                <div className="error">{errors.email}</div>
                            ) : null}
                        </div>
                        <div className="elem">
                            <Field
                                type={"password"}
                                className={"txtField"}
                                name={"password"}
                                placeholder={"Lozinka"}
                            />
                            {errors.password && touched.password ? (
                                <div className="error">{errors.password}</div>
                            ) : null}
                        </div>
                        <div className="elem">
                            <Field
                                type={"password"}
                                className={"txtField"}
                                name={"repeatedPassword"}
                                placeholder={"Ponovljena lozinka"}
                            />
                            {errors.repeatedPassword && touched.repeatedPassword ? (
                                <div className="error">{errors.repeatedPassword}</div>
                            ) : null}
                        </div>

                        <div className="elem">
                            <div className="centeredContainer">
                                <Field type={"submit"} value={"Registracija"} id={"login"}/>
                            </div>
                        </div>
                        <div className={"smallerFont"}>
                            Imate račun? Prijavite se <Link to={"/login"}>ovdje</Link>.
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const convertValues = (values: FormikValues): UserRegistration => {
    return {
        ...values,
    } as UserRegistration;
};
