import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TripDTO } from "../models/TripDTO";
import { TRIP_PATHS } from "../actions/paths";

type Status = "idle" | "waiting" | "success" | "error";

const createTripAction = createAsyncThunk(
  "/createTrip",
  async (tripDTO: TripDTO, thunkAPI): Promise<Response> => {
    const response = await fetch(TRIP_PATHS.CREATE_TRIP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripDTO),
    });

    return response;
  }
);

const editTripAction = createAsyncThunk(
  "/editTrip",
  async (tripDTO: TripDTO, thunkAPI): Promise<Response> => {
    const response = await fetch(TRIP_PATHS.EDIT_TRIP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripDTO),
    });

    return response;
  }
);

const initialState = {
  response: (undefined as unknown) as Response,
  addStatus: "idle" as Status,
  editStatus: "idle" as Status,
};

const createTripSlice = createSlice({
  initialState,
  name: "createTrip",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTripAction.pending, (state, action) => {
      state.addStatus = "waiting";
    });

    builder.addCase(createTripAction.rejected, (state, action) => {
      state.addStatus = "error";
    });

    builder.addCase(createTripAction.fulfilled, (state, action) => {
      state.addStatus = "success";
      state.response = action.payload;
    });

    builder.addCase(editTripAction.pending, (state, action) => {
      state.editStatus = "waiting";
    });

    builder.addCase(editTripAction.rejected, (state, action) => {
      state.editStatus = "error";
    });

    builder.addCase(editTripAction.fulfilled, (state, action) => {
      state.editStatus = "success";
      state.response = action.payload;
    });
  },
});
export const createTrip = createTripSlice.reducer;
export const actions = {
  createTripAction,
  editTripAction,
};
