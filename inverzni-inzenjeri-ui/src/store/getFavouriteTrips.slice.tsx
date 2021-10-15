import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../actions/trips.action";
import { TripDTO } from "../models/TripDTO";

const getFavouriteTrips = createAsyncThunk("user/getFavourites", async () =>
  api.getFavouriteTrips()
);

const addToFavourites = createAsyncThunk(
  "user/addToFavourites",
  async (tripId: number) => api.addToFavourites(tripId)
);

const removeFromFavourites = createAsyncThunk(
  "user/removeFromFavourites",
  async (tripId: number) => api.removeFromFavourites(tripId)
);

const getFavouriteTripsDetails = createAsyncThunk(
  "user/getFavouritesDetailed",
  async () => api.getFavouriteTripsDetailed()
);

type Status = "idle" | "waiting" | "success" | "error";

const initialState = {
  favouriteTrips: [] as number[],
  getFavouriteTripsStatus: "idle" as Status,
  addToFavouritesStatus: "idle" as Status,
  removeFromFavouritesStatus: "idle" as Status,
  favouriteTripsDetailed: [] as TripDTO[],
  getFavouriteTripsDetailedStatus: "idle" as Status,
};

const getFavouriteTripsSlice = createSlice({
  initialState,
  name: "getFavouriteTrips",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavouriteTrips.pending, (state, action) => {
      state.getFavouriteTripsStatus = "waiting";
    });
    builder.addCase(getFavouriteTrips.rejected, (state, action) => {
      state.getFavouriteTripsStatus = "error";
    });
    builder.addCase(getFavouriteTrips.fulfilled, (state, action) => {
      if (action.payload) {
        state.getFavouriteTripsStatus = "success";
        state.favouriteTrips = action.payload;
      } else {
        state.getFavouriteTripsStatus = "error";
        state.favouriteTrips = [] as number[];
      }
    });

    builder.addCase(removeFromFavourites.pending, (state, action) => {
      state.removeFromFavouritesStatus = "waiting";
    });
    builder.addCase(removeFromFavourites.rejected, (state, action) => {
      state.removeFromFavouritesStatus = "error";
    });
    builder.addCase(removeFromFavourites.fulfilled, (state, action) => {
      if (action.payload) {
        state.removeFromFavouritesStatus = "success";
        state.favouriteTrips = action.payload;
      } else {
        state.removeFromFavouritesStatus = "error";
        state.favouriteTrips = [] as number[];
      }
    });

    builder.addCase(addToFavourites.pending, (state, action) => {
      state.addToFavouritesStatus = "waiting";
    });
    builder.addCase(addToFavourites.rejected, (state, action) => {
      state.addToFavouritesStatus = "error";
    });
    builder.addCase(addToFavourites.fulfilled, (state, action) => {
      if (action.payload) {
        state.addToFavouritesStatus = "success";
        state.favouriteTrips = action.payload;
      } else {
        state.addToFavouritesStatus = "error";
        state.favouriteTrips = [] as number[];
      }
    });

    builder.addCase(getFavouriteTripsDetails.pending, (state, action) => {
      state.getFavouriteTripsDetailedStatus = "waiting";
    });
    builder.addCase(getFavouriteTripsDetails.rejected, (state, action) => {
      state.getFavouriteTripsDetailedStatus = "error";
    });
    builder.addCase(getFavouriteTripsDetails.fulfilled, (state, action) => {
      if (action.payload) {
        state.getFavouriteTripsDetailedStatus = "success";
        state.favouriteTripsDetailed = action.payload;
      } else {
        state.getFavouriteTripsDetailedStatus = "error";
        state.favouriteTripsDetailed = [] as TripDTO[];
      }
    });
  },
});

export const getFavTrips = getFavouriteTripsSlice.reducer;
export const getFavouriteTripsActions = {
  getFavouriteTrips,
  addToFavourites,
  removeFromFavourites,
  getFavouriteTripsDetails,
};
