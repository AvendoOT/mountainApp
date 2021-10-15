import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import "./LoginLogoutButton.css";

export const LoginLogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.authentication
  );
  const logout = () => {
    history.push("/logout");
  };
  var button;
  if (isLoggedIn) {
    button = (
      <Button onClick={logout} color="primary">
        Odjava
      </Button>
    );
  } else {
    button = (
      <Button href="/login" color="primary">
        Prijava
      </Button>
    );
  }

  return button;
};
