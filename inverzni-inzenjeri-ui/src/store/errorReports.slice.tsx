import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../actions/errorReports.action";
import { ErrorReportDetailsDTO } from "../models/ErrorReportDetailsDTO";
import { ErrorReportDTO } from "../models/ErrorReportDTO";
import { REPORT_PATHS } from "../actions/paths";

type Status = "idle" | "waiting" | "success" | "error";

const getErrorReports = createAsyncThunk(
  "reports/getReports",
  async (id: number) => api.getAllReports(id)
);

const getErrorReportsByTripId = createAsyncThunk(
  "reports/getReportsByTripId",
  async (tripId: number) => api.getReportsByTripId(tripId)
);

const removeErrorReport = createAsyncThunk(
  "reports/removeReport",
  async (id: number) => api.removeReport(id)
);

const createErrorReport = createAsyncThunk(
  "reports/createReport",
  async (errorReportDTO: ErrorReportDTO, thunkAPI): Promise<Response> => {
    const response = await fetch(REPORT_PATHS.CREATE_ERROR_REPORT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorReportDTO),
    });

    return response;
  }
);

const initialState = {
  response: (undefined as unknown) as Response,
  reports: [] as ErrorReportDetailsDTO[],
  getReportStatus: "idle" as Status,
  removeStatus: "idle" as Status,
  removedReport: {} as ErrorReportDetailsDTO,
  addStatus: "idle" as Status,
  reportsForTrip: [] as ErrorReportDetailsDTO[],
  getReportsForTripStatus: "idle" as Status,
};

const errorReportsSlice = createSlice({
  initialState,
  name: "errorReports",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getErrorReports.pending, (state, action) => {
      state.getReportStatus = "waiting";
    });

    builder.addCase(getErrorReports.rejected, (state, action) => {
      state.getReportStatus = "error";
    });

    builder.addCase(getErrorReports.fulfilled, (state, action) => {
      state.getReportStatus = "success";
      state.reports = action.payload;
    });

    builder.addCase(removeErrorReport.pending, (state, action) => {
      state.removeStatus = "waiting";
    });

    builder.addCase(removeErrorReport.rejected, (state, action) => {
      state.removeStatus = "error";
    });

    builder.addCase(removeErrorReport.fulfilled, (state, action) => {
      state.removeStatus = "success";
      state.removedReport = action.payload;
    });

    builder.addCase(createErrorReport.pending, (state, action) => {
      state.addStatus = "waiting";
    });

    builder.addCase(createErrorReport.rejected, (state, action) => {
      state.addStatus = "error";
    });

    builder.addCase(createErrorReport.fulfilled, (state, action) => {
      state.addStatus = "success";
      state.response = action.payload;
    });

    builder.addCase(getErrorReportsByTripId.pending, (state, action) => {
      state.getReportsForTripStatus = "waiting";
    });

    builder.addCase(getErrorReportsByTripId.rejected, (state, action) => {
      state.getReportsForTripStatus = "error";
    });

    builder.addCase(getErrorReportsByTripId.fulfilled, (state, action) => {
      if (action.payload) {
        state.reportsForTrip = action.payload;
        state.getReportsForTripStatus = "success";
      } else {
        state.reportsForTrip = [] as ErrorReportDetailsDTO[];
        state.getReportsForTripStatus = "error";
      }
    });
  },
});

export const errorReports = errorReportsSlice.reducer;
export const errorReportsActions = {
  getErrorReports,
  removeErrorReport,
  createErrorReport,
  getErrorReportsByTripId,
};
