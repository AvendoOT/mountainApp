import { Dispatch } from "react";
import { UserRegistration } from "../models/UserRegistration";

const REGISTER_USER = "/api/register";

export async function registerNewUser(
  registrationDTO: UserRegistration,
  dispatch: Dispatch<any>
): Promise<Response> {
  const formData = new FormData();

  for (const [key, value] of Object.entries(registrationDTO)) {
    if (!!value) {
      formData.append(key, value);
    }
  }

  const response = await fetch(REGISTER_USER, {
    method: "POST",
    body: formData,
  });

  /*const credentials = {username: registrationDTO.email, password: registrationDTO.password} as Credentials

      if (response.status === HTTP_STATUS.OK) {
          dispatch(authenticationActions.login(credentials));
      }*/

  return response;
}
