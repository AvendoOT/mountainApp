import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../actions/trips.action";
import { TripDTO } from "../models/TripDTO";

type Status = "idle" | "waiting" | "success" | "error";

const getTrips = createAsyncThunk("trips/getAllTrips", async () =>
  api.getAllTrips()
);

const getTripById = createAsyncThunk("trips/getTrip", async (tripId: number) =>
  api.getTripById(tripId)
);

const getTripsAvailableForDuty = createAsyncThunk(
  "trips/getTripsAvailableForDuty",
  async () => api.getTripsAvailableForDuty()
);

const getTripsNotPendingConfirmation = createAsyncThunk(
  "trips/getTripsNotPendingConfirmation",
  async () => api.getTripsNotPendingConfirmation()
);

const getCreatedTrips = createAsyncThunk(
  "trips/createdTripsByUser",
  async (userId: number) => api.getCreatedTrips(userId)
);

const initialState = {
  trips: [] as TripDTO[],
  getTripStatus: "idle" as Status,
  trip: {} as TripDTO,
  getTripByIdStatus: "idle" as Status,
  tripsAvailableForDuty: [] as TripDTO[],
  getTripsAvailableForDutyStatus: "idle" as Status,
  tripsNotPendingConfirmation: [] as TripDTO[],
  getTripsNotPendingConfirmationStatus: "idle" as Status,
  tripsCreatedByUser: [] as TripDTO[],
  getTripsCreatedByUserStatus: "idle" as Status,
};

const tripListSlice = createSlice({
  initialState,
  name: "tripList",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTrips.pending, (state, action) => {
      state.getTripStatus = "waiting";
    });

    builder.addCase(getTrips.rejected, (state, action) => {
      state.getTripStatus = "error";
    });

    builder.addCase(getTrips.fulfilled, (state, action) => {
      state.getTripStatus = "success";
      state.trips = action.payload;
    });

    builder.addCase(getTripsAvailableForDuty.pending, (state, action) => {
      state.getTripsAvailableForDutyStatus = "waiting";
    });

    builder.addCase(getTripsAvailableForDuty.rejected, (state, action) => {
      state.getTripsAvailableForDutyStatus = "error";
    });

    builder.addCase(getTripsAvailableForDuty.fulfilled, (state, action) => {
      state.getTripsAvailableForDutyStatus = "success";
      state.tripsAvailableForDuty = action.payload;
    });

    builder.addCase(getTripsNotPendingConfirmation.pending, (state, action) => {
      state.getTripsNotPendingConfirmationStatus = "waiting";
    });

    builder.addCase(
      getTripsNotPendingConfirmation.rejected,
      (state, action) => {
        state.getTripsNotPendingConfirmationStatus = "error";
      }
    );

    builder.addCase(
      getTripsNotPendingConfirmation.fulfilled,
      (state, action) => {
        state.getTripsNotPendingConfirmationStatus = "success";
        state.tripsNotPendingConfirmation = action.payload;
      }
    );

    builder.addCase(getTripById.pending, (state, action) => {
      state.getTripByIdStatus = "waiting";
    });

    builder.addCase(getTripById.rejected, (state, action) => {
      state.getTripByIdStatus = "error";
    });

    builder.addCase(getTripById.fulfilled, (state, action) => {
      if (action.payload) {
        state.getTripByIdStatus = "success";
        state.trip = action.payload;
      } else {
        state.getTripByIdStatus = "error";
        state.trip = {} as TripDTO;
      }
    });

    builder.addCase(getCreatedTrips.pending, (state, action) => {
      state.getTripsCreatedByUserStatus = "waiting";
    });

    builder.addCase(getCreatedTrips.rejected, (state, action) => {
      state.getTripsCreatedByUserStatus = "error";
    });

    builder.addCase(getCreatedTrips.fulfilled, (state, action) => {
      if (action.payload) {
        state.getTripsCreatedByUserStatus = "success";
        state.tripsCreatedByUser = action.payload;
      } else {
        state.getTripsCreatedByUserStatus = "error";
        state.tripsCreatedByUser = {} as TripDTO[];
      }
    });
  },
});

export const tripList = tripListSlice.reducer;
export const tripsActions = {
  getTrips,
  getTripById,
  getTripsAvailableForDuty,
  getCreatedTrips,
  getTripsNotPendingConfirmation,
};
