import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TripFilterValues} from "../models/TripFilterValues";
import * as api from "../actions/trips.action";
import {Page} from "../models/Page";
import {TripDTO} from "../models/TripDTO";

type Status = "idle" | "waiting" | "success" | "error";

const postFilter = createAsyncThunk(
    "trips/filterTrips",
    async (model: TripFilterValues) =>
        api.postFilter(Number(model.minimalDuration), Number(model.maximalDuration),
            Number(model.minimalDifficulty), Number(model.maximalDifficulty), Number(model.minimalGrade),
            Number(model.maximalGrade), model.keyWords, 0, 20));

const initialState = {
    searchedTrips: {} as Page<TripDTO>,
    searchedTripsStatus: "idle" as Status
};

const searchSlice = createSlice({
    initialState,
    name: "search",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postFilter.pending, (state, action) => {
            state.searchedTripsStatus = "waiting";
        });

        builder.addCase(postFilter.rejected, (state, action) => {
            state.searchedTripsStatus = "error";
        });

        builder.addCase(postFilter.fulfilled, (state, action) => {
            state.searchedTripsStatus = "success";
            state.searchedTrips = action.payload;
        });
    },
});

export const search = searchSlice.reducer;
export const searchActions = {
    postFilter,
};