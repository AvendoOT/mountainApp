import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../actions/trips.action";
import { TripDTO } from "../models/TripDTO";

const getArchivedTrips = createAsyncThunk("user/getArchived", async () =>
  api.getArchivedTrips()
);

const addToArchived = createAsyncThunk(
  "user/addToArchived",
  async (tripId: number) => api.addToArchived(tripId)
);

const removeFromArchived = createAsyncThunk(
  "user/removeFromArchived",
  async (tripId: number) => api.removeFromArchived(tripId)
);

type Status = "idle" | "waiting" | "success" | "error";

const initialState = {
  archivedTrips: [] as TripDTO[],
  getArchivedTripsStatus: "idle" as Status,
  addToArchivedStatus: "idle" as Status,
  removeFromArchivedStatus: "idle" as Status,
};

const getArchivedTripsSlice = createSlice({
  initialState,
  name: "getArchivedTrips",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArchivedTrips.pending, (state, action) => {
      state.getArchivedTripsStatus = "waiting";
    });
    builder.addCase(getArchivedTrips.rejected, (state, action) => {
      state.getArchivedTripsStatus = "error";
    });
    builder.addCase(getArchivedTrips.fulfilled, (state, action) => {
      if (action.payload) {
        state.getArchivedTripsStatus = "success";
        state.archivedTrips = action.payload;
      } else {
        state.getArchivedTripsStatus = "error";
        state.archivedTrips = [] as TripDTO[];
      }
    });

    builder.addCase(removeFromArchived.pending, (state, action) => {
      state.removeFromArchivedStatus = "waiting";
    });
    builder.addCase(removeFromArchived.rejected, (state, action) => {
      state.removeFromArchivedStatus = "error";
    });
    builder.addCase(removeFromArchived.fulfilled, (state, action) => {
      if (action.payload) {
        state.removeFromArchivedStatus = "success";
        state.archivedTrips = action.payload;
      } else {
        state.removeFromArchivedStatus = "error";
        state.archivedTrips = [] as TripDTO[];
      }
    });

    builder.addCase(addToArchived.pending, (state, action) => {
      state.addToArchivedStatus = "waiting";
    });
    builder.addCase(addToArchived.rejected, (state, action) => {
      state.addToArchivedStatus = "error";
    });
    builder.addCase(addToArchived.fulfilled, (state, action) => {
      if (action.payload) {
        state.addToArchivedStatus = "success";
        state.archivedTrips = action.payload;
      } else {
        state.addToArchivedStatus = "error";
        state.archivedTrips = [] as TripDTO[];
      }
    });
  },
});

export const getArchiveTrips = getArchivedTripsSlice.reducer;
export const getArchivedTripsActions = {
  getArchivedTrips,
  addToArchived,
  removeFromArchived,
};
