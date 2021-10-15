import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../util/commonConstants";
import { appendParams } from "../util/commonFunctions";
import { EVENT_PATHS } from "../actions/paths";
import { EventDTO } from "../models/EventDTO";

type Status = "idle" | "waiting" | "success" | "error";

const createEventAction = createAsyncThunk(
  "",
  async (eventDTO: EventDTO, thunkAPI): Promise<Response> => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(eventDTO)) {
      if (!!value) {
        formData.append(key, value);
      }
    }

    const response = await fetch(EVENT_PATHS.CREATE_EVENT, {
      method: "POST",
      body: formData,
    });

    return response;
  }
);

const initialState = {
  response: (undefined as unknown) as Response,
  addStatus: "idle" as Status,
};

const createEventSlice = createSlice({
  initialState,
  name: "createEvent",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEventAction.pending, (state, action) => {
      state.addStatus = "waiting";
    });

    builder.addCase(createEventAction.rejected, (state, action) => {
      state.addStatus = "error";
    });

    builder.addCase(createEventAction.fulfilled, (state, action) => {
      state.addStatus = "success";
      state.response = action.payload;
    });
  },
});

export const createEvent = createEventSlice.reducer;

export const actions = {
  createEventAction,
};
