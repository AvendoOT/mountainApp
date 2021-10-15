import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../actions/event.action";
import {EventDetailsDTO} from "../models/EventDetailsDTO";
import {EVENT_PATHS} from "../actions/paths";

type Status = "idle" | "waiting" | "success" | "error";

const getEventById = createAsyncThunk(
    "event/getById",
    async (eventId: number) => api.getEvent(eventId)
);

const acceptEventInvitation = createAsyncThunk(
    "event/accept",
    async (eventId: number, thunkAPI): Promise<Response> => {
        const response = await fetch(EVENT_PATHS.ACCEPT_INVITATION, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventId),
        });

        return response;
    }
);

const initialState = {
    event: {} as EventDetailsDTO,
    getEventStatus: "idle" as Status,
    acceptEventStatus: "idle" as Status,
};

const eventSlice = createSlice({
    initialState,
    name: "event",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEventById.pending, (state, action) => {
            state.getEventStatus = "waiting";
        });

        builder.addCase(getEventById.rejected, (state, action) => {
            state.getEventStatus = "error";
        });

        builder.addCase(getEventById.fulfilled, (state, action) => {
            state.getEventStatus = "success";
            state.event = action.payload;
        });
        builder.addCase(acceptEventInvitation.pending, (state, action) => {
            state.acceptEventStatus = "waiting";
        });

        builder.addCase(acceptEventInvitation.rejected, (state, action) => {
            state.acceptEventStatus = "error";
        });

        builder.addCase(acceptEventInvitation.fulfilled, (state, action) => {
            state.acceptEventStatus = "success";
        });
    },
});

export const event = eventSlice.reducer;
export const eventActions = {
    getEventById,
    acceptEventInvitation,
};
