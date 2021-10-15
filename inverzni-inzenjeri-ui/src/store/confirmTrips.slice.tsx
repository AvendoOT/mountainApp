import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONFIRM_TRIP_PATHS } from "../actions/paths";
import { OnDutySignUpForm } from "../models/OnDutySignUpModels/OnDutySignUpForm";
import { OnDutySignUpRequestDTO } from "../models/OnDutySignUpModels/OnDutySignUpRequestDTO";
import { OnDutySignUpDecision } from "../models/OnDutySignUpModels/OnDutySignUpDecision";

type Status = "idle" | "waiting" | "success" | "error";

const confirmTripRequestAction = createAsyncThunk(
  "/confirmTrip/requestAction",
  async (onDutySignUpForm: OnDutySignUpForm, thunkAPI): Promise<Response> => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(onDutySignUpForm)) {
      if (!!value) {
        formData.append(key, value);
      }
    }

    const response = await fetch(CONFIRM_TRIP_PATHS.SEND_REQUEST, {
      method: "POST",
      body: formData,
    });

    return response;
  }
);

async function confirmTripRequestsAction(): Promise<OnDutySignUpRequestDTO[]> {
  const response = await fetch(CONFIRM_TRIP_PATHS.CONFIRM_TRIP_GET_REQUESTS);
  return response.json();
}

const confirmTripRequests = createAsyncThunk(
  "confirmTrip/getRequests",
  async () => confirmTripRequestsAction()
);

const confirmTripAccept = createAsyncThunk(
  "/confirmTrip/acceptAction",
  async (
    onDutySignUpDecision: OnDutySignUpDecision,
    thunkAPI
  ): Promise<Response> => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(onDutySignUpDecision)) {
      if (!!value || value === false) {
        formData.append(key, value);
      }
    }

    const response = await fetch(
      CONFIRM_TRIP_PATHS.CONFIRM_TRIP_REQUEST_ACCEPT,
      {
        method: "POST",
        body: formData,
      }
    );

    return response;
  }
);

const initialState = {
  response: (undefined as unknown) as Response,
  addStatus: "idle" as Status,
  requestsResponseConfirmTrip: [] as OnDutySignUpRequestDTO[],
  getStatus: "idle" as Status,
  acceptResponse: (undefined as unknown) as Response,
  acceptStatus: "idle" as Status,
};

const confirmTripSlice = createSlice({
  initialState,
  name: "confirmTrip",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(confirmTripRequestAction.pending, (state, action) => {
      state.addStatus = "waiting";
    });

    builder.addCase(confirmTripRequestAction.rejected, (state, action) => {
      state.addStatus = "error";
    });

    builder.addCase(confirmTripRequestAction.fulfilled, (state, action) => {
      state.addStatus = "success";
      state.response = action.payload;
    });

    builder.addCase(confirmTripRequests.pending, (state, action) => {
      state.getStatus = "waiting";
    });

    builder.addCase(confirmTripRequests.rejected, (state, action) => {
      state.getStatus = "error";
    });

    builder.addCase(confirmTripRequests.fulfilled, (state, action) => {
      if (action.payload) {
        state.getStatus = "success";
        state.requestsResponseConfirmTrip = action.payload;
      } else {
        state.getStatus = "error";
      }
    });

    builder.addCase(confirmTripAccept.pending, (state, action) => {
      state.acceptStatus = "waiting";
    });

    builder.addCase(confirmTripAccept.rejected, (state, action) => {
      state.acceptStatus = "error";
    });

    builder.addCase(confirmTripAccept.fulfilled, (state, action) => {
      state.acceptStatus = "success";
      state.acceptResponse = action.payload;
    });
  },
});

export const confirmTrip = confirmTripSlice.reducer;

export const confirmTripActions = {
  confirmTripRequestAction,
  confirmTripRequests,
  confirmTripAccept,
};
