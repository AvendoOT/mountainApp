import { ErrorReportDetailsDTO } from "../models/ErrorReportDetailsDTO";
import { REPORT_PATHS, USER_PATHS, TRIP_PATHS } from "./paths";

export async function getAllReports(
  id: number
): Promise<ErrorReportDetailsDTO[]> {
  const params = new URLSearchParams();
  appendParams(params, { id });

  const response = await fetch(
    `${USER_PATHS.GET_USER_REPORTS}?${params.toString()}`
  );
  return response.json();
}

export async function getReportsByTripId(
  tripId: number
): Promise<ErrorReportDetailsDTO[]> {
  const params = new URLSearchParams();
  appendParams(params, { tripId });

  const response = await fetch(
    `${TRIP_PATHS.GET_ERROR_REPORTS_BY_TRIP_ID}?${params.toString()}`
  );
  return response.json();
}

export async function removeReport(id: number): Promise<ErrorReportDetailsDTO> {
  const params = new URLSearchParams();
  appendParams(params, { id });

  const response = await fetch(
    `${REPORT_PATHS.REMOVE_ERROR_REPORT}?${params.toString()}`,
    { method: "DELETE" }
  );
  return response.json();
}

const appendParams = (params: URLSearchParams, obj: Record<string, any>) => {
  Object.keys(obj).forEach((key) => params.append(key, obj[key]));
};
