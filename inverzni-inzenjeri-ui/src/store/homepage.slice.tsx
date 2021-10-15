import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../actions/homepage.action";
import {TripResponseDTO} from "../models/TripResponseDTO";
import {EventResponseDTO} from "../models/EventResponseDTO";
import {BadgeResponseDTO} from "../models/BadgeResponseDTO";

type Status = "idle" | "waiting" | "success" | "error";

const getTrips = createAsyncThunk("homepage/getTrips", async () =>
    api.getTrips());

const getEvents = createAsyncThunk("homepage/getEvents", async () =>
    api.getEvents());

const getBadges = createAsyncThunk(
    "homepage/getBadges",
    async () => api.getBadges());

const initialState = {
    trips: [] as TripResponseDTO[],
    getTripStatus: "idle" as Status,
    events: [] as EventResponseDTO[],
    getEventStatus: "idle" as Status,
    badges: [] as BadgeResponseDTO[],
    getBadgeStatus: "idle" as Status,
};

const homepageSlice = createSlice({
    initialState,
    name: "homepage",
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
        builder.addCase(getEvents.pending, (state, action) => {
            state.getEventStatus = "waiting";
        });

        builder.addCase(getEvents.rejected, (state, action) => {
            state.getEventStatus = "error";
        });

        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.getEventStatus = "success";
            state.events = action.payload;
        });
        builder.addCase(getBadges.pending, (state, action) => {
            state.getBadgeStatus = "waiting";
        });

        builder.addCase(getBadges.rejected, (state, action) => {
            state.getBadgeStatus = "error";
        });

        builder.addCase(getBadges.fulfilled, (state, action) => {
            state.getBadgeStatus = "success";
            state.badges = action.payload;
        });
    },
});

export const homepage = homepageSlice.reducer;
export const homepageActions = {
    getTrips,
    getBadges,
    getEvents,
};
