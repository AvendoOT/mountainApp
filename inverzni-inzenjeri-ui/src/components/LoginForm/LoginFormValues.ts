import { Credentials } from "../../models/Credentials";

export interface LoginFormValues {
  username: string;
  password: string;
}

export const loginFormValuesToCredentials = (
  loginFormValues: LoginFormValues
): Credentials => {
  return {
    username: loginFormValues.username,
    password: loginFormValues.password,
  };
};
