import React, {useEffect} from "react";
import "./RedirectPage.css";
import {useHistory} from "react-router";

export const RedirectPage = () => {
    const history = useHistory();

    const redirectTo = () => {
        setTimeout(() => {
            history.push("/")
        }, 2500)
    }

    useEffect(() => {
        redirectTo();
    });

    return (
        <div className="centered">
            <h2>
                Uspješno ste registrirani na
                stranicu!
            </h2>
            <div className="lds-dual-ring"/>
            <h3>Preusmjeravamo vas na glavnu stranicu...</h3>
        </div>
    );
}
