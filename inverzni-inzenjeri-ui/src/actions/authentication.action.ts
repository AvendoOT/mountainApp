import { AUTHENTICATION_PATHS } from "./paths";
import { HTTP_STATUS } from "../util/commonConstants";

export async function logout(): Promise<boolean> {
  const response = await fetch(AUTHENTICATION_PATHS.LOGOUT_USER, {method: "POST"});
  return response.status === HTTP_STATUS.OK;
}
