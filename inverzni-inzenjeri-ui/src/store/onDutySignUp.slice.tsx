import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../util/commonConstants";
import { appendParams } from "../util/commonFunctions";
import { ON_DUTY_PATHS, TRIP_PATHS } from "../actions/paths";
import { OnDutySignUpForm } from "../models/OnDutySignUpModels/OnDutySignUpForm";
import { OnDutySignUpRequestDTO } from "../models/OnDutySignUpModels/OnDutySignUpRequestDTO";
import { OnDutySignUpDecision } from "../models/OnDutySignUpModels/OnDutySignUpDecision";
import { TripDTO } from "../models/TripDTO";
import * as api from "../actions/trips.action";

type Status = "idle" | "waiting" | "success" | "error";

const onDutySignUpAction = createAsyncThunk(
  "/onDutySignUp/requestAction",
  async (onDutySignUpForm: OnDutySignUpForm, thunkAPI): Promise<Response> => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(onDutySignUpForm)) {
      if (!!value) {
        formData.append(key, value);
      }
    }

    const response = await fetch(ON_DUTY_PATHS.ON_DUTY_SIGNUP, {
      method: "POST",
      body: formData,
    });

    return response;
  }
);

async function onDutySignUpRequestsAction(): Promise<OnDutySignUpRequestDTO[]> {
  const response = await fetch(ON_DUTY_PATHS.ON_DUTY_GET_REQUESTS);
  return response.json();
}

const onDutySignUpRequests = createAsyncThunk(
  "onDutySignUp/getRequests",
  async () => onDutySignUpRequestsAction()
);

const onDutySignUpAccept = createAsyncThunk(
  "/onDutySignUp/acceptAction",
  async (
    onDutySignUpDecision: OnDutySignUpDecision,
    thunkAPI
  ): Promise<Response> => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(onDutySignUpDecision)) {
      formData.append(key, value);
    }

    const response = await fetch(ON_DUTY_PATHS.ON_DUTY_REQUEST_ACCEPT, {
      method: "POST",
      body: formData,
    });

    return response;
  }
);

const initialState = {
  response: (undefined as unknown) as Response,
  addStatus: "idle" as Status,
  requestsResponse: [] as OnDutySignUpRequestDTO[],
  getStatus: "idle" as Status,
  acceptResponse: (undefined as unknown) as Response,
  acceptStatus: "idle" as Status,
};

const onDutySignUpSlice = createSlice({
  initialState,
  name: "onDutySignUp",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onDutySignUpAction.pending, (state, action) => {
      state.addStatus = "waiting";
    });

    builder.addCase(onDutySignUpAction.rejected, (state, action) => {
      state.addStatus = "error";
    });

    builder.addCase(onDutySignUpAction.fulfilled, (state, action) => {
      state.addStatus = "success";
      state.response = action.payload;
    });

    builder.addCase(onDutySignUpRequests.pending, (state, action) => {
      state.getStatus = "waiting";
    });

    builder.addCase(onDutySignUpRequests.rejected, (state, action) => {
      state.getStatus = "error";
    });

    builder.addCase(onDutySignUpRequests.fulfilled, (state, action) => {
      if (action.payload) {
        state.getStatus = "success";
        state.requestsResponse = action.payload;
      } else {
        state.getStatus = "error";
      }
    });

    builder.addCase(onDutySignUpAccept.pending, (state, action) => {
      state.acceptStatus = "waiting";
    });

    builder.addCase(onDutySignUpAccept.rejected, (state, action) => {
      state.acceptStatus = "error";
    });

    builder.addCase(onDutySignUpAccept.fulfilled, (state, action) => {
      state.acceptStatus = "success";
      state.acceptResponse = action.payload;
    });
  },
});

export const onDutySignUp = onDutySignUpSlice.reducer;

export const onDutyActions = {
  onDutySignUpAction,
  onDutySignUpRequests,
  onDutySignUpAccept,
};
