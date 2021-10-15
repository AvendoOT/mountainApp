import { GRADE_PATHS } from "./paths";
import { GradeDetailsDTO } from "../models/GradeDetailsDTO";

export async function getAllGrades(id: number): Promise<GradeDetailsDTO[]> {
  const params = new URLSearchParams();
  appendParams(params, { id });

  const response = await fetch(
    `${GRADE_PATHS.GET_GRADES}?${params.toString()}`
  );
  return response.json();
}

export async function getAllReviewers(id: number): Promise<number[]> {
  const params = new URLSearchParams();
  appendParams(params, { id });

  const response = await fetch(
    `${GRADE_PATHS.GET_REVIEWERS}?${params.toString()}`
  );
  return response.json();
}

const appendParams = (params: URLSearchParams, obj: Record<string, any>) => {
  Object.keys(obj).forEach((key) => params.append(key, obj[key]));
};
