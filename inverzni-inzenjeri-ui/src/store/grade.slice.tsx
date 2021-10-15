import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../actions/grade.adction";
import { GRADE_PATHS } from "../actions/paths";
import { GradeDTO } from "../models/GradeDTO";
import { GradeDetailsDTO } from "../models/GradeDetailsDTO";

type Status = "idle" | "waiting" | "success" | "error";

const getGrades = createAsyncThunk("grades/getGrades", async (id: number) =>
  api.getAllGrades(id)
);

const getReviewers = createAsyncThunk(
  "grades/getReviewers",
  async (id: number) => api.getAllReviewers(id)
);

const addGrade = createAsyncThunk(
  "grades/addGrade",
  async (gradeDto: GradeDTO, thunkAPI): Promise<Response> => {
    const response = await fetch(GRADE_PATHS.ADD_GRADE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gradeDto),
    });

    return response;
  }
);

const initialState = {
  response: (undefined as unknown) as Response,
  grades: [] as GradeDetailsDTO[],
  getGradeStatus: "idle" as Status,
  addStatus: "idle" as Status,
  getGradesStatus: "idle" as Status,
  reviewerIds: [] as number[],
};

const gradesSlice = createSlice({
  initialState,
  name: "errorReports",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGrades.pending, (state, action) => {
      state.getGradeStatus = "waiting";
    });

    builder.addCase(getGrades.rejected, (state, action) => {
      state.getGradeStatus = "error";
    });

    builder.addCase(getGrades.fulfilled, (state, action) => {
      state.getGradeStatus = "success";
      state.grades = action.payload;
    });

    builder.addCase(addGrade.pending, (state, action) => {
      state.addStatus = "waiting";
    });

    builder.addCase(addGrade.rejected, (state, action) => {
      state.addStatus = "error";
    });

    builder.addCase(addGrade.fulfilled, (state, action) => {
      state.addStatus = "success";
      state.response = action.payload;
    });

    builder.addCase(getReviewers.pending, (state, action) => {
      state.getGradeStatus = "waiting";
    });

    builder.addCase(getReviewers.rejected, (state, action) => {
      state.getGradeStatus = "error";
    });

    builder.addCase(getReviewers.fulfilled, (state, action) => {
      state.getGradeStatus = "success";
      state.reviewerIds = action.payload;
    });
  },
});

export const grades = gradesSlice.reducer;
export const gradesActions = {
  getGrades,
  addGrade,
  getReviewers,
};
